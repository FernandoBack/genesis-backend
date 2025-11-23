package com.seusistema.genesis.service;

import com.seusistema.genesis.model.Configuracao;
import com.seusistema.genesis.repository.ConfiguracaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConfiguracaoService {

    @Autowired
    private ConfiguracaoRepository repository;

    public Configuracao obterConfiguracao() {
        List<Configuracao> configs = repository.findAll();
        if (configs.isEmpty()) {
            return null;
        }
        return configs.get(0);
    }

    public Configuracao salvarConfiguracao(Configuracao novaConfig) {
        List<Configuracao> configs = repository.findAll();

        if (configs.isEmpty()) {
            // Se não existe, cria a primeira
            return repository.save(novaConfig);
        } else {
            // Se já existe, atualiza a existente (ID 1)
            Configuracao configExistente = configs.get(0);

            configExistente.setNomeEmpresa(novaConfig.getNomeEmpresa());
            configExistente.setSlogan(novaConfig.getSlogan());
            configExistente.setCorPrimaria(novaConfig.getCorPrimaria());
            configExistente.setCorSecundaria(novaConfig.getCorSecundaria());
            configExistente.setLogoUrl(novaConfig.getLogoUrl());
            configExistente.setEmailContato(novaConfig.getEmailContato());

            // 👇 Agora esses métodos vão funcionar porque adicionamos no Modelo
            configExistente.setTelefoneWhatsApp(novaConfig.getTelefoneWhatsApp());
            configExistente.setLinkInstagram(novaConfig.getLinkInstagram());
            configExistente.setMetaDescricao(novaConfig.getMetaDescricao());

            return repository.save(configExistente);
        }
    }
}