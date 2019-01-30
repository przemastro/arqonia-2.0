package pl.astronomy.arqonia20

import com.github.tomakehurst.wiremock.junit.WireMockClassRule
import com.google.common.base.Charsets
import com.google.common.io.Resources
import org.apache.http.client.HttpClient
import org.apache.http.conn.ssl.SSLConnectionSocketFactory
import org.apache.http.impl.client.HttpClients
import org.apache.http.ssl.SSLContextBuilder
import org.junit.ClassRule
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.core.io.Resource
import org.springframework.data.mongodb.MongoDbFactory
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.ContextConfiguration
import org.springframework.web.client.RestTemplate
import pl.astronomy.arqonia20.config.IntegrationConfiguration
import spock.lang.Shared
import spock.lang.Specification

@SpringBootTest(classes = [Application],
        properties = "application.environment=integration",
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ContextConfiguration(classes = [IntegrationConfiguration])
@ActiveProfiles(profiles = "integration")
class BaseIntegrationTest extends Specification {

    @Value('${local.server.port}')
    protected int port

    @ClassRule
    @Shared
    WireMockClassRule wiremock = new WireMockClassRule(12346)

    @Autowired
    RestTemplate restTemplate

    @Autowired
    MongoDbFactory mongoDbFactory

    protected String localUrl(String endpoint) {
        return "https://localhost:$port$endpoint"
    }

    static String getFileContent(String filename) throws IOException {
        return Resources.toString(Resources.getResource(filename), Charsets.UTF_8)
    }

    // Usage example: "prepareEntity(userDto, createBasicAuthHeaders("integrationClientId", "secret")),"
    protected <T> HttpEntity<T> prepareEntity(T data, Map<String, List<String>> additionalHeaders = [:]) {
        def headers = new HttpHeaders() {{
            set("Content-Type", MediaType.APPLICATION_JSON_VALUE)
        }}

        headers.putAll(additionalHeaders)
        return new HttpEntity<T>(data, headers)
    }

    protected HttpHeaders createBasicAuthHeaders(String username, String password) {
        return new HttpHeaders() {{
            String auth = username + ":" + password
            byte[] encodedAuth = Base64.encoder.encode(auth.getBytes(Charsets.UTF_8))

            String authHeader = "Basic " + new String( encodedAuth)

            set("Authorization", authHeader)
        }}
    }

}

