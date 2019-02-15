package pl.astronomy.arqonia20.domain.search

import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class SearchService(
        private val simbadClient: SimbadClient
) {
    fun searchByType(objectName: String, objectType: String): Mono<Any> {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}
