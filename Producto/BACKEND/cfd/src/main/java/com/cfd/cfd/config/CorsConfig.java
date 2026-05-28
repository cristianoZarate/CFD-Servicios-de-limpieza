package com.cfd.cfd.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/*") // Esto aplica el permiso a todas tus rutas (/api/v1/...)
                .allowedOrigins(
                    "http://localhost:5173/", 
                    "https://cfd-servicios-de-limpieza.vercel.app/",
                    "https://cfd-servicios-de-limpieza-i5qw96orm-fernando-za-s-projects.vercel.app/"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("")
                .allowCredentials(true);
    }
}