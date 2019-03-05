//package pl.astronomy.arqonia20.config.mongo
//
//import com.mongodb.reactivestreams.client.MongoClient
//import com.mongodb.reactivestreams.client.MongoClients
//import org.springframework.beans.factory.annotation.Value
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration
//import org.springframework.data.mongodb.core.ReactiveMongoTemplate
//import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories
//import pl.astronomy.arqonia20.domain.comet.CometRepository
//
//@Configuration
////@EnableReactiveMongoRepositories(basePackageClasses = [CometRepository::class])
//@EnableReactiveMongoRepositories
//class MongoReactiveConfig(
//        @Value("\${spring.data.mongodb.database}") private val database: String
//
//        ): AbstractReactiveMongoConfiguration() {
//
//    override fun getDatabaseName() = database
//
//    override fun reactiveMongoClient() = customReactiveMongoClient()
//
//    @Bean
//    fun customReactiveMongoClient(): MongoClient = MongoClients.create()
//
//    @Bean
//    override fun reactiveMongoTemplate()
//            = ReactiveMongoTemplate(customReactiveMongoClient(), databaseName)
//}
