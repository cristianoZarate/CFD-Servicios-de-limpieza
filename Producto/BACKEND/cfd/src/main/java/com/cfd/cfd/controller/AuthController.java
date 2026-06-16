package com.cfd.cfd.controller;

import com.cfd.cfd.model.Usuario;
import com.cfd.cfd.repository.UsuarioRepository;
import com.cfd.cfd.security.JwtUtil;
import com.cfd.cfd.util.ValidacionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*") 
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {

        String errorCorreo = ValidacionUtil.validarCorreo(usuario.getCorreo());
        if (errorCorreo != null) {
            return ResponseEntity.badRequest().body(errorCorreo);
        }

        String errorClave = ValidacionUtil.validarClave(usuario.getPasswordHash());
        if (errorClave != null) {
            return ResponseEntity.badRequest().body(errorClave);
        }

        if (usuarioRepository.findByCorreo(usuario.getCorreo()).isPresent()) {
            return ResponseEntity.badRequest().body("El correo ya está registrado");
        }
        
        if (usuario.getRol() == null || usuario.getRol().trim().isEmpty()) {
            usuario.setRol("cliente");
        }
        
        // Encriptamos la contraseña usando BCrypt antes de guardarla en MySQL
        usuario.setPasswordHash(passwordEncoder.encode(usuario.getPasswordHash()));
        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Usuario registrado exitosamente");
    }

    //  ENDPOINT DE LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.get("correo"), loginRequest.get("password"))
            );
            
            // Si las credenciales son correctas, fabricamos el token JWT
            String token = jwtUtil.generateToken(loginRequest.get("correo"));
            
            // Buscamos al usuario real con orElseThrow para máxima seguridad
            Usuario usuarioReal = usuarioRepository.findByCorreo(loginRequest.get("correo"))
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado en la base de datos"));
            
            // Armamos la estructura de respuesta múltiple (Token + Objeto Usuario)
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            
            // Creamos un sub-objeto con los datos seguros del usuario mapeados para el Local Storage
            Map<String, Object> usuarioInfo = new HashMap<>();
            usuarioInfo.put("id", usuarioReal.getId());
            usuarioInfo.put("nombre", usuarioReal.getNombre());
            usuarioInfo.put("correo", usuarioReal.getCorreo());
            usuarioInfo.put("rol", usuarioReal.getRol()); 
            
            response.put("usuario", usuarioInfo);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }
}