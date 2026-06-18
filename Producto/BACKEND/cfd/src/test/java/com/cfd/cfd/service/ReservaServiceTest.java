package com.cfd.cfd.service;

import com.cfd.cfd.dto.ReservaRequestDTO;
import com.cfd.cfd.model.Disponibilidad;
import com.cfd.cfd.model.Usuario;
import com.cfd.cfd.repository.DisponibilidadRepository;
import com.cfd.cfd.repository.ReservaRepository;
import com.cfd.cfd.repository.ServicioRepository;
import com.cfd.cfd.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ReservaServiceTest {

    @Mock
    private ReservaRepository reservaRepository;

    @Mock
    private DisponibilidadRepository disponibilidadRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private ServicioRepository servicioRepository;

    @InjectMocks
    private ReservaService reservaService;

    @Test
    public void testCrearReservaSinCupos_LanzaExcepcion() {
        // PREPARACIÓN
        ReservaRequestDTO request = new ReservaRequestDTO();
        request.setUsuarioId(1);
        request.setDisponibilidadId(10);

        Usuario usuarioMock = new Usuario();
        usuarioMock.setId(1);

        Disponibilidad disponibilidadLlena = new Disponibilidad();
        disponibilidadLlena.setId(10);
        disponibilidadLlena.setCuposTotales(2);
        disponibilidadLlena.setCuposOcupados(2); 

        when(usuarioRepository.findById(1)).thenReturn(Optional.of(usuarioMock));
        when(disponibilidadRepository.findById(10)).thenReturn(Optional.of(disponibilidadLlena));

        Exception exception = assertThrows(RuntimeException.class, () -> {
            reservaService.procesarNuevaReserva(request);
        });
        assertEquals("Lo sentimos, ya no hay cupos disponibles para este horario.", exception.getMessage());
    }
}