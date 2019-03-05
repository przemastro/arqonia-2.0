package pl.astronomy.arqonia20.domain.comet

import reactor.core.publisher.Mono

interface CometRepository {
    fun findByNames(namePart: String): Mono<Comet>
}
