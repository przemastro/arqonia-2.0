package pl.astronomy.arqonia20.domain.user

data class User(
        val username: String,
        val password: String,
        val roles: List<UserRole> = listOf()
)

data class UserRole(val name: UserRoleType)
