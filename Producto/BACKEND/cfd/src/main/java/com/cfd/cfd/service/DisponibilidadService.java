package com.cfd.cfd.service;

import com.cfd.cfd.model.Disponibilidad;
import com.cfd.cfd.model.Servicio;
import com.cfd.cfd.repository.DisponibilidadRepository;
import com.cfd.cfd.repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class DisponibilidadService {

    @Autowired
    private DisponibilidadRepository disponibilidadRepository;

    @Autowired
    private ServicioRepository servicioRepository;

    @Transactional
    public List<Disponibilidad> obtenerOGenerarDisponibilidades(LocalDate fecha, Integer servicioId) {

        // Devolver registros existentes si los hay
        List<Disponibilidad> existentes =
                disponibilidadRepository.findByFechaAndServicioId(fecha, servicioId);

        if (!existentes.isEmpty()) {
            return existentes;
        }

        // Si no hay registros para esa fecha/servicio, generarlos con estructura uniforme
        Servicio servicio = servicioRepository.findById(servicioId)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado con id: " + servicioId));

        // Creacion de horarios automatico con una ora de diferencia
        final int HORA_INICIO   = 9;
        final int HORA_FIN      = 20; 
        final int CUPOS_TOTALES = 1;    
        List<Disponibilidad> nuevos = new ArrayList<>();

        for (int hora = HORA_INICIO; hora < HORA_FIN; hora++) {
            Disponibilidad disp = new Disponibilidad();
            disp.setServicio(servicio);
            disp.setFecha(fecha);
            disp.setHoraInicio(LocalTime.of(hora, 0));
            disp.setHoraFin(LocalTime.of(hora + 1, 0));   
            disp.setCuposTotales(CUPOS_TOTALES);
            disp.setCuposOcupados(0);
            nuevos.add(disp);
        }

        return disponibilidadRepository.saveAll(nuevos);
    }
}