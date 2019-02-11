package pl.astronomy.arqonia20.api.user

import org.springframework.http.HttpStatus
import javax.validation.Valid
import org.springframework.web.bind.annotation.*
import pl.astronomy.arqonia20.domain.user.SignupService
import pl.astronomy.arqonia20.domain.user.User
import pl.astronomy.arqonia20.domain.user.UserRole
import pl.astronomy.arqonia20.domain.user.UserRoleType.USER
import pl.astronomy.arqonia20.logger

//import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("/signup")
class SignupEndpoint(
        private val signupService: SignupService
) {

    // TODO Add some mechanism to react when user want to role = ADMIN (some validation, restrictions or checking for additional approvals) !!
    @PostMapping
    @CrossOrigin(origins = ["https://localhost:8443"])
    @ResponseStatus(HttpStatus.CREATED)
    fun signup(@RequestBody @Valid user: User) {
        logger.info("Saving user credentials...")

        signupService.addUser(
                user.copy(
                        roles = listOf(UserRole(USER))
                                .plus(user.roles)
                                .distinct())
        )
    }

    // Example of '/signup' endpoint with redirect to specific url.
/*
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun signup(
            @RequestBody user: User,
            response: HttpServletResponse) {
        logger.info("Saving user credentials...")

        signupService.addUser(
                user.copy(
                        roles = listOf(UserRole(USER))
                                .plus(user.roles)
                                .distinct())
        )

        return response.sendRedirect("/")
    }
*/

    companion object {
        private val logger by logger()
    }
}
