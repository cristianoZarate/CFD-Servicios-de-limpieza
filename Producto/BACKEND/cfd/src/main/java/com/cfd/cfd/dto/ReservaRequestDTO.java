package com.cfd.cfd.dto;

import lombok.Data;

@Data
public class ReservaRequestDTO {
    // El ID del cliente que está comprando/agendando
    private Integer usuarioId; 
    
    // El ID del bloque horario que seleccionó en React
    private Integer disponibilidadId; 

    private Long servicioId;

    public Long getServicioId() { return servicioId; }
    public void setServicioId(Long servicioId) { this.servicioId = servicioId; }
}