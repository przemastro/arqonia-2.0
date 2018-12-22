package pl.astronomy.arqonia20.config.security.userdetails

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import pl.astronomy.arqonia20.domain.user.UserRepository

@Service
class ArqoniaUserDetailsService(
        private val userRepository: UserRepository
): UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails =
            ArqoniaUserDetails
                    .fromUser(userRepository.findByUsername(username))


}