//package pl.astronomy.arqonia20.config.mongo
//
//import com.mongodb.MongoClient
//import com.mongodb.client.MongoClients
//import org.springframework.beans.factory.annotation.Value
//import org.springframework.context.annotation.Bean
//import org.springframework.context.annotation.Configuration
//import org.springframework.data.mongodb.config.AbstractMongoConfiguration
//import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration
//import org.springframework.data.mongodb.core.ReactiveMongoTemplate
//import org.springframework.data.mongodb.repository.config.EnableMongoRepositories
//import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories
//import pl.astronomy.arqonia20.config.security.oauthclients.OauthClientDetailsRepository
//import pl.astronomy.arqonia20.domain.comet.CometRepository
//import pl.astronomy.arqonia20.domain.user.UserRepository
//
//@Configuration
////@EnableMongoRepositories(basePackageClasses = [
////    OauthClientDetailsRepository::class,
////    UserRepository::class])
////@EnableMongoRepositories("pl.astronomy.arqonia20.domain.user", "pl.astronomy.arqonia20.config.security")
//@EnableMongoRepositories
//class MongoConfig(
//        @Value("\${spring.data.mongodb.database}") private val database: String
//
//        ): AbstractMongoConfiguration() {
//    override fun getDatabaseName() = database
//
//    override fun mongoClient() = customMongoClient()
//
//    @Bean
//    fun customMongoClient() = MongoClient()
//
////
////    override fun getDatabaseName() = database
////
////    override fun reactiveMongoClient() = mongoClient()
////
////    @Bean
////    fun mongoClient(): MongoClient = MongoClients.create()
////
////    @Bean
////    override fun reactiveMongoTemplate()
////            = ReactiveMongoTemplate(mongoClient(), databaseName)
//}
