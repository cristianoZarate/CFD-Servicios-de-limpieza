// src/Paginas/Registro/Registro.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrarUsuario } from "../Servicios/Api"; 
import "./Registro.css";

export function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState(""); 
  const [direccion, setDireccion] = useState(""); 
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validarCorreo = (email) => {
    const emailLimpio = email.trim().toLowerCase();

    if (!emailLimpio) {
      return "El correo es obligatorio.";
    }

    // Correo válido
    const formaValida = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formaValida.test(emailLimpio)) {
      return "El correo ingresado no tiene un formato válido.";
    }

    // Restriccion correos -> Solo gmail o cfd
    const dominioPermitido = /^[a-z0-9._%+-]+@(cfdservicios\.cl|gmail\.com)$/;
    if (!dominioPermitido.test(emailLimpio)) {
      return "Solo se permiten correos @gmail.com o corporativos @cfdservicios.cl.";
    }

    return null; 
  };

  const validarClave = (password) => {
    const faltantes = [];

    if (password.length < 10) faltantes.push("al menos 10 caracteres");
    if (!/[A-Z]/.test(password)) faltantes.push("una letra mayúscula");
    if (!/[0-9]/.test(password)) faltantes.push("un número");
    if (!/[^A-Za-z0-9]/.test(password)) faltantes.push("un carácter especial (ej: ! @ # $ %)");

    if (faltantes.length > 0) {
      return `La contraseña debe tener ${faltantes.join(", ")}.`;
    }

    return null; // 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !apellido.trim() || !telefono.trim() || !direccion.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const errorCorreo = validarCorreo(correo);
    if (errorCorreo) {
      setError(errorCorreo);
      return;
    }

    const errorClave = validarClave(clave);
    if (errorClave) {
      setError(errorClave);
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      // Enviamos el objeto con todos los datos integrados esperados por Spring Boot
      await registrarUsuario({ 
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        correo: correo.trim().toLowerCase(), 
        telefono: telefono.trim(), 
        direccion: direccion.trim(), 
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
          {/* Nombre y Apellido en la misma fila */}
          <div className="row g-2 mb-3">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej: Juan"
                value={nombre}
                onChange={(e) => { setNombre(e.target.value); setError(""); }}
                disabled={loading}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej: Pérez"
                value={apellido}
                onChange={(e) => { setApellido(e.target.value); setError(""); }}
                disabled={loading}
              />
            </div>
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

          {/*  Número de Teléfono */}
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

          {/* Dirección del Servicio */}
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
            <span className="form-text-hint d-block mt-1" style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
              Mínimo 10 caracteres, con una mayúscula, un número y un carácter especial.
            </span>
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