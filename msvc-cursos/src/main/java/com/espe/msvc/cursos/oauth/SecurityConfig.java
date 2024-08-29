package com.espe.msvc.cursos.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    public static final String ADMIN = "admin";
    private final JwtConverter jwtConverter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults()) // Enable CORS
                .authorizeHttpRequests((authz) ->
                        authz
                                .requestMatchers(HttpMethod.GET, "/getCursos").hasRole(ADMIN)
                                .requestMatchers(HttpMethod.GET, "/findCurso/**").hasRole(ADMIN)
                                .requestMatchers(HttpMethod.POST, "/saveCurso").hasRole(ADMIN)
                                .requestMatchers(HttpMethod.PUT, "/modificarCurso/**").hasRole(ADMIN)
                                .requestMatchers(HttpMethod.DELETE, "/eliminarCurso/**").hasRole(ADMIN)
                                .requestMatchers(HttpMethod.PUT, "/eliminarUsuario/**").hasRole(ADMIN)
                                .requestMatchers(HttpMethod.PUT, "/asignarUsuario/**").hasRole(ADMIN)
                                .requestMatchers(HttpMethod.GET, "/usuarioIds/**").hasRole(ADMIN)
                                .anyRequest().authenticated()
                )
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtConverter)));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200")); // Add allowed origins
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
