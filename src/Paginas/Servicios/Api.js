// src/Paginas/Servicios/Api.js
import axios from "axios";

// Ajustado a la ruta base real del backend de Gabriel (/api/v1)
const API_URL = "http://localhost:8080/api/v1"; 

// Creamos una instancia centralizada de Axios para configurar cabeceras fácilmente
export const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de peticiones: Inyecta el Token de seguridad (la "pulsera VIP") 
// automáticamente en los headers de cada petición si el usuario está logueado
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Obtiene la lista de servicios desde el backend
 */
export const getServicios = async () => {
  return await API.get("/servicios");
};

/**
 * Procesa el inicio de sesión del usuario
 * @param {string} correo - Correo corporativo o gmail
 * @param {string} password - Contraseña del usuario
 */
export const loginUsuario = async (correo, password) => {
  return await API.post("/auth/login", { 
    correo: correo, 
    password: password 
  });
};

/**
 * REGISTRO FORMAL (Usado por la pantalla "Crear Cuenta")
 * Apunta al AuthController original de Gabriel para registrar usuarios que iniciarán sesión.
 * @param {Object} datosUsuario - Objeto con nombre, correo, telefono, direccion, passwordHash, etc.
 */
export const registrarUsuario = async (datosUsuario) => {
  // ◄--- RESTAURADO: Vuelve a apuntar al flujo abierto de autenticación de Gabriel
  return await API.post("/auth/registro", datosUsuario);
};

/**
 * REGISTRO MANUAL / INVITADO (Opcional)
 * Apunta al UsuarioController independiente para registrar directo a la base de datos sin generar tokens.
 */
export const registrarUsuarioManual = async (datosUsuario) => {
  return await API.post("/usuarios/registro-manual", datosUsuario);
};

/**
 * Crea una nueva solicitud de agendamiento (Envía el ReservaRequestDTO)
 * @param {Object} reservaDTO - Objeto unificado conteniendo { usuarioId, disponibilidadId }
 */
export const crearReserva = async (reservaDTO) => {
  // Ahora recibe el DTO completo y estructurado directamente desde la Agenda
  return await API.post("/reservas", reservaDTO);
};

/**
 * Inserta un bloque de disponibilidad dinámico directamente en MySQL
 * @param {Object} datosDisponibilidad - { servicioId, fecha, horaInicio, horaFin, cuposTotales, cuposOcupados }
 */
export const crearDisponibilidad = async (datosDisponibilidad) => {
  return await API.post("/disponibilidad", datosDisponibilidad);
};

/**
 * Recupera la lista completa de reservas reales desde la base de datos
 * Ideal para listar las citas en la sección de gestión del Dashboard Administrativo
 */
export const getReservas = async () => {
  return await API.get("/reservas");
};

export default API;