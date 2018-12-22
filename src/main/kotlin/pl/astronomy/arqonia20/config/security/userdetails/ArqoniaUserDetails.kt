package pl.astronomy.arqonia20.config.security.userdetails

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.authority.SimpleGrantedAuthority
import pl.astronomy.arqonia20.domain.user.UserRole
import pl.astronomy.arqonia20.domain.user.User

class ArqoniaUserDetails(
        private val serialVersionUID: Long = 1L,
        private val authorities: MutableCollection<GrantedAuthority>,
        private val password: String,
        private val username: String
): UserDetails {

    companion object {
        fun fromUser(user: User) = ArqoniaUserDetails(
                authorities = convertRoles(user.roles),
                password = user.password,
                username = user.username
        )

        private fun convertRoles(roles: List<UserRole>): MutableCollection<GrantedAuthority> = roles.map { role ->
            val roleName = role.name.name.toUpperCase()

            if (!roleName.startsWith("ROLE_", true))
                SimpleGrantedAuthority("ROLE_$roleName")
            else
                SimpleGrantedAuthority(roleName)
        }
                .toMutableList()
    }

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> = authorities

    override fun isEnabled(): Boolean = true

    override fun getUsername(): String = username

    override fun isCredentialsNonExpired(): Boolean = true

    override fun getPassword(): String = password

    override fun isAccountNonExpired(): Boolean = true

    override fun isAccountNonLocked(): Boolean = true
}