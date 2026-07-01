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
  // Estado para controlar la visibilidad de la contraseña
  const [verClave, setVerClave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validarCorreo = (email) => {
    const emailLimpio = email.trim().toLowerCase();
    if (!emailLimpio) return "El correo es obligatorio.";
    const formaValida = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formaValida.test(emailLimpio)) return "El correo ingresado no tiene un formato válido.";

    const CORREOS_CORPORATIVOS = ["fzarate@cfdservicios.cl", "gavendano@cfdservicios.cl"];
    if (emailLimpio.endsWith("@cfdservicios.cl")) {
      if (!CORREOS_CORPORATIVOS.includes(emailLimpio)) return "Este correo corporativo no está autorizado para registrarse.";
      return null;
    }

    const dominioPublico = /^[a-z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
    if (!dominioPublico.test(emailLimpio)) return "Solo se permiten correos @gmail.com, @hotmail.com o @outlook.com.";
    return null;
  };

  const validarClave = (password) => {
    const faltantes = [];
    if (password.length < 10) faltantes.push("al menos 10 caracteres");
    if (!/[A-Z]/.test(password)) faltantes.push("una letra mayúscula");
    if (!/[0-9]/.test(password)) faltantes.push("un número");
    if (!/[^A-Za-z0-9]/.test(password)) faltantes.push("un carácter especial (ej: ! @ # $ %)");
    if (faltantes.length > 0) return `La contraseña debe tener ${faltantes.join(", ")}.`;
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim() || !telefono.trim() || !direccion.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    const errorCorreo = validarCorreo(correo);
    if (errorCorreo) { setError(errorCorreo); return; }
    const errorClave = validarClave(clave);
    if (errorClave) { setError(errorClave); return; }

    try {
      setLoading(true);
      setError("");
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
      setError(error.response?.data || "Hubo un error al crear la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page-container">
      <div className="login-card shadow-lg">
        <div className="login-header text-center mb-4">
          <h2 className="fw-bold">Crear Cuenta</h2>
        </div>

        {error && <div className="alert alert-danger py-2 text-center" style={{ fontSize: '0.85rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="login-form-content">
          
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" value={nombre} onChange={(e) => {setNombre(e.target.value); setError("");}} disabled={loading} />
          </div>

          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input type="text" className="form-control" value={apellido} onChange={(e) => {setApellido(e.target.value); setError("");}} disabled={loading} />
          </div>

          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input type="tel" className="form-control" value={telefono} onChange={(e) => {setTelefono(e.target.value); setError("");}} disabled={loading} />
          </div>

          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input type="text" className="form-control" value={direccion} onChange={(e) => {setDireccion(e.target.value); setError("");}} disabled={loading} />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input type="email" className="form-control" value={correo} onChange={(e) => {setCorreo(e.target.value); setError("");}} disabled={loading} />
          </div>

          {/* Campo de Contraseña con el botón de visibilidad */}
          <div className="mb-4">
            <label className="form-label">Contraseña</label>
            <div className="input-group">
              <input
                type={verClave ? "text" : "password"}
                className="form-control"
                placeholder="Crea una contraseña segura"
                value={clave}
                onChange={(e) => { setClave(e.target.value); setError(""); }}
                disabled={loading}
                autoComplete="new-password" 
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setVerClave(!verClave)}
                aria-label={verClave ? "Ocultar contraseña" : "Mostrar contraseña"}
              ><i className={verClave ? "bi bi-eye-slash" : "bi bi-eye"} aria-hidden="true"></i>
              </button>
            </div>
            <span className="form-text-hint d-block mt-1" style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
              Mínimo 10 caracteres, con una mayúscula, un número y un carácter especial.
            </span>
          </div>

          <button type="submit" className="btn-login-cfd w-100" disabled={loading}>
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>
      </div>
    </main>
  );
}