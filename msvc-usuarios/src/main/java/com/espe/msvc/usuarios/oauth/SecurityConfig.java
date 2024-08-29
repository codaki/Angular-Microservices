package com.espe.msvc.usuarios.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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

                        .requestMatchers(HttpMethod.GET, "/getUsers").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.GET, "/findUser/**").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.POST, "/saveUser").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.PUT, "/modificarUser/**").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.DELETE, "/eliminarUser/**").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.PUT, "/eliminarUsuario/**").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.PUT, "/asignarUsuario/**").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.GET, "/usuarioIds/**").hasRole(ADMIN)



                        .anyRequest().authenticated()).csrf(csrf -> csrf.disable());

        http.sessionManagement(sess -> sess.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS));
        http.oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtConverter)));

        return http.build();
    }

//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }

}