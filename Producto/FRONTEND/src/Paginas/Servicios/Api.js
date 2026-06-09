// src/Paginas/Servicios/Api.js
import axios from "axios";

// En desarrollo (npm run dev) se carga .env.local → apunta a localhost:8080.
// En producción  (npm run build) se carga .env.production → apunta a Railway.
const API_URL = import.meta.env.VITE_API_URL;

export const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Inyecta el token JWT en cada petición automáticamente
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Cancela una reserva por ID y libera el cupo en disponibilidad 
export const cancelarReservaApi = (id) => API.delete(`/reservas/${id}/cancelar`);

// Lista de servicios activos del catálogo 
export const getServicios = async () => API.get("/servicios");

// Autenticación: devuelve JWT + objeto usuario 
export const loginUsuario = async (correo, password) =>
  API.post("/auth/login", { correo, password });

// Registro de nuevo usuario
export const registrarUsuario = async (datosUsuario) =>
  API.post("/auth/registro", datosUsuario);

// Registro manual desde la Agenda (endpoint /usuarios) 
export const registrarUsuarioManual = async (datosUsuario) =>
  API.post("/usuarios", datosUsuario);

// Lista de usuarios para el panel administrativo 
export const getUsuarios = async () => API.get("/usuarios");

// Crea una nueva reserva
export const crearReserva = async (reservaDTO) =>
  API.post("/reservas", reservaDTO);

// Inserta un bloque de disponibilidad manualmente 
export const crearDisponibilidad = async (datosDisponibilidad) =>
  API.post("/disponibilidad", datosDisponibilidad);

// Lista completa de reservas para el panel administrativo 
export const getReservas = async () => API.get("/reservas");

export default API;