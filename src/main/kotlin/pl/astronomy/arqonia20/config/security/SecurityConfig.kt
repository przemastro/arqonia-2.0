package pl.astronomy.arqonia20.config.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.core.env.Environment
import org.springframework.core.io.ClassPathResource
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.oauth2.provider.ClientDetailsService
import org.springframework.security.oauth2.provider.approval.ApprovalStore
import org.springframework.security.oauth2.provider.approval.TokenApprovalStore
import org.springframework.security.oauth2.provider.approval.TokenStoreUserApprovalHandler
import org.springframework.security.oauth2.provider.request.DefaultOAuth2RequestFactory
import org.springframework.security.oauth2.provider.token.TokenStore
import pl.astronomy.arqonia20.config.security.userdetails.ArqoniaUserDetailsService
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore
import org.springframework.security.oauth2.provider.token.store.KeyStoreKeyFactory
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler
import pl.astronomy.arqonia20.config.security.customlogin.CustomAccessDeniedHandler
import pl.astronomy.arqonia20.config.security.customlogin.CustomAuthenticationSuccessHandler
import pl.astronomy.arqonia20.config.security.customlogin.RestAuthenticationEntryPoint
import pl.astronomy.arqonia20.domain.user.UserRepository

@Configuration
@EnableWebSecurity
class SecurityConfig(
        private val restAuthenticationEntryPoint: RestAuthenticationEntryPoint,
        private val successHandler: CustomAuthenticationSuccessHandler,
        private val accessDeniedHandler: CustomAccessDeniedHandler,
        private val clientDetailsService: ClientDetailsService,
        private val arqoniaUserDetailsService: ArqoniaUserDetailsService,
        private val userRepository: UserRepository,
        @Value("\${arqonia.admin.username}") private val adminUsername: String,
        private val environment: Environment
) : WebSecurityConfigurerAdapter() {

    private val failureHandler = SimpleUrlAuthenticationFailureHandler()

    @Autowired
    @Throws(Exception::class)
    fun globalUserDetails(auth: AuthenticationManagerBuilder) {
        auth
                .userDetailsService(arqoniaUserDetailsService)
                .passwordEncoder(passwordEncoder())
    }

    // TODO CSRF protection - to implement !!
    @Order(Ordered.HIGHEST_PRECEDENCE)
    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http.authorizeRequests()
//                .antMatchers("/login").permitAll()
//                .antMatchers("/oauth").permitAll()
//                .antMatchers("/signup").permitAll()
                .antMatchers("/*").permitAll() // TODO Probably detailed list of urls is needed...
                .antMatchers("/assets/images/*").permitAll()
//                .antMatchers("/oauth/token/revokeById/**").permitAll()
//                .antMatchers("/tokens/**").permitAll()
                .anyRequest().authenticated()
//                .and().formLogin().permitAll()
                .and().csrf().disable()
                .exceptionHandling().accessDeniedHandler(accessDeniedHandler).authenticationEntryPoint(restAuthenticationEntryPoint)
                .and().formLogin().successHandler(successHandler).failureHandler(failureHandler)

    }

    @Order(Ordered.HIGHEST_PRECEDENCE)
    @Bean
    @Throws(Exception::class)
    override fun authenticationManagerBean(): AuthenticationManager {
        return super.authenticationManagerBean()
    }

    @Bean
    fun tokenStore(): TokenStore {
        return JwtTokenStore(jwtTokenEnhancer())
    }

    @Bean
    protected fun jwtTokenEnhancer(): JwtAccessTokenConverter {
        val keyStoreKeyFactory = if (environment.activeProfiles.contains("integration")) {
            KeyStoreKeyFactory(
                    ClassPathResource("keystore/jwt/arqonia_jwt_key.jks"),
                    "arqoniaSuperPass12".toCharArray())
        } else {
            KeyStoreKeyFactory(
                    ClassPathResource("keystore/jwt/arqonia_jwt_key.jks"),
                    userRepository.findByUsername(adminUsername).password.toCharArray())
        }

        val converter = JwtAccessTokenConverter()
        converter.setKeyPair(keyStoreKeyFactory.getKeyPair("arqonia_jwt_key"))

        return converter
    }

    @Bean
    @Autowired
    fun userApprovalHandler(tokenStore: TokenStore): TokenStoreUserApprovalHandler {
        val handler = TokenStoreUserApprovalHandler()
        handler.setTokenStore(tokenStore)
        handler.setRequestFactory(DefaultOAuth2RequestFactory(clientDetailsService))
        handler.setClientDetailsService(clientDetailsService)
        return handler
    }

    @Bean
    @Autowired
    @Throws(Exception::class)
    fun approvalStore(tokenStore: TokenStore): ApprovalStore {
        val store = TokenApprovalStore()
        store.setTokenStore(tokenStore)
        return store
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }
}
