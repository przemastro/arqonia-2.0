package pl.astronomy.arqonia20.domain.user

import java.lang.RuntimeException

open class UserNotFoundException(username: String?): RuntimeException("User details for username '$username' not found,")
