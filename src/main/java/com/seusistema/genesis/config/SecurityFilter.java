package com.seusistema.genesis.config;

import com.seusistema.genesis.model.Usuario;
import com.seusistema.genesis.repository.UsuarioRepository;
import com.seusistema.genesis.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    TokenService tokenService;

    @Autowired
    UsuarioRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            var token = this.recoverToken(request);
            if (token != null) {
                var login = tokenService.validateToken(token);

                if(login != null){
                    // 1. Busca no banco (Retorna Optional)
                    Optional<Usuario> usuarioOptional = userRepository.findByLogin(login);

                    // 2. Verifica se o usuário existe DENTRO do Optional
                    if (usuarioOptional.isPresent()) {
                        // 3. Tira o usuário de dentro da caixa (.get())
                        Usuario user = usuarioOptional.get();

                        // 4. Agora sim o user.getAuthorities() vai funcionar!
                        var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
        } catch (Exception e) {
            // Se der erro no token, apenas ignora e deixa passar como "Anônimo"
            System.out.println("Erro ao validar token: " + e.getMessage());
        }

        // ESSENCIAL: Deixa a requisição continuar o caminho dela
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request){
        var authHeader = request.getHeader("Authorization");
        if(authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}