package com.cfd.cfd.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "disponibilidad")
@Data // Lombok generará los getters, setters, equals y hashcode de 'servicio' automáticamente
public class Disponibilidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // --- RELACIÓN CORREGIDA: Conexión relacional con la entidad Servicio ---
    @ManyToOne
    @JoinColumn(name = "servicio_id", nullable = false)
    private Servicio servicio; 
    // ----------------------------------------------------------------------

    private LocalDate fecha;
    
    @Column(name = "hora_inicio")
    private LocalTime horaInicio;
    
    @Column(name = "hora_fin")
    private LocalTime horaFin;
    
    @Column(name = "cupos_totales")
    private Integer cuposTotales;
    
    @Column(name = "cupos_ocupados")
    private Integer cuposOcupados = 0;
}