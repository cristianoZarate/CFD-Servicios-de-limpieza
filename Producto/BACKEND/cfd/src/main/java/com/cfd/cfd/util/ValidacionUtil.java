package com.cfd.cfd.util;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class ValidacionUtil {

    private static final Pattern FORMATO_CORREO =
            Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

    private static final Pattern DOMINIO_PERMITIDO =
            Pattern.compile("^[a-z0-9._%+-]+@(cfdservicios\\.cl|gmail\\.com)$");

    private static final Pattern TIENE_MAYUSCULA = Pattern.compile("[A-Z]");
    private static final Pattern TIENE_NUMERO = Pattern.compile("[0-9]");
    private static final Pattern TIENE_CARACTER_ESPECIAL = Pattern.compile("[^A-Za-z0-9]");

    private ValidacionUtil() {
    }

    /** Devuelve el mensaje de error específico, o null si el correo es válido. */
    public static String validarCorreo(String correo) {
        if (correo == null || correo.isBlank()) {
            return "El correo es obligatorio.";
        }

        String limpio = correo.trim().toLowerCase();

        if (!FORMATO_CORREO.matcher(limpio).matches()) {
            return "El correo ingresado no tiene un formato válido.";
        }

        if (!DOMINIO_PERMITIDO.matcher(limpio).matches()) {
            return "Solo se permiten correos @gmail.com o corporativos @cfdservicios.cl.";
        }

        return null;
    }

    /** Devuelve el mensaje de error indicando qué falta, o null si la contraseña es válida. */
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