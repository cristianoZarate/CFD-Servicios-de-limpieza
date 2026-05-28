// src/Paginas/Servicios/Api.js
import axios from "axios";

// Ruta base real del backend (/api/v1)
//const API_URL = "http://localhost:8080/api/v1"; 
const API_URL = "https://cfd-servicios-de-limpieza-production.up.railway.app/api/v1"; 

// Instancia centralizada de Axios para configurar cabeceras fácilmente
export const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de peticiones: Inyecta el Token de seguridad automáticamente
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


// Llamada para cancelar/eliminar la reserva por ID usando la instancia segura API
export const cancelarReservaApi = (id) => API.delete(`/reservas/${id}/cancelar`); 


/**
 * Obtiene la lista de servicios activos desde el backend (Catálogo público)
 */
export const getServicios = async () => {
  return await API.get("/servicios");
};

/**
 * Procesa el inicio de sesión del usuario
 * @param {string} correo - Correo ingresado
 * @param {string} password - Contraseña ingresada
 */
export const loginUsuario = async (correo, password) => {
  return await API.post("/auth/login", { 
    correo: correo, 
    password: password 
  });
};

/**
 * REGISTRO FORMAL (Usado por la pantalla "Crear Cuenta")
 * @param {Object} datosUsuario - Objeto unificado del cliente
 */
export const registrarUsuario = async (datosUsuario) => {
  return await API.post("/auth/registro", datosUsuario);
};

/**
 * REGISTRO MANUAL / INVITADO (Estandarizado)
 * Apunta al endpoint raíz POST de usuarios de forma limpia
 * @param {Object} datosUsuario - Objeto con los datos del formulario de la Agenda
 */
export const registrarUsuarioManual = async (datosUsuario) => {
  return await API.post("/usuarios", datosUsuario);
};

/**
 * DIRECTORIO DE CLIENTES
 * Recupera la lista completa de usuarios registrados para el panel de administración
 */
export const getUsuarios = async () => {
  return await API.get("/usuarios");
};

/**
 * Crea una nueva solicitud de agendamiento (Envía el ReservaRequestDTO)
 * @param {Object} reservaDTO - Objeto conteniendo { usuarioId, disponibilidadId, servicioId }
 */
export const crearReserva = async (reservaDTO) => {
  return await API.post("/reservas", reservaDTO);
};

/**
 * Inserta un bloque de disponibilidad dinámico directamente en MySQL
 */
export const crearDisponibilidad = async (datosDisponibilidad) => {
  return await API.post("/disponibilidad", datosDisponibilidad);
};

/**
 * Recupera la lista completa de reservas reales desde la base de datos (Dashboard Admin)
 */
export const getReservas = async () => {
  return await API.get("/reservas");
};

export default API;