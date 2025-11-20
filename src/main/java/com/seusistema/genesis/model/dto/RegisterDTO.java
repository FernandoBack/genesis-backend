package com.seusistema.genesis.model.dto;

import com.seusistema.genesis.model.enums.UserRole; // Agora essa linha vai funcionar!

// O campo 'role' agora é do tipo UserRole, não mais String
public record RegisterDTO(String login, String senha, UserRole role) {
}