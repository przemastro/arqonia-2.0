package pl.astronomy.arqonia20.api.user


import org.springframework.http.HttpMethod
import pl.astronomy.arqonia20.BaseIntegrationTest
import pl.astronomy.arqonia20.domain.user.User
import pl.astronomy.arqonia20.domain.user.UserRole
import pl.astronomy.arqonia20.domain.user.UserRoleType

class SignupEndpointTest extends BaseIntegrationTest {

    def "should register new normal user"() {
        given:
        User userDto = new User(
                "user1",
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

}
