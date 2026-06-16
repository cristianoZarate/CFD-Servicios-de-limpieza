package com.cfd.cfd.controller;

import com.cfd.cfd.model.Disponibilidad;
import com.cfd.cfd.service.DisponibilidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/disponibilidad")
@CrossOrigin(origins = "*")
public class DisponibilidadController {

    @Autowired
    private DisponibilidadService disponibilidadService;
    @GetMapping("/consultar")
    public ResponseEntity<List<Disponibilidad>> consultarHorarios(
            @RequestParam("fecha") String fechaStr, 
            @RequestParam("servicioId") Integer servicioId) {
        
        LocalDate fecha = LocalDate.parse(fechaStr);
        List<Disponibilidad> horarios = disponibilidadService.obtenerOGenerarDisponibilidades(fecha, servicioId);
        return ResponseEntity.ok(horarios);
    }
}