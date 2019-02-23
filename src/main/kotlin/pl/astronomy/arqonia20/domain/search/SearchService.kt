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
        @Value("\${selectedCatalogs.tableNames}") private val tableNames: List<String>,
        private val vizierQueries: VizierQueriesConfig
) {
    fun searchByType(objectName: String, objectType: String): Mono<*> {
//    fun searchByType(objectName: String, objectType: String): Flux<*> {
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
                            vizierClient.getObjectDetailsByCatalog("I/239/hip_main", "21421"),
                            vizierClient.getObjectDetailsByCatalog("I/131A/sao", "94027"),
                            vizierClient.getObjectDetailsByCatalog("I/131A/sao", "94027")
                    )
                }

        return selectedIds

//        return Mono.zip(
//                vizierClient.getObjectDetailsByCatalog("I/239/hip_main", "21421"),
//                vizierClient.getObjectDetailsByCatalog("I/131A/sao", "94027"),
//                vizierClient.getObjectDetailsByCatalog("I/131A/sao", "94027")
//        )

//                .zipWith(vizierClient.getObjectDetailsByCatalog("I/239/hip_main", "21421"))
//                .zipWith(vizierClient.getObjectDetailsByCatalog("I/131A/sao", "94027"))

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
    lateinit var map: Map<String, String>
}

