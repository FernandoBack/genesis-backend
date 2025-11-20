package com.seusistema.genesis.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor; // <--- NOVO
import lombok.Data;
import lombok.NoArgsConstructor;  // <--- NOVO

@Data
@NoArgsConstructor // <--- OBRIGATÓRIO PARA O JPA (BANCO DE DADOS)
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

    @Column(length = 500)
    private String logoUrl;

    private String emailContato;
    private String telefoneWhatsApp;
    private String linkInstagram;

    private String metaDescricao;
}