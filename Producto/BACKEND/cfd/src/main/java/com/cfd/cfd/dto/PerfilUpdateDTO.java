package com.cfd.cfd.dto;

import lombok.Data;

/**
 * DTO usado exclusivamente por PUT /usuarios/{id}.
 *
 * Solo expone los campos que un cliente puede editar de su propio perfil.
**/
@Data
public class PerfilUpdateDTO {
    private String nombre;
    private String apellido;
    private String telefono;
    private String direccion;
}
