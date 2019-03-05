package pl.astronomy.arqonia20.persistence.comet

import org.springframework.data.annotation.Id
import org.springframework.data.annotation.PersistenceConstructor
import org.springframework.data.mongodb.core.mapping.Document
import pl.astronomy.arqonia20.domain.comet.Comet

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
            cometNumberAndOrbitType,
            year,
            month,
            day,
            perihelionDistancePD,
            eccentricityE,
            orbitalPeriodAndPerihelionW,
            longitudeL,
            inclinationI,
            epochDate,
            magnitudeMag,
            slopeParameter,
            namePart1,
            namePart2,
            namePart3,
            reference
    )

//    fun toUser() = User(
//            username,
//            email,
//            password,
//            roles.map { UserRole(UserRoleType.valueOf(it)) }
//    )
//
//    companion object {
//        fun fromUser(user: User) = DbUser(
//                null,
//                user.username,
//                user.email,
//                user.password,
//                user.roles.map { it.name.name }
//        )
//    }
}
