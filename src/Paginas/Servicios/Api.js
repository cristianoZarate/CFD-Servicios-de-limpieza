// src/Paginas/Servicios/Api.js
import axios from "axios";


const API_URL = "http://localhost:8080/api"; 

/**
 * Obtiene la lista de servicios desde el backend
 */
export const getServicios = async () => {
  return await axios.get(`${API_URL}/servicios`);
};

/**
 * Procesa el inicio de sesión del usuario
 * @param {string} email - Correo corporativo o gmail
 * @param {string} password - Contraseña del usuario
 */
export const loginUsuario = async (email, password) => {
  // Enviamos los datos al endpoint de autenticación
  return await axios.post(`${API_URL}/auth/login`, { 
    email: email, 
    password: password 
  });
};

/**
 * (para desarrollar ) Función para registro si decides implementarlo después
 */
export const registrarUsuario = async (datosUsuario) => {
  return await axios.post(`${API_URL}/auth/register`, datosUsuario);
};