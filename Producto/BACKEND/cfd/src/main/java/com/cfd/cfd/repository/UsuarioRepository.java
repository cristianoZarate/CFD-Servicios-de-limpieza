package com.cfd.cfd.repository;

import com.cfd.cfd.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // Spring Boot crea "SELECT * FROM usuarios WHERE correo = ?" automáticamente
    Optional<Usuario> findByCorreo(String correo);
}