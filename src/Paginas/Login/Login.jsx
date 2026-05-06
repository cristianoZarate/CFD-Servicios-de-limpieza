// src/Paginas/Login/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// Ajusta la ruta de importación según tu estructura (ej: ../../services/api o ../Servicios/Api)
import { loginUsuario } from "../Servicios/Api"; 
import "./Login.css";

export function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. ACTUALIZACIÓN DE DOMINIO: Ahora permite @cfdservicios.cl y mantiene gmail.com
  const validarCorreo = (correo) => {
    const regex = /^[a-zA-Z0-9._%+-]+@(cfdservicios\.cl|gmail\.com)$/;
    return regex.test(correo);
  };

  const validarFormulario = () => {
    if (!correo.trim()) {
      setError("El correo electrónico es obligatorio");
      return false;
    }
    if (!validarCorreo(correo)) {
      setError("Correo inválido. Solo se permiten @cfdservicios.cl o @gmail.com");
      return false;
    }
    if (!clave.trim()) {
      setError("La contraseña es obligatoria");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;

    try {
      setLoading(true);
      setError("");
      
      const response = await loginUsuario(correo, clave);
      const { token, usuario } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      
      // Notificar a otros componentes (como Navbar) que hubo un login
      window.dispatchEvent(new Event('usuarioLogueado'));
      
      alert(`Bienvenido al portal CFD, ${usuario.username || 'Usuario'}`);

      // Redirección por roles (Administrador corporativo o Cliente)
      const rol = usuario.role?.toLowerCase() || "cliente";
      if (["admin", "administrador"].includes(rol)) {
        navigate("/admin");
      } else {
        navigate("/");
      }
      
    } catch (error) {
      console.error("Error en login:", error);
      setError("Credenciales incorrectas o problema de conexión.");
      setClave("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page-container">
      <div className="login-card shadow-lg">
        <div className="login-header text-center mb-4">
          <h2 className="fw-bold">Acceso Clientes</h2>
          <p className="text-muted small">Plataforma Corporativa CFD</p>
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
              placeholder="usuario@cfdservicios.cl"
              value={correo}
              onChange={(e) => {
                setCorreo(e.target.value);
                setError("");
              }}
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
              onChange={(e) => {
                setClave(e.target.value);
                setError("");
              }}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn-login-cfd" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Verificando...
              </>
            ) : (
              "Ingresar al Portal"
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