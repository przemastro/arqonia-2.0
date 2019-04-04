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

    fun getStarsData(objectName: String) =
            simbadClient.getAllIdentifiers(objectName)
                    .flatMap { ids ->
                        Mono.fromCallable {
                            ids.data
                                    .flatten()
                                    .filter {
                                        vizierQueries.queries.keys.contains(it.substringBefore(" "))
                                    }
                        }
                    }
                    .flatMapMany {ids ->
                        Flux.zip(
                                vizierClient.getObjectDetails(paramsForCatalog(SAO, ids)),
                                vizierClient.getObjectDetails(paramsForCatalog(HIP, ids)),
                                vizierClient.getObjectDetails(paramsForCatalog(TYC, ids)),
                                vizierClient.getObjectDetails(paramsForCatalog(HD, ids)),
                                vizierClient.getObjectDetails(paramsForCatalog(HR, ids)),
                                vizierClient.getObjectDetails(paramsForCatalog(GC, ids))
                        )
                                .map { ids ->
                                    listOf(
                                            StarDetails.fromMap(SAO, ids.t1),
                                            StarDetails.fromMap(HIP, ids.t2),
                                            StarDetails.fromMap(TYC, ids.t3),
                                            StarDetails.fromMap(HD, ids.t4),
                                            StarDetails.fromMap(HR, ids.t5),
                                            StarDetails.fromMap(GC, ids.t6)
                                    )
                                }
                                .flatMapIterable { it }
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
