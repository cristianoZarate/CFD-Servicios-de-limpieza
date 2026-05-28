package com.cfd.cfd.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; // ◄--- INCORPORADO: Permite filtrar las reglas por verbo HTTP
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;

    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Encripta contraseñas automáticamente
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. Vinculamos de manera explícita nuestro método de CORS con Spring Security
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll() // Login y Registro abiertos de forma nativa
                
                // --- GARANTÍA DE PASO LIBRE PARA ENDPOINTS PÚBLICOS DE LA AGENDA ---
                .requestMatchers("/api/v1/servicios/**").permitAll() 
                .requestMatchers("/api/v1/reservas/**").permitAll()
                .requestMatchers("/api/v1/disponibilidad/**").permitAll() 
                // ----------------------------------------------------------------------------------------------
                
                // ◄--- ACTUALIZADO: Opción 2 activa. Otorga pase libre temporal al GET de usuarios para quitar el 403
                .requestMatchers(HttpMethod.GET, "/api/v1/usuarios").permitAll()
                
                .requestMatchers("/swagger-ui/**").permitAll() // Permitir Swagger
                .requestMatchers("/v3/api-docs/**").permitAll() 
                .requestMatchers("/swagger-ui.html").permitAll()  
                .anyRequest().authenticated() // Otros módulos de administración profunda requieren Token      
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    // 2. CONFIGURACIÓN GLOBAL DE CORS: Desbloquea la seguridad del navegador para React
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Damos permiso explícito al origen local de tu frontend
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://127.0.0.1:5173")); 
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Habilitamos las cabeceras estándar de Content-Type y Authorization para JWT
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Cache-Control"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Aplica el permiso a todos los endpoints del backend
        return source;
    }
}