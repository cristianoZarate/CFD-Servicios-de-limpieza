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

    /**
     * Procesa las reglas de negocio del registro: valida duplicados,
     * encripta el password y setea valores por defecto.
     */
    public Usuario registrar(Usuario usuario) {
        // 1. Verificación de seguridad: si el correo ya existe, frena el flujo
        Optional<Usuario> usuarioExistente = usuarioRepository.findByCorreo(usuario.getCorreo());
        if (usuarioExistente.isPresent()) {
            throw new RuntimeException("El correo electrónico ya se encuentra registrado en el sistema.");
        }

        // 2. Encriptación obligatoria para Spring Security
        if (usuario.getPasswordHash() != null && !usuario.getPasswordHash().isEmpty()) {
            String passwordEncriptada = passwordEncoder.encode(usuario.getPasswordHash());
            usuario.setPasswordHash(passwordEncriptada);
        }

        // 3. Seteo de campos por defecto para un flujo controlado
        if (usuario.getRol() == null || usuario.getRol().isEmpty()) {
            usuario.setRol("CLIENTE"); // Rol por defecto
        }
        usuario.setEstado(true); // Usuario activo

        // 4. Guardar en MySQL (Hibernate poblará la ID automáticamente)
        return usuarioRepository.save(usuario);
    }
}