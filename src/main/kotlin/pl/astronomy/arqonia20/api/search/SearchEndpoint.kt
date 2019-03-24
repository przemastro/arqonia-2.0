package pl.astronomy.arqonia20.api.search

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import pl.astronomy.arqonia20.domain.search.ObjectType
import pl.astronomy.arqonia20.domain.search.ObjectType.STAR
import pl.astronomy.arqonia20.domain.search.SearchService
import pl.astronomy.arqonia20.logger
import reactor.core.publisher.Flux

@RestController
@RequestMapping("/search")
class SearchEndpoint(
        private val searchService: SearchService
) {

    @PostMapping
    @CrossOrigin(origins = ["https://localhost:8443"])
    @ResponseStatus(HttpStatus.OK)
    fun search(
            @RequestParam(required = true) objectName: String,
            @RequestParam(required = false, defaultValue = "star") objectType: String): Flux<*> {
        logger.info("Searching object type '$objectType', with name '$objectName'...")

        return searchService
                .searchByType(objectName,
                        ObjectType
                                .values()
                                .map { it.toString() }
                                .firstOrNull { it == objectType.toUpperCase() } ?: STAR.name)
    }

//    @PostMapping("/searchV2")
//    @CrossOrigin(origins = ["https://localhost:8443"])
//    @ResponseStatus(HttpStatus.OK)
//    fun searchV2(
//            @RequestParam(required = true) objectName: String,
//            @RequestParam(required = false, defaultValue = "star") objectType: String): Flux<*> {
//        logger.info("Searching object type '$objectType', with name '$objectName'...")
//
////        return cometService.getCometData(objectName)
//
//        return starService.getStarsData(objectName)
//    }

    companion object {
        private val logger by logger()
    }
}
