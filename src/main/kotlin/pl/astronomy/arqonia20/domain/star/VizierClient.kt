package pl.astronomy.arqonia20.domain.star

import reactor.core.publisher.Mono

interface VizierClient {
    fun getObjectDetails(query: String, identifier: String): Mono<Map<String, String>>
}
