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
import org.springframework.web.client.RestTemplate
import spock.lang.Shared
import spock.lang.Specification

import javax.net.ssl.SSLContext

@SpringBootTest(classes = [Application],
        properties = "application.environment=integration",
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles(profiles = "integration")
class BaseIntegrationTest extends Specification {

    @Value('${local.server.port}')
    protected int port

    @Value('${server.ssl.trust-store}')
    private Resource trustStore

    @Value('${server.ssl.trust-store-password}')
    private String trustStorePassword

    @ClassRule
    @Shared
    WireMockClassRule wiremock = new WireMockClassRule(12346)

    @Autowired
    TestRestTemplate restTemplate

    @Autowired
    MongoDbFactory mongoDbFactory

    protected String localUrl(String endpoint) {
        return "https://localhost:8080/$endpoint"
    }

    static String getFileContent(String filename) throws IOException {
        return Resources.toString(Resources.getResource(filename), Charsets.UTF_8)
    }

    RestTemplate restTemplate() throws Exception {
        SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(trustStore.getURL(), trustStorePassword.toCharArray())
                .build()
        SSLConnectionSocketFactory socketFactory = new SSLConnectionSocketFactory(sslContext)
        HttpClient httpClient = HttpClients.custom()
                .setSSLSocketFactory(socketFactory)
                .build()
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory(httpClient);
        return new RestTemplate(factory)
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

