package pl.astronomy.arqonia20.domain.search

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import pl.astronomy.arqonia20.logger
import reactor.core.publisher.Mono

@Service
class SearchService(
        private val simbadClient: SimbadClient,
        private val vizierClient: VizierClient,
        @Value("\${selectedCatalogs.startingNames}") private val selectedCatalogs: List<String>,
        @Value("\${selectedCatalogs.tableNames}") private val tableNames: List<String>
) {
    fun searchByType(objectName: String, objectType: String): Mono<*> {
        logger.info("vizier checking...")
        // 1. Get all identifiers from Simbad
        simbadClient.getAllIdentifiers(objectName)

        // 2. Filter all identifiers only for chosen one:

        simbadClient.getAllIdentifiers(objectName)
                .flatMap {
                    Mono.fromCallable {
                        it.data
                                .flatten()
                                .filter { selectedCatalogs.contains(it.substringBefore(" ")) }
                    }
                }

        // 3. Get details for all filtered identifiers
        return vizierClient.getObjectDetailsByCatalog("I/239/hip_main", "21421")
    }

    companion object {
        private val logger by logger()
    }
}

