package pl.astronomy.arqonia20.persistence.security.oauthclients

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Component
import pl.astronomy.arqonia20.config.security.OauthClientDetailsNotFoundException
import pl.astronomy.arqonia20.config.security.oauthclients.OauthClientDetails
import pl.astronomy.arqonia20.config.security.oauthclients.OauthClientDetailsRepository

@Component
class OauthClientDetailsRepositoryImpl(
        private val dbRepository: DbOauthClientDetailsRepository
): OauthClientDetailsRepository {
    override fun save(clientDetails: OauthClientDetails) =
            dbRepository.save(DbOauthClientDetails.fromOauthClientDetails(clientDetails))

    override fun findAll(): List<DbOauthClientDetails> {
        val values = dbRepository.findAll()
        if (values.size > 0) {
            return values
        } else {
            throw OauthClientDetailsNotFoundException("set of client ids")
        }
    }
}

interface DbOauthClientDetailsRepository: MongoRepository<DbOauthClientDetails, String> {
    fun save(clientDetails: DbOauthClientDetails)
}
