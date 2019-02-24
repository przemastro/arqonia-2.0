package pl.astronomy.arqonia20.domain.search

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service
import pl.astronomy.arqonia20.logger
import reactor.core.publisher.Mono

@Service
class SearchService(
        private val simbadClient: SimbadClient,
        private val vizierClient: VizierClient,
        @Value("\${selectedCatalogs.startingNames}") private val selectedCatalogs: List<String>,
        private val vizierQueries: VizierQueriesConfig
) {
    fun searchByType(objectName: String, objectType: String): Mono<*> {
        logger.info("vizier checking...")
        // 1. Get all identifiers from Simbad
        simbadClient.getAllIdentifiers(objectName)

        // 2. Filter all identifiers only for chosen one:

        val selectedIds = simbadClient.getAllIdentifiers(objectName)
                .flatMap { ids ->
                    Mono.fromCallable {
                        ids.data
                                .flatten()
                                .filter { selectedCatalogs.contains(it.substringBefore(" ")) }
                    }
                }
                .flatMap { ids ->
                    logger.info("adamo" + ids.first { it.contains("SAO") }.substringAfter(" "))

                    Mono.zip(
                            vizierClient.getObjectDetails(vizierQueries.queries.getValue("SAO"), extractRawId(ids, "SAO")),
                            vizierClient.getObjectDetails(vizierQueries.queries.getValue("HIP"), extractRawId(ids, "HIP")),
                            vizierClient.getObjectDetails(vizierQueries.queries.getValue("TYC"), extractRawId(ids, "TYC")),
                            vizierClient.getObjectDetails(vizierQueries.queries.getValue("HD"), extractRawId(ids, "HD")),
                            vizierClient.getObjectDetails(vizierQueries.queries.getValue("HR"), extractRawId(ids, "HR")),
                            vizierClient.getObjectDetails(vizierQueries.queries.getValue("GC"), extractRawId(ids, "GC"))
                    )
                }

        return selectedIds

        // 3. Get details for all filtered identifiers
//        return vizierClient.getObjectDetails("I/239/hip_main", "21421")
    }

    private fun extractRawId(ids: List<String>, searchedId: String) =
            with(ids.first { it.contains(searchedId) }.substringAfter(" ")) {
                if (searchedId == "TYC")
                    split("-").let { "${it[0]}  ${it[1]} ${it[2]}" }
                else
                    this
            }


    companion object {
        private val logger by logger()
    }
}

@Component
@ConfigurationProperties("vizier-queries")
class VizierQueriesConfig {
    lateinit var queries: Map<String, String>
}

