package pl.astronomy.arqonia20.domain.comet

import org.springframework.stereotype.Service
import org.springframework.util.StringUtils
import pl.astronomy.arqonia20.logger
import reactor.core.publisher.Mono

@Service
class CometService(
        private val cometRepository: CometRepository
) {

    // TODO
    // 1. Capitalization -DONE
    // 2. Replacing spaces from 'namePart' with '' (dashes)
    // 3. Figure out how to resolve multiple results, e.g. for 'schwassmann'
    fun getCometData(namePart: String): Mono<Comet> {
        return cometRepository.findByNames(
                StringUtils.capitalize(namePart)
        )
    }

    companion object {
        private val logger by logger()
    }
}
