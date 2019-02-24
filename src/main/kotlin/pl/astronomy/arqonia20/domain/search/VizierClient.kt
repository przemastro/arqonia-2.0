package pl.astronomy.arqonia20.domain.search

import reactor.core.publisher.Mono

interface VizierClient {
    fun getObjectDetails(query: String, identifier: String): Mono<*>
}
