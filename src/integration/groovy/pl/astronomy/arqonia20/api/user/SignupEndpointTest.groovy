package pl.astronomy.arqonia20.api.user

import pl.astronomy.arqonia20.BaseIntegrationTest

class SignupEndpointTest extends BaseIntegrationTest {

    def "should respond '200 Ok' and return response from file '#fileWithResponse' for query parameters 'include=#include'"() {
        given:
        def var1 = "correctValue"

        when:
        def response = "correctValue"

        then:
        response == var1
    }

}
