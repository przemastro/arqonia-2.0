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
                .withRequestBody(containing("I%2F131A%2Fsao"))
                .willReturn(aResponse()
                .withStatus(HttpStatus.OK.value())
                .withHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                .withBody(getFileContent("integration.in/vizierResponseSAO.json"))
        ))
    }

    def static stubVizierResponseHIP() {
        stubFor(post(urlPathEqualTo("/TAPVizieR/tap/view"))
                .withRequestBody(containing("I%2F239%2Fhip_main"))
                .willReturn(aResponse()
                .withStatus(HttpStatus.OK.value())
                .withHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                .withBody(getFileContent("integration.in/vizierResponseHIP.json"))
        ))
    }

    def static stubVizierResponseTYC() {
        stubFor(post(urlPathEqualTo("/TAPVizieR/tap/view"))
                .withRequestBody(containing("I%2F239%2Ftyc_main"))
                .willReturn(aResponse()
                .withStatus(HttpStatus.OK.value())
                .withHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                .withBody(getFileContent("integration.in/vizierResponseTYC.json"))
        ))
    }

    def static stubVizierResponseHD() {
        stubFor(post(urlPathEqualTo("/TAPVizieR/tap/view"))
                .withRequestBody(containing("III%2F135A%2Fcatalog"))
                .willReturn(aResponse()
                .withStatus(HttpStatus.OK.value())
                .withHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                .withBody(getFileContent("integration.in/vizierResponseHD.json"))
        ))
    }

    def static stubVizierResponseHR() {
        stubFor(post(urlPathEqualTo("/TAPVizieR/tap/view"))
                .withRequestBody(containing("V%2F50%2Fcatalog"))
                .willReturn(aResponse()
                .withStatus(HttpStatus.OK.value())
                .withHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                .withBody(getFileContent("integration.in/vizierResponseHD.json"))
        ))
    }

    def static stubVizierResponseGC() {
        stubFor(post(urlPathEqualTo("/TAPVizieR/tap/view"))
                .withRequestBody(containing("I%2F113A%2Fcatalog"))
                .willReturn(aResponse()
                .withStatus(HttpStatus.OK.value())
                .withHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                .withBody(getFileContent("integration.in/vizierResponseGC.json"))
        ))
    }
}
