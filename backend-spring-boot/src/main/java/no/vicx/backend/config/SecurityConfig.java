package no.vicx.backend.config;

import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest;
import org.springframework.boot.actuate.health.HealthEndpoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    public static final String X_ACCESS_TOKEN = "X-Access-Token";

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(EndpointRequest.to(HealthEndpoint.class)).permitAll()
                        .requestMatchers("/api/**").permitAll()
                        .requestMatchers("/api-secured/**").authenticated()
                        .anyRequest().denyAll()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .bearerTokenResolver(new CookieBearerResolver(X_ACCESS_TOKEN))
                        .jwt(Customizer.withDefaults())
                );

        http.headers(headers -> {
            headers.permissionsPolicy(permissions ->
                    permissions.policy("geolocation=(), microphone=(), camera=()"));

            headers.contentSecurityPolicy(policyConfig ->
                    policyConfig.policyDirectives(
                            "default-src 'self'; " +
                                    "script-src 'self'; " +
                                    "style-src 'self'; " +
                                    "img-src 'self'; " +
                                    "font-src 'self'; " +
                                    "connect-src 'self'; " +
                                    "media-src 'self'; " +
                                    "frame-src 'none'; " +  // Example for blocking iframes
                                    "frame-ancestors 'none'; " +  // Prevent framing
                                    "form-action 'self'; " +  // Restrict form submissions
                                    "base-uri 'self';"  // Restrict base URI                        ))
                    )
            );
        });
        return http.build();
    }
}
