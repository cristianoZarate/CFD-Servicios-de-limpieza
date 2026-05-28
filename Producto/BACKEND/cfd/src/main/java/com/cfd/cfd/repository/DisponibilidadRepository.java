package com.cfd.cfd.repository;

import com.cfd.cfd.model.Disponibilidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DisponibilidadRepository extends JpaRepository<Disponibilidad, Integer> {
    
    // 1. Buscar horarios de un servicio que aún tengan cupos disponibles
    @Query("SELECT d FROM Disponibilidad d WHERE d.servicio.id = :servicioId AND d.cuposOcupados < d.cuposTotales")
    List<Disponibilidad> findDisponiblesByServicio(@Param("servicioId") Integer servicioId);

    // 2. Buscar disponibilidad específica por fecha y servicio (para validar reservas)
    List<Disponibilidad> findByFechaAndServicioId(LocalDate fecha, Integer servicioId);
}