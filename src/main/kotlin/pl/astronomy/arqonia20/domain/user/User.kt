package pl.astronomy.arqonia20.domain.user

import javax.validation.constraints.NotBlank

// TODO Validation for 'email' will be needed (e.g. at least if it has '@' and similar)
// TODO Validation for password strength will be needed
data class User(
        @field:NotBlank val username: String,
        @field:NotBlank val email: String,
        @field:NotBlank val password: String,
        val roles: List<UserRole> = listOf()
)

data class UserRole(val name: UserRoleType)
