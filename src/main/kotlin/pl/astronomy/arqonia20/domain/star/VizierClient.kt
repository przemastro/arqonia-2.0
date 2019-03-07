package pl.astronomy.arqonia20.domain.star

import reactor.core.publisher.Mono

interface VizierClient {
    fun getObjectDetails(params: Pair<String, String>): Mono<Map<String, String>>
}
