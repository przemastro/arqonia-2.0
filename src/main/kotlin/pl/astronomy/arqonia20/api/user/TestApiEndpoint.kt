package pl.astronomy.arqonia20.api.user

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import pl.astronomy.arqonia20.domain.user.User
import pl.astronomy.arqonia20.domain.user.UserRole
import pl.astronomy.arqonia20.domain.user.UserRoleType
import pl.astronomy.arqonia20.logger

@RestController
@RequestMapping("/api")
class TestApiEndpoint {

    @GetMapping("/hello")
    @CrossOrigin(origins = ["https://arqonia.pl", "https://localhost"])
//    @CrossOrigin
    @ResponseStatus(HttpStatus.OK)
    fun hello(): User {
        logger.info("Trying to get 'Hello World' message...")

        return User("Hello user !",
                "hello@email.com",
                "hello password",
                listOf(UserRole(UserRoleType.USER))
        )
    }

    companion object {
        private val logger by logger()
    }
}
