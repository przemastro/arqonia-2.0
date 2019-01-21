package pl.astronomy.arqonia20.persistence.user

import org.springframework.data.annotation.Id
import org.springframework.data.annotation.PersistenceConstructor
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import pl.astronomy.arqonia20.domain.user.User
import pl.astronomy.arqonia20.domain.user.UserRole
import pl.astronomy.arqonia20.domain.user.UserRoleType

// TODO Add filed: 'createdAt'  !
@Document(collection = "users")
data class DbUser @PersistenceConstructor constructor(
        @Id var id: String?,
        @Indexed(background = true, unique = true) val username: String,
        val email: String,
        val password: String,
        val roles: List<String>
) {
    fun toUser() = User(
            username,
            email,
            password,
            roles.map { UserRole(UserRoleType.valueOf(it)) }
    )

    companion object {
        fun fromUser(user: User) = DbUser(
                null,
                user.username,
                user.email,
                user.password,
                user.roles.map { it.name.name }
        )
    }
}