package com.seusistema.genesis.service;

import com.seusistema.genesis.model.Configuracao;
import com.seusistema.genesis.repository.ConfiguracaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConfiguracaoService {

    @Autowired
    private ConfiguracaoRepository repository;

    public Configuracao salvarConfiguracao(Configuracao novaConfig) {
        // Buscamos TODAS as configurações (como é singleton, deve ter 0 ou 1)
        List<Configuracao> lista = repository.findAll();

        if (!lista.isEmpty()) {
            // CENÁRIO A: Já existe uma configuração. Vamos atualizar a primeira que acharmos.
            Configuracao configExistente = lista.get(0);

            // Atualizamos os dados da existente com os dados novos
            configExistente.setNomeEmpresa(novaConfig.getNomeEmpresa());
            configExistente.setSlogan(novaConfig.getSlogan());
            configExistente.setCorPrimaria(novaConfig.getCorPrimaria());
            configExistente.setCorSecundaria(novaConfig.getCorSecundaria());
            configExistente.setLogoUrl(novaConfig.getLogoUrl());
            configExistente.setEmailContato(novaConfig.getEmailContato());
            configExistente.setTelefoneWhatsApp(novaConfig.getTelefoneWhatsApp());
            configExistente.setLinkInstagram(novaConfig.getLinkInstagram());
            configExistente.setMetaDescricao(novaConfig.getMetaDescricao());

            return repository.save(configExistente);
        } else {
            // CENÁRIO B: Não existe nada. Criamos do zero.
            // IMPORTANTE: NÃO definimos o ID manualmente aqui!
            // O banco vai definir o ID (provavelmente será 1)
            return repository.save(novaConfig);
        }
    }

    public Configuracao buscarConfiguracao() {
        List<Configuracao> lista = repository.findAll();
        if (lista.isEmpty()) {
            return null;
        }
        return lista.get(0); // Retorna a primeira encontrada
    }
}