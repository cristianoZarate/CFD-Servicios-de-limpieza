package com.cfd.cfd.controller;

import com.cfd.cfd.model.Usuario;
import com.cfd.cfd.repository.UsuarioRepository;
import com.cfd.cfd.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/usuarios")
@CrossOrigin(origins = "*") // Desbloquea peticiones desde el frontend de React
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * GET /api/v1/usuarios
     * Obtiene la lista completa de usuarios registrados en el sistema.
     * Ideal para poblar la nueva sección de "Clientes" del Dashboard.
     */
    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        
        // Por estricta seguridad, limpiamos el hash de la contraseña antes de mandarlo al frontend
        usuarios.forEach(u -> u.setPasswordHash(null));
        
        return ResponseEntity.ok(usuarios);
    }

    /**
     * POST /api/v1/usuarios
     * Creación y registro de un nuevo usuario en el sistema de manera limpia y REST pura.
     */
    @PostMapping
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) {
        try {
            Usuario nuevoUsuario = usuarioService.registrar(usuario);
            // Retorna un estado 201 Created junto con el objeto guardado y su ID real autogenerada
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
        } catch (Exception e) {
            // Retorna un estado 400 Bad Request junto con el mensaje de error real de la validación
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}