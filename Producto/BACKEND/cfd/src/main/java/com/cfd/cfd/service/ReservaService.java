package com.cfd.cfd.service;

import com.cfd.cfd.dto.ReservaRequestDTO;
import com.cfd.cfd.model.Disponibilidad;
import com.cfd.cfd.model.Reserva;
import com.cfd.cfd.model.Usuario;
import com.cfd.cfd.repository.DisponibilidadRepository;
import com.cfd.cfd.repository.ReservaRepository;
import com.cfd.cfd.repository.ServicioRepository;
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
    private ServicioRepository servicioRepository;

    @Transactional
    public Reserva procesarNuevaReserva(ReservaRequestDTO dto) {

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException(
                        "Usuario no encontrado con ID: " + dto.getUsuarioId()));

        Disponibilidad disp = disponibilidadRepository.findById(dto.getDisponibilidadId())
                .orElseThrow(() -> new RuntimeException("Horario de disponibilidad no encontrado"));

        if (disp.getCuposOcupados() >= disp.getCuposTotales()) {
            throw new RuntimeException("Lo sentimos, ya no hay cupos disponibles para este horario.");
        }

        disp.setCuposOcupados(disp.getCuposOcupados() + 1);
        disponibilidadRepository.save(disp);

        Reserva nuevaReserva = new Reserva();
        nuevaReserva.setUsuario(usuario);
        nuevaReserva.setDisponibilidad(disp);
        nuevaReserva.setEstado("CONFIRMADA");
        nuevaReserva.setServicio(
                servicioRepository.findById(dto.getServicioId().intValue())
                        .orElseThrow(() -> new RuntimeException("Servicio no encontrado")));

        return reservaRepository.save(nuevaReserva);
    }

    public List<Reserva> obtenerPorUsuario(Integer usuarioId) {
        return reservaRepository.findByUsuarioId(usuarioId);
    }

    @Transactional
    public void cancelarReserva(Integer reservaId) {
        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        if ("CANCELADA".equalsIgnoreCase(reserva.getEstado())) {
            throw new RuntimeException("La reserva ya está cancelada.");
        }

        Disponibilidad disp = reserva.getDisponibilidad();
        disp.setCuposOcupados(disp.getCuposOcupados() - 1);
        disponibilidadRepository.save(disp);

        reserva.setEstado("CANCELADA");
        reservaRepository.save(reserva);
    }

    public List<Reserva> obtenerTodasLasReservas() {
        return reservaRepository.findAll();
    }
}