package com.seusistema.genesis.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path uploadDir = Paths.get("./uploads");
        String uploadPath = uploadDir.toFile().getAbsolutePath();

        // CORREÇÃO PARA WINDOWS:
        // Se estiver no Windows, o caminho precisa começar com / e ter barras normais
        if (System.getProperty("os.name").toLowerCase().contains("windows")) {
            uploadPath = "/" + uploadPath.replace("\\", "/");
        }

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadPath + "/");
    }
}