package pl.astronomy.arqonia20.domain.search

import org.springframework.stereotype.Service
import pl.astronomy.arqonia20.domain.search.stars.SelectedCatalogsEnum.*
import pl.astronomy.arqonia20.logger
import reactor.core.publisher.Mono
import pl.astronomy.arqonia20.domain.search.ObjectType.*
import pl.astronomy.arqonia20.domain.search.stars.*

@Service
class SearchService(
        private val simbadClient: SimbadClient,
        private val vizierClient: VizierClient,
        private val vizierQueries: VizierQueriesConfig
) {
    fun searchByType(objectName: String, objectType: String): Mono<*> {
        return when(objectType) {
            STAR.name -> getStarsData(objectName)
            PLANETOID.name -> getStarsData(objectName)
            COMET.name -> getStarsData(objectName)
            else -> getStarsData(objectName)
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
                                    Mono.fromCallable {
                                        listOf(
                                                StarDetails.fromMap(SAO.name, it.t1),
                                                StarDetails.fromMap(HIP.name, it.t2),
                                                StarDetails.fromMap(TYC.name, it.t3),
                                                StarDetails.fromMap(HD.name, it.t4),
                                                StarDetails.fromMap(HR.name, it.t5),
                                                StarDetails.fromMap(GC.name, it.t6)
                                        )
                                    }
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
