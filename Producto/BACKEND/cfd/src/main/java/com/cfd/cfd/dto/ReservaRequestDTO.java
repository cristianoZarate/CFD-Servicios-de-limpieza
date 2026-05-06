package com.cfd.cfd.dto;

import lombok.Data;

@Data
public class ReservaRequestDTO {
    // El ID del cliente que está comprando/agendando
    private Integer usuarioId; 
    
    // El ID del bloque horario que seleccionó en React
    private Integer disponibilidadId; 
}