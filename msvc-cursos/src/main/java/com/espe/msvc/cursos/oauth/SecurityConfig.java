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

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    public static final String ADMIN = "admin";
  //  public static final String USER = "user";
    private final JwtConverter jwtConverter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((authz) ->
                authz
                        .requestMatchers(HttpMethod.GET, "/getCursos").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.GET, "/findCurso/**").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.POST, "/saveCurso").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.PUT, "/modificarCurso/**").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.DELETE, "/eliminarCurso/**").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.PUT, "/eliminarUsuario/**").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.PUT, "/asignarUsuario/**").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.GET, "/usuarioIds/**").hasRole(ADMIN)



                        .anyRequest().authenticated()).csrf(csrf -> csrf.disable());

        http.sessionManagement(sess -> sess.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS));
        http.oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtConverter)));

        return http.build();
    }

}