package com.seusistema.genesis.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "configuracao_sistema")
public class Configuracao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeEmpresa;
    private String slogan;
    private String corPrimaria;
    private String corSecundaria;
    private String emailContato;
    private String logoUrl;

    // 👇 Campos que estavam faltando e causando erro no Service
    private String telefoneWhatsApp;
    private String linkInstagram;
    private String metaDescricao;
}