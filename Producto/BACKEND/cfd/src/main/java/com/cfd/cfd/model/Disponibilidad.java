package com.cfd.cfd.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "disponibilidad")
@Data
public class Disponibilidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
//Si esta clase servicio cambiar a 
// @ManyToOne @JoinColumn(name = "servicio_id") private Servicio servicio;
    @Column(name = "servicio_id")
    private Integer servicioId; 

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