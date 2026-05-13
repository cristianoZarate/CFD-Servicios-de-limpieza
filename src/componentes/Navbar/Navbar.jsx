// src/componentes/Navbar/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import "./Navbar.css";

export function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarUsuario = () => {
      const storedUser = JSON.parse(localStorage.getItem("usuarioLogueado"));
      setUsuario(storedUser || null);
    };

    cargarUsuario();

    // Escucha el evento de login/logout
    window.addEventListener('usuarioLogueado', cargarUsuario);
    
    return () => {
      window.removeEventListener('usuarioLogueado', cargarUsuario);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("token");
    setUsuario(null);
    window.dispatchEvent(new Event('usuarioLogueado'));
    navigate("/");
  };

  // LÓGICA DE ADMIN ACTUALIZADA: 
  // Se activa por correo corporativo o por rol en la base de datos
  const esAdmin = usuario && (
    usuario.email?.toLowerCase().endsWith("@cfdservicios.cl") || 
    ["administrador", "admin"].includes(usuario.role?.toLowerCase())
  );

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-transparent">
      <div className="container">
        {/* Logo CFD */}
        <Link className="navbar-brand" to="/">
          <img 
            src={logo} 
            alt="Logo CFD" 
            height="60" 
            className="d-inline-block align-top" 
          />
        </Link>

        {/* Botón Toggler para móviles */}
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link nav-custom-link" to="/">INICIO</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-custom-link" to="/servicios">SERVICIOS</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link nav-custom-link" to="/nosotros">NOSOTROS</Link>
            </li>
            
            {/* OPCIÓN ADMIN: Solo aparece si el correo es @cfdservicios.cl */}
            {esAdmin && (
              <li className="nav-item">
                <Link className="nav-link fw-bold text-primary ms-lg-2" to="/admin">
                  <i className="bi bi-calendar-check-fill me-1"></i> GESTIÓN
                </Link>
              </li>
            )}

            {/* Perfil / Login */}
            {usuario ? (
              <li className="nav-item dropdown ms-lg-3">
                <button 
                  className="btn btn-profile dropdown-toggle d-flex align-items-center" 
                  type="button" 
                  data-bs-toggle="dropdown"
                >
                  <div className="avatar-mini me-2">
                    {usuario.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  {usuario.username}
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                  <li><h6 className="dropdown-header">Hola, {usuario.username}</h6></li>
                  {esAdmin && <li><Link className="dropdown-item fw-bold" to="/admin">Panel de Citas</Link></li>}
                  <li><Link className="dropdown-item" to="/perfil">Mi Perfil</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger fw-bold" onClick={handleLogout}>
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link fw-bold nav-custom-link ms-lg-3" to="/login">
                  INGRESAR
                </Link>
              </li>
            )}

            {/* CTA Agendar */}
            <li className="nav-item">
              <Link className="btn-agendar-glow ms-lg-3" to="/agenda">
                AGENDAR ONLINE
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}