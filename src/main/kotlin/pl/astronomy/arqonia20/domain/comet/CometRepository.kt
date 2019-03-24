package pl.astronomy.arqonia20.domain.comet

import reactor.core.publisher.Flux

interface CometRepository {
    fun findByNames(namePart: String): Flux<Comet>
}
