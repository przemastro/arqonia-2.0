package pl.astronomy.arqonia20.domain.search

import reactor.core.publisher.Mono

interface VizierClient {
    fun getObjectDetailsByCatalog(tableName: String, identifier: String): Mono<*>
}
