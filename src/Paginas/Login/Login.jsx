// src/Paginas/Login/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUsuario } from "../Servicios/Api"; 
import "./Login.css";

export function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validarCorreo = (email) => {
    // Acepta correos de clientes (@gmail) y corporativos (@cfdservicios.cl)
    const regex = /^[a-zA-Z0-9._%+-]+@(cfdservicios\.cl|gmail\.com)$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!correo.trim() || !clave.trim()) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (!validarCorreo(correo)) {
      setError("Formato de correo no válido.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const response = await loginUsuario(correo, clave);
      const { token, usuario } = response.data;

      // Guardamos la sesión
      localStorage.setItem("token", token);
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      
      // Sincronizamos el estado de la app (Navbar, etc)
      window.dispatchEvent(new Event('usuarioLogueado'));
      
      // --- LÓGICA INVISIBLE DE REDIRECCIÓN ---
      // Verificamos por dominio o por rol asignado en la DB
      const correoNormalizado = correo.toLowerCase();
      const esAdmin = usuario.role?.toLowerCase() === "admin" || 
                      correoNormalizado.endsWith("@cfdservicios.cl");

      if (esAdmin) {
        // Acceso administrativo: Gestión de citas y dashboard
        navigate("/admin"); 
      } else {
        // Acceso cliente: Vuelve al inicio o a su perfil
        navigate("/"); 
      }
      
    } catch (error) {
      console.error("Error en login:", error);
      setError("Correo o contraseña incorrectos.");
      setClave("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page-container">
      <div className="login-card shadow-lg">
        <div className="login-header text-center mb-4">
          <h2 className="fw-bold">Iniciar Sesión</h2>
          <p className="text-muted small">Bienvenido a su portal CFD Servicios</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 text-center" style={{ fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form-content">
          <div className="mb-3">
            <label className="form-label" htmlFor="correo">Correo Electrónico</label>
            <input
              id="correo"
              type="email"
              className="form-control"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => { setCorreo(e.target.value); setError(""); }}
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="mb-4">
            <label className="form-label" htmlFor="clave">Contraseña</label>
            <input
              id="clave"
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={clave}
              onChange={(e) => { setClave(e.target.value); setError(""); }}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn-login-cfd w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Verificando...
              </>
            ) : (
              "Ingresar"
            )}
          </button>

          <div className="login-footer-links text-center mt-4">
            <Link to="/registro" className="d-block mb-2 text-decoration-none">
              ¿No tienes cuenta? Regístrate aquí
            </Link>
            <Link to="/" className="text-secondary small text-decoration-none">
              Volver al inicio
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}