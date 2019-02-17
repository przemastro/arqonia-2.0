package pl.astronomy.arqonia20.domain.search

import org.springframework.stereotype.Service
import pl.astronomy.arqonia20.logger
import reactor.core.publisher.Mono

@Service
class SearchService(
        private val simbadClient: SimbadClient,
        private val vizierClient: VizierClient
) {
    fun searchByType(objectName: String, objectType: String): Mono<*> {
        logger.info("vizier checking...")
        return vizierClient.getObjectDetailsByCatalog("I/239/hip_main", "21421")

//        return simbadClient.getAllIdentifiers(objectName)
    }

    companion object {
        private val logger by logger()
    }
}

