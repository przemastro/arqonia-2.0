package pl.astronomy.arqonia20.domain.star

import org.springframework.stereotype.Service
import pl.astronomy.arqonia20.domain.star.SelectedCatalogsEnum.*
import pl.astronomy.arqonia20.logger
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class StarService(
        private val simbadClient: SimbadClient,
        private val vizierClient: VizierClient,
        private val vizierQueries: VizierQueriesConfig
) {

    fun getStarsData(objectName: String): Flux<StarDetails> {
        return  simbadClient.getAllIdentifiers(objectName)
                .flatMap { ids ->
                    if (ids.data.isEmpty()) {
                        Mono.empty()
                    } else {
                        Mono.fromCallable {
                            ids.data
                                    .flatten()
                                    .filter {
                                        vizierQueries.queries.keys.contains(it.substringBefore(" "))
                                    }
                        }
                    }
                }
                .flatMapMany {idsList ->
                    if (idsList.isEmpty()) {
                        Flux.empty()
                    } else {
                        Flux.zip(
                                vizierClient.getObjectDetails(paramsForCatalog(SAO, idsList)),
                                vizierClient.getObjectDetails(paramsForCatalog(HIP, idsList)),
                                vizierClient.getObjectDetails(paramsForCatalog(TYC, idsList)),
                                vizierClient.getObjectDetails(paramsForCatalog(HD, idsList)),
                                vizierClient.getObjectDetails(paramsForCatalog(HR, idsList)),
                                vizierClient.getObjectDetails(paramsForCatalog(GC, idsList))
                        )
                                .map { idsTuple ->
                                    listOf(
                                            StarDetails.fromMap(SAO, idsTuple.t1),
                                            StarDetails.fromMap(HIP, idsTuple.t2),
                                            StarDetails.fromMap(TYC, idsTuple.t3),
                                            StarDetails.fromMap(HD, idsTuple.t4),
                                            StarDetails.fromMap(HR, idsTuple.t5),
                                            StarDetails.fromMap(GC, idsTuple.t6)
                                    )
                                }
                                .flatMapIterable { it }
                    }
                }
    }

    private val paramsForCatalog = { catalog: SelectedCatalogsEnum, ids: List<String> ->
                Pair(vizierQueries.queries.getValue(catalog.name), extractRawId(ids, catalog.name)) }

    private fun extractRawId(ids: List<String>, searchedId: String) =
            with(ids
                    .first { it.contains(searchedId) }
                    .substringAfter(" ")
            ) {
                if (searchedId == TYC.name)
                    split("-").let { "${it[0]}  ${it[1]} ${it[2]}" }
                else
                    this
            }

    companion object {
        private val logger by logger()
    }
}
