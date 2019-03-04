package pl.astronomy.arqonia20.domain.comet

import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import pl.astronomy.arqonia20.domain.search.ObjectType

// TODO This is only placeholder before exact database object! 'ReactiveMongoRepository<ObjectType, String>'
// First ObjectType type should be some object, exactly some 'Comet' Object!
interface CometRepository: ReactiveMongoRepository<ObjectType, String>
