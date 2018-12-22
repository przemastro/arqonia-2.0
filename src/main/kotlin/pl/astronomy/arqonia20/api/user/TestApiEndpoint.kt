package pl.astronomy.arqonia20.api.user

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import pl.astronomy.arqonia20.logger

@RestController
@RequestMapping("/api")
class TestApiEndpoint {

    @GetMapping("/hello")
    @CrossOrigin(origins = ["http://localhost:8080"])
    @ResponseStatus(HttpStatus.OK)
    fun hello(): String {
        logger.info("Trying to get 'Hello World' message...")

        return "Hello World to Adam!"
    }

    companion object {
        private val logger by logger()
    }
}
