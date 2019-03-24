package pl.astronomy.arqonia20.domain.star

import pl.astronomy.arqonia20.infra.simbad.AllIdentifiers
import reactor.core.publisher.Mono

interface SimbadClient {
    fun getAllIdentifiers(objectName: String): Mono<AllIdentifiers>
}
