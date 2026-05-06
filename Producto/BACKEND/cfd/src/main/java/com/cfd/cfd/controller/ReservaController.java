package com.cfd.cfd.controller;

import com.cfd.cfd.dto.ReservaRequestDTO;
import com.cfd.cfd.model.Reserva;
import com.cfd.cfd.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reservas")
@CrossOrigin(origins = "*") // Permite que tu frontend de React se conecte sin error de CORS
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

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
}