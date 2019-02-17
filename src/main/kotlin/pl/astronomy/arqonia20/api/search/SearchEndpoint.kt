package pl.astronomy.arqonia20.api.search

import org.reactivestreams.Publisher
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import pl.astronomy.arqonia20.domain.search.SearchService
import pl.astronomy.arqonia20.logger
import reactor.core.publisher.Mono

@RestController
//@RequestMapping("/search")
@RequestMapping
class SearchEndpoint(
        private val searchService: SearchService
) {
    @PostMapping("/search-v2")
    @CrossOrigin(origins = ["https://localhost:8443"])
    @ResponseStatus(HttpStatus.OK)
    fun searchV2(
            @RequestParam(required = true) objectName: String,
            @RequestParam(required = false, defaultValue = "star") objectType: String): Mono<*> {
        logger.info("Searching user credentials...")

        return searchService
                .searchByType(objectName, objectType)
    }

    @PostMapping("/search")
    @CrossOrigin(origins = ["https://localhost:8443"])
    @ResponseStatus(HttpStatus.OK)
    fun search(
            @RequestParam(required = true) objectName: String,
            @RequestParam(required = false, defaultValue = "star") objectType: String): Mono<*> {
        logger.info("Searching user credentials...")

        return Mono.just(
                listOf(
                        StarObject("SAO", "Aldebaran", "23h 0m 0", "+34 4 4", "3", "4.5", "3.3", "BV", "UB", "RI", "VI", "A0"),
                        StarObject("HIP", "12323", "23h 0m 0", "+35 5 4", "3.1", "4.1", "3.34", "BV", "UB", "RI", "VI", "A1"),
                        StarObject("TYC2", "345435", "23h 0m 0", "+35 5 4", "3.6", "4.4", "3.34", "BV", "UB", "RI", "VI", "A1"),
                        StarObject("HD", "153453", "23h 0m 0", "+35 5 4", "3.3", "4.3", "3.34", "BV", "UB", "RI", "VI", "A1"),
                        StarObject("HR", "123455", "23h 0m 0", "+35 5 4", "3.1", "4.4", "3.4", "BV", "UB", "RI", "VI", "A1")

                )
        )
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
