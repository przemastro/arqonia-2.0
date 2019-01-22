package pl.astronomy.arqonia20.api.user

import pl.astronomy.arqonia20.BaseIntegrationTest

class SignupEndpointTest extends BaseIntegrationTest {

    def "test should pass!"() {
        given:
        def var1 = "correctValue"

        when:
        def response = "correctValue"

        then:
        response == var1
    }

}
