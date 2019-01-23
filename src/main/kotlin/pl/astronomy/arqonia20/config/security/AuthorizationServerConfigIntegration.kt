package pl.astronomy.arqonia20.config.security

import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer
import org.springframework.security.oauth2.provider.approval.UserApprovalHandler
import org.springframework.security.oauth2.provider.token.TokenStore
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter
import pl.astronomy.arqonia20.config.security.oauthclients.OauthClientDetailsRepository

@Configuration
@EnableAuthorizationServer
@Profile("integration")
class AuthorizationServerConfigIntegration(
        private val tokenStore: TokenStore,
        private val userApprovalHandler: UserApprovalHandler,
        @Qualifier("authenticationManagerBean") private val authenticationManager: AuthenticationManager,
        private val clientDetailsRepository: OauthClientDetailsRepository,
        private val jwtTokenEnhancer: JwtAccessTokenConverter
): AuthorizationServerConfigurerAdapter() {

    @Throws(Exception::class)
    override fun configure(clients: ClientDetailsServiceConfigurer) {
        val builder = clients.inMemory()

//        clientDetailsRepository.findAll().forEach {
        builder
                .withClient("integrationClientId")
                .authorizedGrantTypes("implicit")
                .redirectUris("http://localhost:8083/")
                .scopes("read", "write", "foo", "bar")
                .autoApprove(true)
                .accessTokenValiditySeconds(3600)
//        }

    }

    @Throws(Exception::class)
    override fun configure(endpoints: AuthorizationServerEndpointsConfigurer) {
        endpoints
                .tokenStore(tokenStore)
                .tokenEnhancer(jwtTokenEnhancer)
                .userApprovalHandler(userApprovalHandler)
                .authenticationManager(authenticationManager)
    }

    @Throws(Exception::class)
    override fun configure(oauthServer: AuthorizationServerSecurityConfigurer) {
        oauthServer
                .tokenKeyAccess("isAnonymous() || hasAuthority('ROLE_TRUSTED_CLIENT')")
                .checkTokenAccess("hasAuthority('ROLE_TRUSTED_CLIENT')");
    }
}