package com.cfd.cfd.repository;

import com.cfd.cfd.model.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Integer> {
    // Para que React solo muestre los servicios que están activos
    List<Servicio> findByActivoTrue();
}