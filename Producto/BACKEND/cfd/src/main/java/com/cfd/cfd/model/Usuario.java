package com.cfd.cfd.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
@Data // Lombok: genera getters, setters, toString, etc.
@NoArgsConstructor // Constructor vacío
@AllArgsConstructor // Constructor con todo
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String correo;

    @Column(nullable = false)
    private String passwordHash;

    private String nombre;
    private String apellido;
    private String rol; // ej: "ADMIN", "CLIENTE"
    private Boolean estado = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}