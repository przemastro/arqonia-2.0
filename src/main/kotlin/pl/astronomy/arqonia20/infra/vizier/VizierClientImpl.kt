package pl.astronomy.arqonia20.infra.vizier

import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.client.WebClient
import pl.astronomy.arqonia20.domain.search.stars.StarObject
import pl.astronomy.arqonia20.domain.search.stars.VizierClient
import pl.astronomy.arqonia20.exceptions.ObjectNotFoundException
import pl.astronomy.arqonia20.exceptions.VizierClientException
import reactor.core.publisher.Mono

@Component
class VizierClientImpl(
        vizierWebClient: WebClient,
        @Value("\${vizierClient.url}") private val url: String
) : VizierClient {
    private val client = vizierWebClient.mutate()
            .baseUrl(url)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
            .build()

    override fun getObjectDetails(query: String, identifier: String): Mono<Map<String, String>> =
            client.post()
                    .accept(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromFormData(formData(query, identifier)))
                    .retrieve()
                    .onStatus(HttpStatus::isError) {
                        Mono.error(VizierClientException(it.statusCode()))
                    }
                    .bodyToMono(StarObject::class.java)
                    .doOnSuccess { identifiers ->
                        if (identifiers.data.isEmpty()) {
                            throw ObjectNotFoundException(HttpStatus.NOT_FOUND, query, identifier)
                        }
                    }
                    .flatMap { Mono.fromCallable { convertToMap(it) } }

    private fun formData(query: String, identifier: String): MultiValueMap<String, String> {
        val formData: MultiValueMap<String, String> = LinkedMultiValueMap<String, String>()

        with(formData) {
            this.add("phase", "run")
            this.add("action", "upload")
            this.add("lang", "adql")
            this.add("format", "json")
            this.add("request", "doQuery")
            this.add("query", String.format(query, identifier))
        }

        return formData
    }

    private fun convertToMap(objectType: StarObject): Map<String, String> {
        val keys = objectType.meta
        val values = objectType.data.flatten().map { it.trim() }

        return keys.zip(values).toMap()
    }
}
