package com.cfd.cfd.service;

import com.cfd.cfd.model.Usuario;
import com.cfd.cfd.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inyecta el BCryptPasswordEncoder de SecurityConfig

    public Usuario registrar(Usuario usuario) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findByCorreo(usuario.getCorreo());
        if (usuarioExistente.isPresent()) {
            throw new RuntimeException("El correo electrónico ya se encuentra registrado en el sistema.");
        }

        if (usuario.getPasswordHash() != null && !usuario.getPasswordHash().isEmpty()) {
            String passwordEncriptada = passwordEncoder.encode(usuario.getPasswordHash());
            usuario.setPasswordHash(passwordEncriptada);
        }

        if (usuario.getRol() == null || usuario.getRol().isEmpty()) {
            usuario.setRol("CLIENTE"); // Rol por defecto
        }
        usuario.setEstado(true); // Usuario activo

        return usuarioRepository.save(usuario);
    }
}