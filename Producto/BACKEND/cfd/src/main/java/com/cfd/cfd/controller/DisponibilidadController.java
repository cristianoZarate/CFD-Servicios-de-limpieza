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
@CrossOrigin(origins = "*") // Permite la conexión directa con el frontend de React sin errores de CORS
public class DisponibilidadController {

    @Autowired
    private DisponibilidadService disponibilidadService;

    /**
     * Endpoint dinámico que consume React al cambiar de fecha o servicio en la Agenda.
     * Consulta si el día ya existe en MySQL; si no, siembra la jornada automáticamente.
     */
    @GetMapping("/consultar")
    public ResponseEntity<List<Disponibilidad>> consultarHorarios(
            @RequestParam("fecha") String fechaStr, 
            @RequestParam("servicioId") Integer servicioId) {
        
        // 1. Parseamos la fecha en formato ISO (YYYY-MM-DD) enviada por Axios
        LocalDate fecha = LocalDate.parse(fechaStr);
        
        // 2. Ejecutamos la lógica inteligente de verificación y sembrado automático
        List<Disponibilidad> horarios = disponibilidadService.obtenerOGenerarDisponibilidades(fecha, servicioId);
        
        // 3. Retornamos los 12 bloques horarios con sus estados reales de ocupación a React
        return ResponseEntity.ok(horarios);
    }
}