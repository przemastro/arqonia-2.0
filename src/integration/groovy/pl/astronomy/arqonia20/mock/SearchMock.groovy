package pl.astronomy.arqonia20.mock

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus

import static com.github.tomakehurst.wiremock.client.WireMock.*
import static pl.astronomy.arqonia20.BaseIntegrationTest.getFileContent

class SearchMock {

    def static stubSimbadResponse() {
        stubFor(post(urlPathEqualTo("/simbad/sim-tap/sync"))
                .willReturn(aResponse()
                .withStatus(HttpStatus.OK.value())
                .withHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                .withBody(getFileContent("integration.in/simbadResponse.json"))
        ))
    }

    def static stubVizierResponseSAO() {
        stubFor(post(urlPathEqualTo("/TAPVizieR/tap/view"))
//                .withRequestBody(containing("I/131A/sao"))
                .willReturn(aResponse()
                .withStatus(HttpStatus.OK.value())
                .withHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                .withBody(getFileContent("integration.in/vizierResponseSAO.json"))
        ))
    }

    def static stubVizierResponseHIP() {
        stubFor(post(urlPathEqualTo("/TAPVizieR/tap/view"))
//                .withRequestBody(containing("I/239/hip_main"))
                .willReturn(aResponse()
                .withStatus(HttpStatus.OK.value())
                .withHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                .withBody(getFileContent("integration.in/vizierResponseHIP.json"))
        ))
    }

}
