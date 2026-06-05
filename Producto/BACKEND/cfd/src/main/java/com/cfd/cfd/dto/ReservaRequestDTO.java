package com.cfd.cfd.dto;

import lombok.Data;

@Data
public class ReservaRequestDTO {

    /** ID del cliente que está agendando (referencia a usuarios.id) */
    private Integer usuarioId;

    /** ID del bloque horario seleccionado (referencia a disponibilidad.id) */
    private Integer disponibilidadId;

    /** ID de la categoría de servicio (referencia a categorias_servicio.id) */
    private Long servicioId;
}