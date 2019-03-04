package pl.astronomy.arqonia20.domain.search.stars

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

@JsonIgnoreProperties(ignoreUnknown = true)
data class StarObject(
        val data: List<List<String>>,
        val meta: List<String>,
        val warnings: List<String>
)

data class StarDetails(
//        val catalogName: String,
//        val objectName: String,
//        val u: String,
//        val v: String,
//        val b: String,
//        val distinctionBV: String,
//        val distinctionUB: String,
//        val distinctionRI: String,
//        val distinctionVI: String,
//        val rahms: String,
//        val dedms: String,
//        val spectralType: String

        val catalogName: StarValue,
        val objectName: StarValue,
        val u: StarValue,
        val v: StarValue,
        val b: StarValue,
        val distinctionBV: StarValue,
        val distinctionUB: StarValue,
        val distinctionRI: StarValue,
        val distinctionVI: StarValue,
        val rahms: StarValue,
        val dedms: StarValue,
        val spectralType: StarValue
) {
    companion object {
        fun fromMap(catalogName: String, map: Map<String, String>): StarDetails {
            return StarDetails(
                    StarValue(catalogName, "Catalog"),
                    StarValue(map["object_name"] ?: "", "Object Name"),
                    StarValue(map["U"] ?: "", "U"),
                    StarValue(map["V"] ?: "", "V"),
                    StarValue(map["B"] ?: "", "B"),
                    StarValue(map["B-V"] ?: "", "B-V"),
                    StarValue(map["U-B"] ?: "", "U-B"),
                    StarValue(map["R-I"] ?: "","R-I"),
                    StarValue(map["V-I"] ?: "", "V-I"),
                    StarValue(map["RA"] ?: "", "RA"),
                    StarValue(map["DE"] ?: "", "DE"),
                    StarValue(map["spectral_type"] ?: "", "Spectral Type")
            )
        }
    }
}

data class StarValue(
        val value: String,
        val label: String
)

enum class SelectedCatalogsEnum {
    SAO, HIP, TYC, HD, HR, GC
}
