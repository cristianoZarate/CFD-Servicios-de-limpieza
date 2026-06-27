package com.cfd.cfd.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

public class ValidacionUtil {

    private static final Pattern FORMATO_CORREO =
            Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

    private static final Pattern DOMINIO_PUBLICO =
            Pattern.compile("^[a-z0-9._%+-]+@(gmail\\.com|hotmail\\.com|outlook\\.com)$");

    private static final Pattern DOMINIO_CORPORATIVO =
            Pattern.compile("^[a-z0-9._%+-]+@cfdservicios\\.cl$");

    // Solo estos correos pueden registrarse como administradores
    private static final Set<String> CORREOS_CORPORATIVOS_PERMITIDOS = Set.of(
        "fzarate@cfdservicios.cl",
        "gavendano@cfdservicios.cl"
    );

    private static final Pattern TIENE_MAYUSCULA = Pattern.compile("[A-Z]");
    private static final Pattern TIENE_NUMERO = Pattern.compile("[0-9]");
    private static final Pattern TIENE_CARACTER_ESPECIAL = Pattern.compile("[^A-Za-z0-9]");

    private ValidacionUtil() {}

    public static String validarCorreo(String correo) {
        if (correo == null || correo.isBlank()) {
            return "El correo es obligatorio.";
        }

        String limpio = correo.trim().toLowerCase();

        if (!FORMATO_CORREO.matcher(limpio).matches()) {
            return "El correo ingresado no tiene un formato válido.";
        }

        if (DOMINIO_CORPORATIVO.matcher(limpio).matches()) {
            if (!CORREOS_CORPORATIVOS_PERMITIDOS.contains(limpio)) {
                return "Este correo corporativo no está autorizado para registrarse.";
            }
            return null;
        }

        if (!DOMINIO_PUBLICO.matcher(limpio).matches()) {
            return "Solo se permiten correos @gmail.com, @hotmail.com o @outlook.com.";
        }

        return null;
    }

    public static String validarClave(String clave) {
        if (clave == null || clave.isEmpty()) {
            return "La contraseña es obligatoria.";
        }

        List<String> faltantes = new ArrayList<>();
        if (clave.length() < 10) faltantes.add("al menos 10 caracteres");
        if (!TIENE_MAYUSCULA.matcher(clave).find()) faltantes.add("una letra mayúscula");
        if (!TIENE_NUMERO.matcher(clave).find()) faltantes.add("un número");
        if (!TIENE_CARACTER_ESPECIAL.matcher(clave).find()) faltantes.add("un carácter especial (ej: ! @ # $ %)");

        if (!faltantes.isEmpty()) {
            return "La contraseña debe tener " + String.join(", ", faltantes) + ".";
        }

        return null;
    }
}