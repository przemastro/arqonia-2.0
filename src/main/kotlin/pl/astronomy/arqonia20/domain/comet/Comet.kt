package pl.astronomy.arqonia20.domain.comet

data class Comet(
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
)
