package pl.astronomy.arqonia20

import com.github.tomakehurst.wiremock.junit.WireMockClassRule
import org.junit.ClassRule
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.test.context.ActiveProfiles
import spock.lang.Shared
import spock.lang.Specification

@SpringBootTest(classes = [Application],
        properties = "application.environment=integration",
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles(profiles = "integration")
class BaseIntegrationTest extends Specification {

    @Value('${local.server.port}')
    protected int port

    @ClassRule
    @Shared
    WireMockClassRule wiremock = new WireMockClassRule(12346)

    @Autowired
    TestRestTemplate restTemplate

    protected String localUrl(String endpoint) {
        return "http://localhost:$port$endpoint"
    }

}
