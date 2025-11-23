package com.seusistema.genesis.controller;

import com.seusistema.genesis.model.dto.RegisterDTO;
import com.seusistema.genesis.model.dto.AuthenticationDTO;
import com.seusistema.genesis.model.dto.LoginResponseDTO;
import com.seusistema.genesis.model.Usuario;
import com.seusistema.genesis.model.enums.UserRole;
import com.seusistema.genesis.repository.UsuarioRepository;
import com.seusistema.genesis.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UsuarioRepository repository;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((Usuario) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterDTO data){

        if(repository.findByLogin(data.login()).isPresent()){
            return ResponseEntity.badRequest().body("Login já existe");
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());

        Usuario novo = new Usuario(data.login(), encryptedPassword, data.role());
        repository.save(novo);

        return ResponseEntity.ok("Usuário cadastrado com sucesso");
    }
}
