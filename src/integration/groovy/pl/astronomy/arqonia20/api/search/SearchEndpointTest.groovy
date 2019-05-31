package pl.astronomy.arqonia20.api.search

import org.skyscreamer.jsonassert.JSONCompare
import org.skyscreamer.jsonassert.JSONCompareMode
import org.springframework.http.HttpMethod
import pl.astronomy.arqonia20.BaseIntegrationTest

import static pl.astronomy.arqonia20.mock.SearchMock.*

class SearchEndpointTest extends BaseIntegrationTest {

    def "should find 'aldebaran' star"() {
        given:
        stubSimbadResponse()
        stubVizierResponseSAO()
        stubVizierResponseHIP()
        stubVizierResponseTYC()
        stubVizierResponseHD()
        stubVizierResponseHR()
        stubVizierResponseGC()

        when:
        def response = restTemplate.exchange(
                localUrl("/search?objectName=aldebaran&objectType=star"),
                HttpMethod.POST,
                prepareEntity(),
                String.class)

        then:
        response.statusCode.value() == 200
        JSONCompare.compareJSON(
                getFileContent("integration.out/arqoniaSearchStarResponse.json"),
                response.body,
                JSONCompareMode.STRICT)
    }

    // TODO Think about test for '404' for one of Vizier catalogs!

}
