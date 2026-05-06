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

    // Escucha el evento personalizado que lanzamos en el Login.jsx
    window.addEventListener('usuarioLogueado', cargarUsuario);
    
    return () => {
      window.removeEventListener('usuarioLogueado', cargarUsuario);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("token");
    setUsuario(null);
    // Notificamos a la app que el usuario salió
    window.dispatchEvent(new Event('usuarioLogueado'));
    navigate("/");
  };

  // Ajustamos la lógica de admin para que sea compatible con los roles de tu base de datos
  const esAdmin = usuario && ["administrador", "admin", "super_admin"].includes(usuario.role?.toLowerCase());

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-transparent">
      <div className="container">
        {/* Lado Izquierdo: Logo de CFD */}
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
        
        {/* Menú de Navegación */}
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
            
            {/* Acceso administrativo visible solo para personal autorizado */}
            {esAdmin && (
              <li className="nav-item">
                <Link className="nav-link fw-bold text-warning ms-lg-2" to="/admin">
                  <i className="bi bi-gear-fill me-1"></i> ADMIN
                </Link>
              </li>
            )}

            {/* Lógica de Autenticación Dinámica */}
            {usuario ? (
              <li className="nav-item dropdown ms-lg-3">
                <button 
                  className="btn btn-profile dropdown-toggle d-flex align-items-center" 
                  type="button" 
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="avatar-mini me-2">
                    {usuario.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  {usuario.username}
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                  <li><h6 className="dropdown-header">Mi Cuenta</h6></li>
                  <li><Link className="dropdown-item" to="/perfil">Ver Perfil</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger fw-bold" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
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

            {/* CTA: Agendar Online */}
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