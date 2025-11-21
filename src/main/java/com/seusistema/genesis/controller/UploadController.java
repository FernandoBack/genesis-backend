package com.seusistema.genesis.controller;

import com.seusistema.genesis.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
// 👇 ESSA É A LINHA QUE ESTAVA FALTANDO:
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        // MUDANÇA: Vamos forçar o endereço completo do servidor
        // Isso garante que o React saiba que deve buscar na porta 8080
        String fileDownloadUri = "http://localhost:8080/uploads/" + fileName;

        Map<String, String> response = new HashMap<>();
        response.put("url", fileDownloadUri);

        return ResponseEntity.ok(response);
    }
}