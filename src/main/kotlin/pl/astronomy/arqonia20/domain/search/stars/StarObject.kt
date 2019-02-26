package pl.astronomy.arqonia20.domain.search.stars

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

@JsonIgnoreProperties(ignoreUnknown = true)
data class StarObject(
        val data: List<List<String>>,
        val meta: List<String>,
        val warnings: List<String>
)

data class StarsCollection(
        val SAO: StarDetails,
        val HIP: StarDetails,
        val TYC: StarDetails,
        val HD: StarDetails,
        val HR: StarDetails,
        val GC: StarDetails
) {
    companion object {
        fun toStarDetails(map: Map<String, String>): StarDetails {
            return StarDetails(
                    map["object_name"] ?: "",
                    map["U"] ?: "",
                    map["V"] ?: "",
                    map["B"] ?: "",
                    map["B-V"] ?: "",
                    map["U-B"] ?: "",
                    map["R-I"] ?: "",
                    map["V-I"] ?: "",
                    map["spectral_type"] ?: ""
            )
        }
    }
}

data class StarDetails(
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
