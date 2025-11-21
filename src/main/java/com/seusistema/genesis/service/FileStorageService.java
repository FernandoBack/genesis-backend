package com.seusistema.genesis.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    // Define onde as fotos serão salvas (pasta 'uploads' na raiz do projeto)
    private final Path fileStorageLocation;

    public FileStorageService() {
        this.fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Não foi possível criar o diretório de upload.", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        try {
            // Gera um nome único (ex: a1b2c3d4-foto.png) para evitar conflitos
            String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

            // Resolve o caminho completo
            Path targetLocation = this.fileStorageLocation.resolve(fileName);

            // Salva o arquivo (substituindo se existir um com mesmo nome, o que é improvável)
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Não foi possível salvar o arquivo " + file.getOriginalFilename(), ex);
        }
    }
}