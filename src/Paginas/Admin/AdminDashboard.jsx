// src/Paginas/Admin/AdminDashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"; // Importamos el logo oficial
import "./AdminDashboard.css";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [citas, setCitas] = useState([
    { id: 1, cliente: "Juan Pérez", servicio: "Aseo Industrial", fecha: "2026-05-15", hora: "09:00", estado: "Pendiente" },
    { id: 2, cliente: "María Soto", servicio: "Limpieza de Vidrios", fecha: "2026-05-15", hora: "11:00", estado: "Confirmado" },
    { id: 3, cliente: "Empresa XYZ", servicio: "Mantenimiento General", fecha: "2026-05-16", hora: "14:00", estado: "Finalizado" },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event('usuarioLogueado'));
    navigate("/login");
  };

  return (
    <div className="admin-wrapper">
      {/* Sidebar Lateral */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          {/* Logo en lugar de texto */}
          <img src={logo} alt="Logo CFD" height="60" className="img-fluid" />
        </div>
        <nav className="sidebar-nav">
          <button className="nav-link-admin active">
            <i className="bi bi-speedometer2"></i> Dashboard
          </button>
          <button className="nav-link-admin">
            <i className="bi bi-calendar-event"></i> Calendario
          </button>
          <button className="nav-link-admin">
            <i className="bi bi-people"></i> Clientes
          </button>
        </nav>
        <div className="sidebar-footer">
          <button onClick={() => navigate("/")} className="btn btn-outline-light btn-sm w-100 mb-2">
            <i className="bi bi-house-door"></i> Sitio Público
          </button>
          <button onClick={handleLogout} className="btn btn-danger btn-sm w-100">
            <i className="bi bi-box-arrow-left"></i> Salir
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="admin-main-content">
        <header className="admin-topbar shadow-sm">
          <div className="d-flex justify-content-between align-items-center px-4 h-100">
            <h5 className="m-0 fw-bold">Gestión de Agendamientos</h5>
            <div className="admin-user-info">
              <span className="badge bg-primary">Panel Administrador</span>
            </div>
          </div>
        </header>

        <div className="container-fluid p-4">
          {/* Fila de Tarjetas (KPIs) */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card-kpi kpi-blue">
                <div className="kpi-icon"><i className="bi bi-calendar-check"></i></div>
                <div className="kpi-data">
                  <h6>Citas Hoy</h6>
                  <span className="fs-2 fw-bold">8</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-kpi kpi-orange">
                <div className="kpi-icon"><i className="bi bi-clock-history"></i></div>
                <div className="kpi-data">
                  <h6>Pendientes</h6>
                  <span className="fs-2 fw-bold">3</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-kpi kpi-green">
                <div className="kpi-icon"><i className="bi bi-check-circle"></i></div>
                <div className="kpi-data">
                  <h6>Finalizadas</h6>
                  <span className="fs-2 fw-bold">12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de Citas */}
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="m-0 fw-bold text-cfd-blue">Próximos Agendamientos</h5>
              {/* Botón de Editar para la sección completa */}
              <button className="btn btn-sm btn-primary">
                <i className="bi bi-pencil-square me-1"></i> Editar Lista
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Cliente</th>
                      <th>Servicio</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Estado</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citas.map((cita) => (
                      <tr key={cita.id}>
                        <td className="fw-bold">{cita.cliente}</td>
                        <td><span className="badge bg-info text-dark">{cita.servicio}</span></td>
                        <td>{cita.fecha}</td>
                        <td>{cita.hora}</td>
                        <td>
                          <span className={`status-pill ${cita.estado.toLowerCase()}`}>
                            {cita.estado}
                          </span>
                        </td>
                        <td className="text-center">
                          <button className="btn btn-icon-edit me-2" title="Editar fila">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-icon-delete" title="Eliminar fila">
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}