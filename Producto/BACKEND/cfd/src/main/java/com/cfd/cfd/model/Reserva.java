package com.cfd.cfd.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservas")
@Data
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "disponibilidad_id", nullable = false)
    private Disponibilidad disponibilidad;

    
    @ManyToOne
    @JoinColumn(name = "servicio_id", nullable = false)
    private CategoriaServicio servicio; 

    private String estado; // "PENDIENTE", "CONFIRMADA", "CANCELADA"

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}