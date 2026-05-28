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
     * Vincula de manera dinámica al usuario autenticado que gatilló el flujo en React.
     */
    @Transactional
    public Reserva procesarNuevaReserva(ReservaRequestDTO dto) {
        
        // 1. Buscar al usuario dinámico que viene en el payload desde el Frontend
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado en el sistema con ID: " + dto.getUsuarioId()));

        // 2. Buscar el bloque horario de disponibilidad seleccionado
        Disponibilidad disp = disponibilidadRepository.findById(dto.getDisponibilidadId())
                .orElseThrow(() -> new RuntimeException("Horario de disponibilidad no encontrado"));

        // 3. Validar si existen cupos disponibles (Regla de negocio principal)
        if (disp.getCuposOcupados() >= disp.getCuposTotales()) {
            throw new RuntimeException("Lo sentimos, ya no hay cupos disponibles para este horario.");
        }

        // 4. Actualizar el estado de la disponibilidad (Sumar 1 a los cupos ocupados)
        disp.setCuposOcupados(disp.getCuposOcupados() + 1);
        disponibilidadRepository.save(disp);

        // 5. Instanciar la reserva amarrando las entidades relacionales correctas
        Reserva nuevaReserva = new Reserva();
        nuevaReserva.setUsuario(usuario); // Se inyecta el objeto Usuario dinámico de MySQL
        nuevaReserva.setDisponibilidad(disp);
        nuevaReserva.setEstado("CONFIRMADA"); // Pasa directo a confirmada al omitir Webpay/transacciones
        nuevaReserva.setServicio(categoriaServicioRepository.findById(dto.getServicioId().intValue())
        .orElseThrow(() -> new RuntimeException("Servicio no encontrado")));
        reservaRepository.save(nuevaReserva);

        return reservaRepository.save(nuevaReserva);
    }

    /**
     * Obtiene el historial de reservas de un cliente específico
     */
    public List<Reserva> obtenerPorUsuario(Integer usuarioId) {
        return reservaRepository.findByUsuarioId(usuarioId);
    }

    /**
     * Cancela un agendamiento liberando el cupo horario correspondiente
     */
    @Transactional
    public void cancelarReserva(Integer reservaId) {
        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
        
        if ("CANCELADA".equalsIgnoreCase(reserva.getEstado())) {
            throw new RuntimeException("La reserva ya está cancelada.");
        }

        // Devolvemos el cupo al bloque de disponibilidad
        Disponibilidad disp = reserva.getDisponibilidad();
        disp.setCuposOcupados(disp.getCuposOcupados() - 1);
        disponibilidadRepository.save(disp);

        reserva.setEstado("CANCELADA");
        reservaRepository.save(reserva);
    }

    /**
     * Recupera el listado completo de agendamientos para el panel administrativo
     */
    public List<Reserva> obtenerTodasLasReservas() {
        return reservaRepository.findAll();
    }
}