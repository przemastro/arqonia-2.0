package pl.astronomy.arqonia20.infra.simbad

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

@JsonIgnoreProperties(ignoreUnknown = true)
data class AllIdentifiers(
        val data: List<List<String>>
)
