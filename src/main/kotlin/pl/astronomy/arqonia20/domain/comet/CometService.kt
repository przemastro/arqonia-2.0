package pl.astronomy.arqonia20.domain.comet

import org.springframework.stereotype.Service
import pl.astronomy.arqonia20.logger

@Service
class CometService(
        private val cometRepository: CometRepository
) {

    fun findComet(namePart: String) = cometRepository.findByNames(namePart)

    companion object {
        private val logger by logger()
    }
}
