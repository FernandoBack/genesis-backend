package com.seusistema.genesis.model.dto;

import com.seusistema.genesis.model.enums.UserRole;

public record RegisterDTO(String login, String password, UserRole role) {}
