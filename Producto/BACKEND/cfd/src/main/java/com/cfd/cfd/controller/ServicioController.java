package com.cfd.cfd.controller;

import com.cfd.cfd.model.Servicio;
import com.cfd.cfd.repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/servicios")
@CrossOrigin(origins = "*") // Permite peticiones desde React
public class ServicioController {

    @Autowired
    private ServicioRepository servicioRepository;

    @GetMapping
    public List<Servicio> obtenerCatálogo() {
        // Devuelve solo los servicios activos a la vista del cliente
        return servicioRepository.findByActivoTrue();
    }
}