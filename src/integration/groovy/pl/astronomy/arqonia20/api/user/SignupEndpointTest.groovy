package pl.astronomy.arqonia20.api.user

import org.apache.commons.lang3.RandomStringUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpMethod
import org.springframework.web.client.HttpClientErrorException
import pl.astronomy.arqonia20.BaseIntegrationTest
import pl.astronomy.arqonia20.domain.user.User
import pl.astronomy.arqonia20.domain.user.UserRepository
import pl.astronomy.arqonia20.domain.user.UserRole
import pl.astronomy.arqonia20.domain.user.UserRoleType
import spock.lang.Unroll

class SignupEndpointTest extends BaseIntegrationTest {

    @Autowired
    UserRepository userRepository

    def "should register new normal user"() {
        given:
        def randomUser = getRandomUsername()
        User userDto = new User(
                randomUser,
                "user1@gmail.com",
                "pass123",
                [new UserRole(UserRoleType.USER)]
        )

        when:
        def response = restTemplate.exchange(
                localUrl("/signup"),
                HttpMethod.POST,
                prepareEntity(userDto),
                Void)

        then:
        response.statusCode.value() == 201
    }

    def "should register new normal user when no role is provided"() {
        given:
        def randomUser = getRandomUsername()
        User userDto = new User(
                randomUser,
                "user1@gmail.com",
                "pass123",
                []
        )

        when:
        def response = restTemplate.exchange(
                localUrl("/signup"),
                HttpMethod.POST,
                prepareEntity(userDto),
                Void)
        def userFromDb = userRepository.findByUsername(randomUser)


        then:
        response.statusCode.value() == 201
        userFromDb.username == randomUser
    }

    @Unroll
    def "should not register user when required field is empty"() {
        given:
        User userDto = new User(username, email, password, [new UserRole(UserRoleType.USER)])

        when:
        restTemplate.exchange(
                localUrl("/signup"),
                HttpMethod.POST,
                prepareEntity(userDto),
                Void)

        then:
        thrown HttpClientErrorException.BadRequest

        where:
        username    | email             | password
        ""          | "user1@gmail.com" | "pass123"
        "user2" | ""                    | "pass123"
        "user3" | "user1@gmail.com"     | ""
    }

    private static def getRandomUsername() {
        return "user-" + RandomStringUtils.randomAlphabetic(5)
    }

}
