package com.cfd.cfd.repository;

import com.cfd.cfd.model.Disponibilidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DisponibilidadRepository extends JpaRepository<Disponibilidad, Integer> {
    
    // Buscar horarios de un servicio que AÚN tengan cupos disponibles
    @Query("SELECT d FROM Disponibilidad d WHERE d.servicioId = :servicioId AND d.cuposOcupados < d.cuposTotales")
    List<Disponibilidad> findDisponiblesByServicio(Integer servicioId);
}