package pl.astronomy.arqonia20.infra.vizier

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.client.WebClient
import pl.astronomy.arqonia20.domain.search.VizierClient
import pl.astronomy.arqonia20.exceptions.ObjectNotFoundException
import pl.astronomy.arqonia20.exceptions.VizierClientException
import reactor.core.publisher.Mono

@Component
class VizierClientImpl(
        vizierWebClient: WebClient,
        @Value("\${vizierClient.url}") private val url: String,
        @Value("\${vizierClient.query}") private val query: String
) : VizierClient {
    private val client = vizierWebClient.mutate()
            .baseUrl(url)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
            .build()

    override fun getObjectDetailsByCatalog(tableName: String, identifier: String): Mono<*> =
            client.post()
                    .accept(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromFormData(formData(tableName, identifier)))
                    .retrieve()
                    .onStatus(HttpStatus::isError) {
                        Mono.error(VizierClientException(it.statusCode()))
                    }
                    .bodyToMono(ObjectType::class.java)
                    .doOnSuccess { identifiers ->
                        if (identifiers.data.isEmpty()) {
                            throw ObjectNotFoundException(HttpStatus.NOT_FOUND, tableName, identifier)
                        }
                    }

    private fun formData(tableName: String, identifier: String): MultiValueMap<String, String> {
        val formData: MultiValueMap<String, String> = LinkedMultiValueMap<String, String>()

        with(formData) {
            this.add("phase", "run")
            this.add("action", "upload")
            this.add("lang", "adql")
            this.add("format", "json")
            this.add("request", "doQuery")
            this.add("query", String.format(query, tableName, identifier))
        }

        return formData
    }
}

@JsonIgnoreProperties(ignoreUnknown = true)
data class ObjectType(
        val data: List<List<String>>,
        val meta: List<String>,
        val warnings: List<String>
)
