package pl.astronomy.arqonia20.domain.user

// TODO Validation for 'email' will be needed (e.g. at least if it has '@' and similar)
// TODO Validation for password strength will be needed
data class User(
        val username: String,
        val email: String,
        val password: String,
        val roles: List<UserRole> = listOf()
)

data class UserRole(val name: UserRoleType)
