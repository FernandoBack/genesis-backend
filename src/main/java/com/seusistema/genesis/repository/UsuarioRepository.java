package com.seusistema.genesis.repository;

import com.seusistema.genesis.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    // Método especial para o Spring Security achar o usuário pelo login
    UserDetails findByLogin(String login);
}