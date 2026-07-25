package com.yognasetu.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${FRONTEND_URL:}")
    private String frontendUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        List<String> allowedOrigins = Arrays.stream(frontendUrl.split(","))
                .map(String::trim)
                .filter(origin -> !origin.isBlank())
                .toList();

        if (allowedOrigins.isEmpty()) {
            allowedOrigins = List.of(
                    "http://localhost:3000", "http://localhost:3001", "http://localhost:5173",
                    "http://127.0.0.1:3000", "http://127.0.0.1:5173"
            );
        }

        registry.addMapping("/**")
                .allowedOriginPatterns(allowedOrigins.toArray(String[]::new))
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
