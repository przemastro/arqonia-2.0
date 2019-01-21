//package pl.astronomy.arqonia20.config.security.application
//
//import org.apache.http.conn.ssl.SSLConnectionSocketFactory
//import org.apache.http.impl.client.HttpClients
//import org.apache.http.ssl.SSLContextBuilder
//import org.springframework.boot.context.properties.EnableConfigurationProperties
//import org.springframework.context.annotation.Configuration
//import org.springframework.web.client.RestTemplate
//import org.springframework.http.client.HttpComponentsClientHttpRequestFactory
//import org.springframework.beans.factory.annotation.Value
//import org.springframework.context.annotation.Bean
//import org.springframework.core.io.Resource
//
//@Configuration
//@EnableConfigurationProperties
//class ApplicationConfig(
//        @Value("\${server.ssl.trust-store}") private val trustStore: Resource,
//        @Value("\${server.ssl.trust-store-password}") private val trustStorePassword: String
//) {
//
//    @Bean
//    @Throws(Exception::class)
//    fun restTemplate(): RestTemplate {
//        val sslContext = SSLContextBuilder()
//                .loadTrustMaterial(trustStore.url, trustStorePassword.toCharArray())
//                .build()
//        val socketFactory = SSLConnectionSocketFactory(sslContext)
//        val httpClient = HttpClients.custom()
//                .setSSLSocketFactory(socketFactory)
//                .build()
//        val factory = HttpComponentsClientHttpRequestFactory(httpClient)
//        return RestTemplate(factory)
//    }
//
//}