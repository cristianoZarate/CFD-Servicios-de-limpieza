package com.cfd.cfd.service;

import com.cfd.cfd.dto.ReservaRequestDTO;
import com.cfd.cfd.model.Disponibilidad;
import com.cfd.cfd.model.Reserva;
import com.cfd.cfd.model.Usuario;
import com.cfd.cfd.repository.DisponibilidadRepository;
import com.cfd.cfd.repository.ReservaRepository;
import com.cfd.cfd.repository.UsuarioRepository;
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

    // Usamos @Transactional para que, si algo falla, la BD deshaga los cambios (Rollback)
    @Transactional
    public Reserva procesarNuevaReserva(ReservaRequestDTO dto) {
        
        // 1. Buscar al usuario
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. Buscar la disponibilidad seleccionada
        Disponibilidad disp = disponibilidadRepository.findById(dto.getDisponibilidadId())
                .orElseThrow(() -> new RuntimeException("Horario no encontrado"));

        // 3. Validar si hay cupo (¡La regla de negocio más importante!)
        if (disp.getCuposOcupados() >= disp.getCuposTotales()) {
            throw new RuntimeException("Lo sentimos, ya no hay cupos para este horario.");
        }

        // 4. Descontar el cupo (Sumar 1 a los ocupados)
        disp.setCuposOcupados(disp.getCuposOcupados() + 1);
        disponibilidadRepository.save(disp);

        // 5. Crear la reserva confirmada
        Reserva nuevaReserva = new Reserva();
        nuevaReserva.setUsuario(usuario);
        nuevaReserva.setDisponibilidad(disp);
        nuevaReserva.setEstado("CONFIRMADA"); // Pasa directo a confirmada porque ya no hay pagos

        return reservaRepository.save(nuevaReserva);
    }
}