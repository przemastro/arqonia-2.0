package pl.astronomy.arqonia20.api.search

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import pl.astronomy.arqonia20.domain.comet.CometService
import pl.astronomy.arqonia20.domain.search.ObjectType
import pl.astronomy.arqonia20.domain.search.ObjectType.STAR
import pl.astronomy.arqonia20.domain.search.SearchService
import pl.astronomy.arqonia20.domain.star.StarService
import pl.astronomy.arqonia20.logger
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
//@RequestMapping("/search")
@RequestMapping
class SearchEndpoint(
        private val searchService: SearchService,
        private val cometService: CometService,
        private val starService: StarService
) {

    @PostMapping("/search")
    @CrossOrigin(origins = ["https://localhost:8443"])
    @ResponseStatus(HttpStatus.OK)
    fun search(
            @RequestParam(required = true) objectName: String,
            @RequestParam(required = false, defaultValue = "star") objectType: String): Mono<*> {
        logger.info("Searching object type '$objectType', with name '$objectName'...")

        return searchService
                .searchByType(objectName,
                        ObjectType
                                .values()
                                .map { it.toString() }
                                .firstOrNull { it == objectType.toUpperCase() } ?: STAR.name)
    }

    @PostMapping("/searchV2")
    @CrossOrigin(origins = ["https://localhost:8443"])
    @ResponseStatus(HttpStatus.OK)
    fun searchV2(
            @RequestParam(required = true) objectName: String,
            @RequestParam(required = false, defaultValue = "star") objectType: String): Flux<*> {
        logger.info("Searching object type '$objectType', with name '$objectName'...")

//        return cometService.getCometData(objectName)

        return starService.getStarsDataV2(objectName)
    }

    companion object {
        private val logger by logger()
    }
}

// TODO Move to another class and package !
data class StarObject(
        val catalog: String,
        val objectName: String,
        val ra: String,
        val de: String,
        val uMag: String,
        val vMag: String,
        val bMag: String,
        val bv: String,
        val ub: String,
        val ri: String,
        val vi: String,
        val spectralType: String
)
