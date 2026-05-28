package com.cfd.cfd.repository;

import com.cfd.cfd.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
    // Para que el cliente vea su historial
    List<Reserva> findByUsuarioId(Integer usuarioId);
}