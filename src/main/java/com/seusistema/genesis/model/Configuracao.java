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

    @Column(columnDefinition = "TEXT") // <--- MUDANÇA: Aceita texto infinito
    private String slogan;

    private String corPrimaria;
    private String corSecundaria;

    @Column(columnDefinition = "TEXT") // <--- MUDANÇA: Links de imagens costumam ser gigantes
    private String logoUrl;

    private String emailContato;
    private String telefoneWhatsApp;
    private String linkInstagram;

    @Column(columnDefinition = "TEXT") // <--- MUDANÇA: Descrição para SEO é grande
    private String metaDescricao;
}