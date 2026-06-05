package com.cfd.cfd.service;

import com.cfd.cfd.dto.ReservaRequestDTO;
import com.cfd.cfd.model.Disponibilidad;
import com.cfd.cfd.model.Reserva;
import com.cfd.cfd.model.Usuario;
import com.cfd.cfd.repository.CategoriaServicioRepository;
import com.cfd.cfd.repository.DisponibilidadRepository;
import com.cfd.cfd.repository.ReservaRepository;
import com.cfd.cfd.repository.UsuarioRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private DisponibilidadRepository disponibilidadRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CategoriaServicioRepository categoriaServicioRepository;

    /**
     * Procesa y almacena de forma atómica una nueva reserva en MySQL.
     */
    @Transactional
    public Reserva procesarNuevaReserva(ReservaRequestDTO dto) {

        // 1. Buscar al usuario
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException(
                        "Usuario no encontrado en el sistema con ID: " + dto.getUsuarioId()));

        // 2. Buscar el bloque horario
        Disponibilidad disp = disponibilidadRepository.findById(dto.getDisponibilidadId())
                .orElseThrow(() -> new RuntimeException("Horario de disponibilidad no encontrado"));

        // 3. Validar cupos disponibles (regla de negocio principal)
        if (disp.getCuposOcupados() >= disp.getCuposTotales()) {
            throw new RuntimeException("Lo sentimos, ya no hay cupos disponibles para este horario.");
        }

        // 4. Decrementar cupo ocupado
        disp.setCuposOcupados(disp.getCuposOcupados() + 1);
        disponibilidadRepository.save(disp);

        // 5. Construir la reserva con todos los campos ANTES de persistir
        Reserva nuevaReserva = new Reserva();
        nuevaReserva.setUsuario(usuario);
        nuevaReserva.setDisponibilidad(disp);
        nuevaReserva.setEstado("CONFIRMADA");
        nuevaReserva.setServicio(
                categoriaServicioRepository.findById(dto.getServicioId().intValue())
                        .orElseThrow(() -> new RuntimeException("Servicio no encontrado")));

        return reservaRepository.save(nuevaReserva);
    }

    /**
     * Obtiene el historial de reservas de un cliente específico.
     */
    public List<Reserva> obtenerPorUsuario(Integer usuarioId) {
        return reservaRepository.findByUsuarioId(usuarioId);
    }

    /**
     * Cancela un agendamiento liberando el cupo horario correspondiente.
     */
    @Transactional
    public void cancelarReserva(Integer reservaId) {
        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        if ("CANCELADA".equalsIgnoreCase(reserva.getEstado())) {
            throw new RuntimeException("La reserva ya está cancelada.");
        }

        // Devolver el cupo al bloque de disponibilidad
        Disponibilidad disp = reserva.getDisponibilidad();
        disp.setCuposOcupados(disp.getCuposOcupados() - 1);
        disponibilidadRepository.save(disp);

        reserva.setEstado("CANCELADA");
        reservaRepository.save(reserva);
    }

    /**
     * Recupera el listado completo de agendamientos para el panel administrativo.
     */
    public List<Reserva> obtenerTodasLasReservas() {
        return reservaRepository.findAll();
    }
}