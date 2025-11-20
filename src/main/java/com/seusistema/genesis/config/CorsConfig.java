package com.seusistema.genesis.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*") // <--- LIBERA QUALQUER PORTA (5173, 5174, 3000...)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}