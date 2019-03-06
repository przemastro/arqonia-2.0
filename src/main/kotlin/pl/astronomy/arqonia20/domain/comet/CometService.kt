package pl.astronomy.arqonia20.domain.comet

import org.springframework.stereotype.Service
import pl.astronomy.arqonia20.logger
import reactor.core.publisher.Flux

@Service
class CometService(
        private val cometRepository: CometRepository
) {

    fun getCometData(namePart: String): Flux<Comet> {
        return cometRepository.findByNames(
                namePart
                        .replace(" ", "-")
        )
    }

    companion object {
        private val logger by logger()
    }
}
