package com.cfd.cfd.service;

import com.cfd.cfd.model.Disponibilidad;
import com.cfd.cfd.model.Servicio;
import com.cfd.cfd.repository.DisponibilidadRepository;
import com.cfd.cfd.repository.ServicioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class DisponibilidadServiceTest {

    @Mock
    private DisponibilidadRepository disponibilidadRepository;

    @Mock
    private ServicioRepository servicioRepository;

    @InjectMocks
    private DisponibilidadService disponibilidadService;

    /**
    Si ya existen bloques para la fecha y servicio, el servicio
    debe devolverlos TAL CUAL están, sin generar ni guardar nuevos.
     */
    @Test
    void testObtenerDisponibilidades_RetornaExistentesSinRegenerar() {
        LocalDate fecha = LocalDate.of(2026, 7, 1);
        Integer servicioId = 1;

        Disponibilidad existente = new Disponibilidad();
        existente.setId(99);
        existente.setFecha(fecha);
        existente.setHoraInicio(LocalTime.of(9, 0));
        existente.setHoraFin(LocalTime.of(10, 0));
        existente.setCuposTotales(1);
        existente.setCuposOcupados(0);

        when(disponibilidadRepository.findByFechaAndServicioId(fecha, servicioId))
                .thenReturn(List.of(existente));

        List<Disponibilidad> resultado = disponibilidadService.obtenerOGenerarDisponibilidades(fecha, servicioId);

        assertEquals(1, resultado.size());
        assertEquals(99, resultado.get(0).getId());

        // No debe consultar el servicio ni generar nuevos bloques
        verify(servicioRepository, never()).findById(any());
        verify(disponibilidadRepository, never()).saveAll(any());
    }

    /**
     Si no existen bloques para la fecha y servicio, el servicio
     debe generar exactamente 11 bloques de 1 hora (09:00 a 20:00),
     con cuposTotales = 1 y cuposOcupados = 0.
     */
    @Test
    void testGenerarDisponibilidades_Genera11BloquesDeUnaHora() {
        LocalDate fecha = LocalDate.of(2026, 7, 2);
        Integer servicioId = 1;

        Servicio servicio = new Servicio();
        servicio.setId(servicioId);
        servicio.setNombre("Aseo Residencial Regular");

        when(disponibilidadRepository.findByFechaAndServicioId(fecha, servicioId))
                .thenReturn(Collections.emptyList());
        when(servicioRepository.findById(servicioId)).thenReturn(Optional.of(servicio));

        @SuppressWarnings("unchecked")
        ArgumentCaptor<List<Disponibilidad>> captor = ArgumentCaptor.forClass(List.class);
        when(disponibilidadRepository.saveAll(captor.capture()))
                .thenAnswer(invocation -> invocation.getArgument(0));

        List<Disponibilidad> resultado = disponibilidadService.obtenerOGenerarDisponibilidades(fecha, servicioId);

        // Exactamente 11 fechas
        assertEquals(11, resultado.size());

        for (int i = 0; i < resultado.size(); i++) {
            Disponibilidad d = resultado.get(i);
            int horaEsperada = 9 + i;

            assertEquals(LocalTime.of(horaEsperada, 0), d.getHoraInicio());
            assertEquals(LocalTime.of(horaEsperada + 1, 0), d.getHoraFin(), "Cada bloque debe durar exactamente 1 hora");
            assertEquals(1, d.getCuposTotales());
            assertEquals(0, d.getCuposOcupados());
            assertEquals(fecha, d.getFecha());
        }

        // Verificar que no hay solapamiento: horaFin de un bloque == horaInicio del siguiente
        for (int i = 0; i < resultado.size() - 1; i++) {
            assertEquals(resultado.get(i).getHoraFin(), resultado.get(i + 1).getHoraInicio(),
                    "No debe existir solapamiento ni huecos entre bloques consecutivos");
        }

        verify(disponibilidadRepository, times(1)).saveAll(any());
    }
}