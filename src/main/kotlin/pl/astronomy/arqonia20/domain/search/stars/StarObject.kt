package pl.astronomy.arqonia20.domain.search.stars

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

@JsonIgnoreProperties(ignoreUnknown = true)
data class StarObject(
        val data: List<List<String>>,
        val meta: List<String>,
        val warnings: List<String>
)

data class StarsCollection(
        val SAO: Map<String, String>,
        val HIP: Map<String, String>,
        val TYC: Map<String, String>,
        val HD: Map<String, String>,
        val HR: Map<String, String>,
        val GC: Map<String, String>
)

enum class SelectedCatalogsEnum {
    SAO, HIP, TYC, HD, HR, GC
}
