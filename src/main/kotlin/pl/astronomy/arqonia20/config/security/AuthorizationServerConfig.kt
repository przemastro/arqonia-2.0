package pl.astronomy.arqonia20.config.security

import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Configuration
import org.springframework.core.env.Environment
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
class AuthorizationServerConfig(
        private val tokenStore: TokenStore,
        private val userApprovalHandler: UserApprovalHandler,
        @Qualifier("authenticationManagerBean") private val authenticationManager: AuthenticationManager,
        private val clientDetailsRepository: OauthClientDetailsRepository,
        private val jwtTokenEnhancer: JwtAccessTokenConverter,
        private val environment: Environment
): AuthorizationServerConfigurerAdapter() {

    @Throws(Exception::class)
    override fun configure(clients: ClientDetailsServiceConfigurer) {
        val builder = clients.inMemory()

        if (environment.activeProfiles.contains("integration")) {
            builder
                    .withClient("integrationClientId")
                    .secret("secret")
                    .authorizedGrantTypes("password", "refresh_token")
                    .scopes("read", "write")
                    .autoApprove(true)
                    .accessTokenValiditySeconds(3600)
                    .refreshTokenValiditySeconds(3600 * 24)
        } else {
            clientDetailsRepository.findAll().forEach {
                builder
                        .withClient(it.id)
                        .authorizedGrantTypes(*it.authorizedGrantTypes)
                        .redirectUris(*it.webServerRedirectUri)
                        .scopes(*it.scope)
                        .autoApprove(it.autoApprove)
                        .accessTokenValiditySeconds(it.accessTokenValidity)
            }
        }

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