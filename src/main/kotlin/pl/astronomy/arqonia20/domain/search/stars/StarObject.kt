package pl.astronomy.arqonia20.domain.search.stars

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

@JsonIgnoreProperties(ignoreUnknown = true)
data class StarObject(
        val data: List<List<String>>,
        val meta: List<String>,
        val warnings: List<String>
)

data class StarDetails(
        val catalogName: String,
        val objectName: String,
        val u: String,
        val v: String,
        val b: String,
        val distinctionBV: String,
        val distinctionUB: String,
        val distinctionRI: String,
        val distinctionVI: String,
        val rahms: String,
        val dedms: String,
        val spectralType: String
) {
    companion object {
        fun fromMap(catalogName: String, map: Map<String, String>): StarDetails {
            return StarDetails(
                    catalogName,
                    map["object_name"] ?: "",
                    map["U"] ?: "",
                    map["V"] ?: "",
                    map["B"] ?: "",
                    map["B-V"] ?: "",
                    map["U-B"] ?: "",
                    map["R-I"] ?: "",
                    map["V-I"] ?: "",
                    map["RA"] ?: "",
                    map["DE"] ?: "",
                    map["spectral_type"] ?: ""
            )
        }
    }
}

enum class SelectedCatalogsEnum {
    SAO, HIP, TYC, HD, HR, GC
}
