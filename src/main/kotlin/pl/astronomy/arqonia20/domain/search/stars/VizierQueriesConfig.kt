package pl.astronomy.arqonia20.domain.search.stars

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties("vizier-queries")
class VizierQueriesConfig {
    lateinit var queries: Map<String, String>
}
