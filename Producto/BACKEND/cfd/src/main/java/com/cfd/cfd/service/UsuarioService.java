package com.cfd.cfd.service;

import com.cfd.cfd.dto.PerfilUpdateDTO;
import com.cfd.cfd.model.Usuario;
import com.cfd.cfd.repository.UsuarioRepository;
import com.cfd.cfd.util.ValidacionUtil;
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
        String errorCorreo = ValidacionUtil.validarCorreo(usuario.getCorreo());
        if (errorCorreo != null) {
            throw new RuntimeException(errorCorreo);
        }

        String errorClave = ValidacionUtil.validarClave(usuario.getPasswordHash());
        if (errorClave != null) {
            throw new RuntimeException(errorClave);
        }

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

    public Usuario actualizarPerfil(Integer id, PerfilUpdateDTO dto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));

        if (dto.getNombre() != null && !dto.getNombre().isBlank()) {
            usuario.setNombre(dto.getNombre().trim());
        }
        if (dto.getApellido() != null) {
            usuario.setApellido(dto.getApellido().trim());
        }
        if (dto.getTelefono() != null && !dto.getTelefono().isBlank()) {
            usuario.setTelefono(dto.getTelefono().trim());
        }
        if (dto.getDireccion() != null && !dto.getDireccion().isBlank()) {
            usuario.setDireccion(dto.getDireccion().trim());
        }

        return usuarioRepository.save(usuario);
    }
}