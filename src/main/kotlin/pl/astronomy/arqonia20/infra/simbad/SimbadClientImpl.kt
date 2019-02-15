package pl.astronomy.arqonia20.infra.simbad

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.client.WebClient
import pl.astronomy.arqonia20.domain.search.SimbadClient
import reactor.core.publisher.Mono

@Component
class SimbadClientImpl(
        simbadWebClient: WebClient,
        @Value("\${simbadClient.url}") private val url: String,
        @Value("\${simbadClient.query}") private val query: String
): SimbadClient {
    private val client = simbadWebClient.mutate()
            .baseUrl(url)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build()

    // TODO Finish implementation !
    override fun getAllIdentifiers(objectName: String): Mono<AllIdentifiers> =
            Mono.empty()
}

// TODO Move to another package this data class !
@JsonIgnoreProperties(ignoreUnknown = true)
data class AllIdentifiers(
        val data: List<List<String>>
)
