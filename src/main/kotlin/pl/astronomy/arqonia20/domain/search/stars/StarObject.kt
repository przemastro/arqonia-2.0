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
) {
    companion object {
        // TODO Mapper 'from map to details' -> to finish !
        fun toStarDetails(map: Map<String, String>): StarDetails {
            return StarDetails("","","","","","","","","","")
        }
    }
}

data class StarDetails(
        val catalog: String,
        val objectName: String,
        val u: String,
        val v: String,
        val b: String,
        val distinctionBV: String,
        val distinctionUB: String,
        val distinctionRI: String,
        val distinctionVI: String,
        val spectralType: String
)

enum class SelectedCatalogsEnum {
    SAO, HIP, TYC, HD, HR, GC
}
