package pl.astronomy.arqonia20.infra.simbad

import io.netty.channel.ChannelOption
import io.netty.handler.timeout.ReadTimeoutHandler
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.client.reactive.ReactorClientHttpConnector
import org.springframework.web.reactive.function.client.WebClient
import reactor.netty.http.client.HttpClient
import reactor.netty.tcp.TcpClient
import java.util.concurrent.TimeUnit

@Configuration
@EnableConfigurationProperties
class SimbadClientConfig(
        @Value("\${simbadClient.connectionTimeout}") private val connectionTimeout: Int,
        @Value("\${simbadClient.socketTimeout}") private val socketTimeout: Long
) {

    @Bean
    fun simbadWebClient() = WebClient.builder()
                .clientConnector(getCustomReactorConnector())
                .build()

    private fun getCustomReactorConnector() = ReactorClientHttpConnector(
            HttpClient.from(
                    TcpClient.create()
                            .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, connectionTimeout)
                            .doOnConnected { connection ->
                                connection.addHandlerLast(ReadTimeoutHandler(socketTimeout, TimeUnit.MILLISECONDS))
                            }
            ))


}
