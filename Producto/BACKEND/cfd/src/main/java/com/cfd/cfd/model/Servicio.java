package com.cfd.cfd.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "servicios")
@Data
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Relación con la categoría
    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private CategoriaServicio categoria;

    private String nombre;
    
    private String descripcion;
    
    private Double precio;

    @Column(name = "duracion_min")
    private Integer duracionMin;

    @Column(name = "imagen_url")
    private String imagenUrl;

    private Boolean activo = true;
}