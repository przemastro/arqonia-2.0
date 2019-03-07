package pl.astronomy.arqonia20.persistence.comet

import org.springframework.data.annotation.Id
import org.springframework.data.annotation.PersistenceConstructor
import org.springframework.data.mongodb.core.mapping.Document
import pl.astronomy.arqonia20.domain.comet.Comet
import pl.astronomy.arqonia20.domain.comet.CometValue

@Document(collection = "comets")
data class DbComet @PersistenceConstructor constructor(
        @Id var id: String?,
        val cometNumberAndOrbitType: String,
        val year: Int,
        val month: Int,
        val day: Double,
        val perihelionDistancePD: Double,
        val eccentricityE: Double,
        val orbitalPeriodAndPerihelionW: Double,
        val longitudeL: Double,
        val inclinationI: Double,
        val epochDate: Int,
        val magnitudeMag: Double,
        val slopeParameter: Double,
        val namePart1: String,
        val namePart2: String?,
        val namePart3: String?,
        val reference: String
) {
    fun toComet() = Comet(
            CometValue(cometNumberAndOrbitType, "Orbit Type"),
            CometValue(year, "Date"),
            CometValue(month, "Date"),
            CometValue(day, "Date"),
            CometValue(perihelionDistancePD, "PD"),
            CometValue(eccentricityE, "e"),
            CometValue(orbitalPeriodAndPerihelionW, "\u03c9"), // "\u03c9"
            CometValue(longitudeL, "L"),
            CometValue(inclinationI, "I"),
            CometValue(epochDate, "Epoch Date"),
            CometValue(magnitudeMag, "Mag"),
            CometValue(slopeParameter, "Slope parameter"),
            CometValue(namePart1, "Object Name"),
            namePart2?.let { CometValue(namePart2,"Object Name") },
            namePart3?.let { CometValue(namePart3, "Object Name") },
            CometValue(reference, "Catalog")
    )
}
