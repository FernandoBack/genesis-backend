package com.seusistema.genesis.controller;

import com.seusistema.genesis.model.Pagina;
import com.seusistema.genesis.repository.PaginaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/paginas")
@CrossOrigin(origins = "*") // <--- Força a liberação para o Front/Postman
public class PaginaController {

    @Autowired
    private PaginaRepository paginaRepository;

    // GET (Público)
    @GetMapping
    public List<Pagina> listarTodas() {
        return paginaRepository.findAll();
    }

    // GET (Público)
    @GetMapping("/{slug}")
    public ResponseEntity<Pagina> buscarPorSlug(@PathVariable String slug) {
        return paginaRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST (Privado - Admin)
    @PostMapping
    public Pagina salvar(@RequestBody Pagina pagina) {
        if (pagina.getSlug() == null || pagina.getSlug().isEmpty()) {
            pagina.setSlug(pagina.getTitulo().toLowerCase().replace(" ", "-"));
        }
        return paginaRepository.save(pagina);
    }

    // DELETE (Privado - Admin)
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        paginaRepository.deleteById(id);
    }
}