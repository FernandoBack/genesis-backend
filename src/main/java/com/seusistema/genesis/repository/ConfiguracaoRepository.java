package com.seusistema.genesis.repository;

import com.seusistema.genesis.model.Configuracao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfiguracaoRepository extends JpaRepository<Configuracao, Long> {
    // O Spring JPA já cria os métodos findAll(), save(), findById() sozinho.
}