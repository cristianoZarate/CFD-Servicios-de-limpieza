// src/Paginas/Registro/Registro.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrarUsuario } from "../Servicios/Api"; 
import "./Registro.css";

export function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState(""); // ◄--- NUEVO ESTADO
  const [direccion, setDireccion] = useState(""); // ◄--- NUEVO ESTADO
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validarCorreo = (email) => {
    const emailLimpio = email.trim().toLowerCase();
    const regex = /^[a-z0-9._%+-]+@(cfdservicios\.cl|gmail\.com)$/;
    return regex.test(emailLimpio);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Agregamos la verificación de los nuevos campos obligatorios
    if (!nombre.trim() || !correo.trim() || !telefono.trim() || !direccion.trim() || !clave.trim()) {
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
      
      // Enviamos el objeto con todos los datos integrados esperados por Spring Boot
      await registrarUsuario({ 
        nombre: nombre.trim(),
        correo: correo.trim().toLowerCase(), 
        telefono: telefono.trim(), // Mapeado al DTO del backend
        direccion: direccion.trim(), // Mapeado al DTO del backend
        passwordHash: clave 
      });

      alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
      navigate("/login");
      
    } catch (error) {
      console.error("Error en registro:", error);
      if (error.response && typeof error.response.data === "string") {
        setError(error.response.data);
      } else {
        setError("Hubo un error al crear la cuenta. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page-container">
      <div className="login-card shadow-lg">
        <div className="login-header text-center mb-4">
          <h2 className="fw-bold">Crear Cuenta</h2>
          <p className="text-muted small">Únete a la plataforma de CFD Servicios</p>
        </div>

        {error && <div className="alert alert-danger py-2 text-center" style={{ fontSize: '0.85rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="login-form-content">
          {/* Nombre Completo en lugar de Nombre de Usuario */}
          <div className="mb-3">
            <label className="form-label">Nombre Completo</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Juan Pérez"
              value={nombre}
              onChange={(e) => { setNombre(e.target.value); setError(""); }}
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
              onChange={(e) => { setCorreo(e.target.value); setError(""); }}
              disabled={loading}
            />
          </div>

          {/* Nuevo campo: Número de Teléfono */}
          <div className="mb-3">
            <label className="form-label">Número de Teléfono</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Ej: +56 9 1234 5678"
              value={telefono}
              onChange={(e) => { setTelefono(e.target.value); setError(""); }}
              disabled={loading}
            />
          </div>

          {/* Nuevo campo: Dirección del Servicio */}
          <div className="mb-3">
            <label className="form-label">Dirección del Servicio</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Av. Barros Luco 1230, San Antonio"
              value={direccion}
              onChange={(e) => { setDireccion(e.target.value); setError(""); }}
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
              onChange={(e) => { setClave(e.target.value); setError(""); }}
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-login-cfd w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Creando cuenta...
              </>
            ) : (
              "Registrarse"
            )}
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