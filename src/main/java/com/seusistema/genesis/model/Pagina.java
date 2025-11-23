package com.seusistema.genesis.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "paginas")
public class Pagina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo; // Ex: "Quem Somos"

    @Column(unique = true) // Não pode ter dois endereços iguais
    private String slug;   // Ex: "quem-somos"

    @Column(columnDefinition = "TEXT") // Permite textos longos
    private String conteudo;
}