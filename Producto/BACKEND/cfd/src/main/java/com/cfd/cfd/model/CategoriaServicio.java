package com.cfd.cfd.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "categorias_servicio")
@Data
public class CategoriaServicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;
    
    private String descripcion;
    
    private Boolean activo = true;
}