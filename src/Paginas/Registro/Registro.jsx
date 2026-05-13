// src/Paginas/Registro/Registro.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrarUsuario } from "../Servicios/Api"; // Asegúrate de tener esta función en tu Api.js
import "./Registro.css";

export function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validarCorreo = (email) => {
    // Solo permite @gmail.com o @cfdservicios.cl para el registro
    const regex = /^[a-zA-Z0-9._%+-]+@(cfdservicios\.cl|gmail\.com)$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nombre.trim() || !correo.trim() || !clave.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!validarCorreo(correo)) {
      setError("Solo se permiten correos @gmail.com o corporativos.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      // Llamada a la API de Gabriel
      await registrarUsuario({ 
        username: nombre, 
        email: correo, 
        password: clave,
        role: "cliente" // Por defecto siempre se registran como clientes
      });

      alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
      navigate("/login");
      
    } catch (error) {
      setError("Hubo un error al crear la cuenta. El correo podría ya estar registrado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page-container"> {/* Reutilizamos el container del login para que se vean iguales */}
      <div className="login-card shadow-lg">
        <div className="login-header text-center mb-4">
          <h2 className="fw-bold">Crear Cuenta</h2>
          <p className="text-muted small">Únete a la plataforma de CFD Servicios</p>
        </div>

        {error && <div className="alert alert-danger py-2 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form-content">
          <div className="mb-3">
            <label className="form-label">Nombre de Usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="ejemplo@gmail.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Crea una contraseña segura"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-login-cfd w-100" disabled={loading}>
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>

          <div className="login-footer-links text-center mt-4">
            <Link to="/login" className="d-block mb-2 text-decoration-none">
              ¿Ya tienes cuenta? Inicia sesión aquí
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}