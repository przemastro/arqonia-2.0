package pl.astronomy.arqonia20.domain.search

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service
import pl.astronomy.arqonia20.logger
import reactor.core.publisher.Flux
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
                .flatMap {
                    Mono.fromCallable {
                        it.data
                                .flatten()
                                .filter { selectedCatalogs.contains(it.substringBefore(" ")) }
                    }
                }
                .flatMap {
                    Mono.zip(
                            vizierClient.getObjectDetailsByCatalog(vizierQueries.queries.getValue("SAO"), "94027"),
                            vizierClient.getObjectDetailsByCatalog(vizierQueries.queries.getValue("HIP"), "21421"),
                            vizierClient.getObjectDetailsByCatalog(vizierQueries.queries.getValue("TYC"), "1266  1416 1"),
                            vizierClient.getObjectDetailsByCatalog(vizierQueries.queries.getValue("HD"), "29139"),
                            vizierClient.getObjectDetailsByCatalog(vizierQueries.queries.getValue("HR"), "1457"),
                            vizierClient.getObjectDetailsByCatalog(vizierQueries.queries.getValue("GC"), "5605")
                    )
                }

        return selectedIds

        // 3. Get details for all filtered identifiers
//        return vizierClient.getObjectDetailsByCatalog("I/239/hip_main", "21421")
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

