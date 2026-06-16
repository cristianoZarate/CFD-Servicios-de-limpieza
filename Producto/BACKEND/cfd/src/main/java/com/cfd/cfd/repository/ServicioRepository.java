package com.cfd.cfd.repository;

import com.cfd.cfd.model.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Integer> {

    @Query("SELECT s FROM Servicio s WHERE s.activo = true OR s.activo IS NULL")
    List<Servicio> findByActivoTrue();

}