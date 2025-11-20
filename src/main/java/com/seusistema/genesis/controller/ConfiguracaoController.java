package com.seusistema.genesis.controller;

import com.seusistema.genesis.model.Configuracao;
import com.seusistema.genesis.service.ConfiguracaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/config")
@CrossOrigin(origins = "*") // Libera acesso para o React (importante!)
public class ConfiguracaoController {

    @Autowired
    private ConfiguracaoService service;

    // GET: Retorna as cores e nome do site
    @GetMapping
    public Configuracao getDadosSite() {
        return service.buscarConfiguracao();
    }

    // POST: Admin atualiza os dados
    @PostMapping
    public Configuracao atualizarDados(@RequestBody Configuracao config) {
        return service.salvarConfiguracao(config);
    }
}