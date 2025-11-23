package com.seusistema.genesis.repository;

import com.seusistema.genesis.model.Pagina;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaginaRepository extends JpaRepository<Pagina, Long> {
    // Mágica do Spring: Ele cria o SQL "SELECT * FROM paginas WHERE slug = ?" sozinho
    Optional<Pagina> findBySlug(String slug);
}