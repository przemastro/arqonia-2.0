package pl.astronomy.arqonia20.domain.search

import org.springframework.stereotype.Service
import pl.astronomy.arqonia20.domain.comet.CometService
import pl.astronomy.arqonia20.logger
import reactor.core.publisher.Mono
import pl.astronomy.arqonia20.domain.search.ObjectType.*
import pl.astronomy.arqonia20.domain.star.*

@Service
class SearchService(
        private val starService: StarService,
        private val cometService: CometService
) {
    fun searchByType(objectName: String, objectType: String): Mono<*> {
        return when(objectType) {
            STAR.name -> starService.getStarsData(objectName)
            PLANETOID.name -> starService.getStarsData(objectName)
            COMET.name -> cometService.getCometData(objectName)
            else -> starService.getStarsData(objectName)
        }
    }

    companion object {
        private val logger by logger()
    }
}
