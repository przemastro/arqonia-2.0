package pl.astronomy.arqonia20.config.security.oauthclients

import pl.astronomy.arqonia20.persistence.security.oauthclients.DbOauthClientDetails

interface OauthClientDetailsRepository {
    fun save(clientDetails: OauthClientDetails)
    fun findAll(): List<DbOauthClientDetails>
}