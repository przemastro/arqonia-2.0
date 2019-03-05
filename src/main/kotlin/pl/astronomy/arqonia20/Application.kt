package pl.astronomy.arqonia20

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories

@SpringBootApplication
@EnableMongoRepositories
@EnableReactiveMongoRepositories
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
