package pl.astronomy.arqonia20.api.search

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import pl.astronomy.arqonia20.domain.search.SearchService
import pl.astronomy.arqonia20.logger
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/search")
class SearchEndpoint(
        private val searchService: SearchService
) {
    @PostMapping
    @CrossOrigin(origins = ["https://localhost:8443"])
    @ResponseStatus(HttpStatus.CREATED)
    fun search(
            @RequestParam(required = true) objectName: String,
            @RequestParam(required = false, defaultValue = "star") objectType: String): Mono<Any> {
        logger.info("Searching user credentials...")

        return searchService
                .searchByType(objectName, objectType)
    }

    companion object {
        private val logger by logger()
    }
}
