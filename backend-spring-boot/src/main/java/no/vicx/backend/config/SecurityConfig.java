package no.vicx.backend.config;

import no.vicx.backend.jwt.FusedClaimConverter;
import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest;
import org.springframework.boot.actuate.health.HealthEndpoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .formLogin(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        // port 8082
                        .requestMatchers(EndpointRequest.to(HealthEndpoint.class)).permitAll()

                        // exposes same info as /actuator/info, but on port 8080
                        .requestMatchers(HttpMethod.GET, "/gitproperties").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/calculator").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/calculator").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/calculator").hasAnyRole("USER", "GITHUB_USER")

                        .requestMatchers(HttpMethod.POST, "/api/user").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/**").hasRole("USER")

                        .requestMatchers(HttpMethod.PATCH, "/api/**").hasRole("USER")

                        .requestMatchers(HttpMethod.GET, "/api/**").hasRole("USER")

                        .requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("USER")

                        .requestMatchers("/error").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(new FusedClaimConverter()))
                )
                .headers(headers -> {
                            headers.permissionsPolicyHeader(permissions ->
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
                                                    "base-uri 'self';"  // Restrict base URI
                                    )
                            );
                        }
                )
                .build();
    }
}
