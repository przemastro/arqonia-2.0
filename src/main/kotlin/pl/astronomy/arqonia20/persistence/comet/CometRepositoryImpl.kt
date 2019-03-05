package pl.astronomy.arqonia20.persistence.comet

import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import pl.astronomy.arqonia20.domain.comet.CometRepository
import reactor.core.publisher.Mono

@Component
class CometRepositoryImpl(
        private val dbCometRepository: DbCometRepository
): CometRepository {

    override fun findByNames(namePart: String) =
            dbCometRepository
                    .findByNamePart1(namePart)
//                    .findByNamePart1OrNamePart2OrNamePart3(namePart)
                    .map { it.toComet() }


}

@Repository
interface DbCometRepository: ReactiveMongoRepository<DbComet, String> {
//    fun findByNamePart1OrNamePart2OrNamePart3(namePart: String): Mono<DbComet>
    fun findByNamePart1(namePart1: String): Mono<DbComet>
}
