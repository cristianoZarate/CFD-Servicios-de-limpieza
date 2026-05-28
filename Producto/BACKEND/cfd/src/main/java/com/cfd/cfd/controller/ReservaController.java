package com.cfd.cfd.controller;

import com.cfd.cfd.dto.ReservaRequestDTO;
import com.cfd.cfd.model.Reserva;
import com.cfd.cfd.service.ReservaService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reservas")
@CrossOrigin(origins = "*") // Permite que el frontend de React se conecte sin error de CORS
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    // 1. OBTENER TODAS LAS RESERVAS (◄--- NUEVO ENDPOINT CRÍTICO AGREGADO PARA EL DASHBOARD ADMIN ---)
    @GetMapping
    public ResponseEntity<List<Reserva>> listarTodasLasReservas() {
        // Busca todas las reservas almacenadas en la base de datos MySQL de forma general
        List<Reserva> reservas = reservaService.obtenerTodasLasReservas(); 
        return ResponseEntity.ok(reservas);
    }

    // 2. CREAR RESERVA (Público y Clientes)
    @PostMapping
    public ResponseEntity<?> crearReserva(@RequestBody ReservaRequestDTO dto) {
        try {
            Reserva reservaConfirmada = reservaService.procesarNuevaReserva(dto);
            return new ResponseEntity<>(reservaConfirmada, HttpStatus.CREATED); // 201 Created
        } catch (RuntimeException e) {
            // Si no hay cupo o falla algo -> 400 Bad Request
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // 3. LISTAR HISTORIAL ESPECÍFICO DE UN USUARIO
    @GetMapping("/usuario/{id}")
    public List<Reserva> listarPorUsuario(@PathVariable Integer id) {
        return reservaService.obtenerPorUsuario(id);
    }

    // 4. CANCELAR AGENDAMIENTO
    @DeleteMapping("/{id}/cancelar") // 
    public ResponseEntity<?> cancelarReserva(@PathVariable Integer id) {
        reservaService.cancelarReserva(id); // Llama al método que limpia y descuenta el cupo
        return ResponseEntity.ok("Reserva eliminada con éxito");
}
}