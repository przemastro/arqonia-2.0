package pl.astronomy.arqonia20.domain.comet

data class Comet(
        val cometNumberAndOrbitType: CometValue<String>,
        val year: CometValue<Int>,
        val month: CometValue<Int>,
        val day: CometValue<Double>,
        val perihelionDistancePD: CometValue<Double>,
        val eccentricityE: CometValue<Double>,
        val orbitalPeriodAndPerihelionW: CometValue<Double>,
        val longitudeL: CometValue<Double>,
        val inclinationI: CometValue<Double>,
        val epochDate: CometValue<Int>,
        val magnitudeMag: CometValue<Double>,
        val slopeParameter: CometValue<Double>,
        val namePart1: CometValue<String>,
        val namePart2: CometValue<String>,
        val namePart3: CometValue<String>,
        val reference: CometValue<String>
)

data class CometValue<T>(
        val value: T,
        val label: String
)
