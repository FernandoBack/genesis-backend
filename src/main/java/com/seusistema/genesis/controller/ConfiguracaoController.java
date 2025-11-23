package com.seusistema.genesis.controller;

import com.seusistema.genesis.model.Configuracao;
import com.seusistema.genesis.service.ConfiguracaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/config")
@CrossOrigin(origins = "*")
public class ConfiguracaoController {

    @Autowired
    private ConfiguracaoService service;

    // 1. Método para PEGAR a configuração (GET)
    @GetMapping
    public Configuracao obterConfig() {
        return service.obterConfiguracao();
    }

    // 2. Método para SALVAR a configuração (POST)
    @PostMapping
    // O @RequestBody pega o JSON que veio do React e transforma na variável 'config'
    public Configuracao salvarConfiguracao(@RequestBody Configuracao config) {

        // 👇 AQUI ESTAVA O ERRO:
        // Antes estava: service.salvarConfiguracao(); (Vazio)
        // Agora está passando o 'config' para dentro do serviço.
        return service.salvarConfiguracao(config);
    }
}