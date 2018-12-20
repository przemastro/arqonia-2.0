package pl.astronomy.arqonia20.config.security

import java.lang.RuntimeException

open class OauthClientDetailsNotFoundException(clientId: String?): RuntimeException("OAuth client details for client_id '$clientId' not found.")
