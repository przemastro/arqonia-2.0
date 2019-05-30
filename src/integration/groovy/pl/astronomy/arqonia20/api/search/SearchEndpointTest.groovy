package pl.astronomy.arqonia20.api.search

import org.springframework.http.HttpMethod
import pl.astronomy.arqonia20.BaseIntegrationTest
import static pl.astronomy.arqonia20.mock.SearchMock.*

class SearchEndpointTest extends BaseIntegrationTest {


    def "should find 'aldebaran' star"() {
        given:
        stubSimbadResponse()
        stubVizierResponseSAO()
        stubVizierResponseHIP()

        when:
        def response = restTemplate.exchange(
                localUrl("/search?objectName=aldebaran&objectType=star"),
                HttpMethod.POST,
                prepareEntity(),
                Object)

        then:
        response.statusCode.value() == 200
        response.body == "adamo"
    }


}
