package pl.astronomy.arqonia20.domain.search

import org.springframework.stereotype.Service
import pl.astronomy.arqonia20.domain.search.stars.SelectedCatalogsEnum.*
import pl.astronomy.arqonia20.domain.search.stars.SimbadClient
import pl.astronomy.arqonia20.domain.search.stars.StarsCollection
import pl.astronomy.arqonia20.domain.search.stars.VizierClient
import pl.astronomy.arqonia20.domain.search.stars.VizierQueriesConfig
import pl.astronomy.arqonia20.logger
import reactor.core.publisher.Mono
import pl.astronomy.arqonia20.domain.search.ObjectType.*

@Service
class SearchService(
        private val simbadClient: SimbadClient,
        private val vizierClient: VizierClient,
        private val vizierQueries: VizierQueriesConfig
) {
    fun searchByType(objectName: String, objectType: String): Mono<*> {
        return when(objectType) {
            STAR.name -> getStarsData(objectName)
            PLANETOID.name -> Mono.just(StarsCollection(emptyMap(), emptyMap(), emptyMap(), emptyMap(), emptyMap(), emptyMap()))
            COMET.name -> Mono.just(StarsCollection(emptyMap(), emptyMap(), emptyMap(), emptyMap(), emptyMap(), emptyMap()))
            else -> Mono.just(StarsCollection(emptyMap(), emptyMap(), emptyMap(), emptyMap(), emptyMap(), emptyMap()))
        }
    }

    private fun getStarsData(objectName: String) =
            simbadClient.getAllIdentifiers(objectName)
                    .flatMap { ids ->
                        Mono.fromCallable {
                            ids.data
                                    .flatten()
                                    .filter { vizierQueries.queries.keys.contains(it.substringBefore(" ")) }
                        }
                    }
                    .flatMap { ids ->
                        Mono.zip(
                                vizierClient.getObjectDetails(vizierQueries.queries.getValue(SAO.name), extractRawId(ids, SAO.name)),
                                vizierClient.getObjectDetails(vizierQueries.queries.getValue(HIP.name), extractRawId(ids, HIP.name)),
                                vizierClient.getObjectDetails(vizierQueries.queries.getValue(TYC.name), extractRawId(ids, TYC.name)),
                                vizierClient.getObjectDetails(vizierQueries.queries.getValue(HD.name), extractRawId(ids, HD.name)),
                                vizierClient.getObjectDetails(vizierQueries.queries.getValue(HR.name), extractRawId(ids, HR.name)),
                                vizierClient.getObjectDetails(vizierQueries.queries.getValue(GC.name), extractRawId(ids, GC.name))
                        )
                                .flatMap {
                                    Mono.fromCallable { StarsCollection(it.t1, it.t2, it.t3, it.t4, it.t5, it.t6) }
                                }
                    }

    private fun extractRawId(ids: List<String>, searchedId: String) =
            with(ids.first { it.contains(searchedId) }.substringAfter(" ")) {
                if (searchedId == TYC.name)
                    split("-").let { "${it[0]}  ${it[1]} ${it[2]}" }
                else
                    this
            }

    companion object {
        private val logger by logger()
    }
}
