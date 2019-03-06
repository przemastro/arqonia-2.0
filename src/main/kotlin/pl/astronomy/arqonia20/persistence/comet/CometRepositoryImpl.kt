package pl.astronomy.arqonia20.persistence.comet

import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import pl.astronomy.arqonia20.domain.comet.CometRepository
import reactor.core.publisher.Flux

@Component
class CometRepositoryImpl(
        private val dbCometRepository: DbCometRepository
): CometRepository {

    override fun findByNames(namePart: String) =
            dbCometRepository
                    .findByNamePart1ContainsOrNamePart2ContainsOrNamePart3ContainsIgnoreCase(namePart, namePart, namePart)
                    .map { it.toComet() }
}

@Repository
interface DbCometRepository: ReactiveMongoRepository<DbComet, String> {
    fun findByNamePart1ContainsOrNamePart2ContainsOrNamePart3ContainsIgnoreCase(
            namePart1: String, namePart2: String, namePart3: String): Flux<DbComet>
}
