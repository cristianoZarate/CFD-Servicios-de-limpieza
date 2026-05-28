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
        // 1. Buscar si ya existen bloques horarios para esa fecha y servicio en MySQL
        List<Disponibilidad> existentes = disponibilidadRepository.findByFechaAndServicioId(fecha, servicioId);
        
        // 2. Si ya existen, los retornamos (mantiene cuántos cupos van ocupados)
        if (!existentes.isEmpty()) {
            return existentes;
        }

        // 3. Si no existen registros para ese día, buscamos el servicio e inyectamos los 12 bloques en caliente
        Servicio servicio = servicioRepository.findById(servicioId)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));

        int[] horasInicio = {9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20};
        List<Disponibilidad> nuevasDisponibilidades = new ArrayList<>();

        for (int hora : horasInicio) {
            Disponibilidad disp = new Disponibilidad();
            disp.setServicio(servicio);
            disp.setFecha(fecha);
            disp.setHoraInicio(LocalTime.of(hora, 0));
            disp.setHoraFin(LocalTime.of(hora + 2, 0)); // Bloques de 2 horas de duración
            disp.setCuposTotales(3); // 3 cupos máximos por hora
            disp.setCuposOcupados(0); // Inicia completamente libre
            
            nuevasDisponibilidades.add(disp);
        }

        // 4. Guardamos los 12 bloques nuevos en la base de datos y los devolvemos al Frontend
        return disponibilidadRepository.saveAll(nuevasDisponibilidades);
    }
}