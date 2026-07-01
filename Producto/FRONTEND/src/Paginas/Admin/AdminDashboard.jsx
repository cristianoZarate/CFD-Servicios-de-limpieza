import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { getReservas, cancelarReservaApi } from "../Servicios/Api";
import { AdminCalendario } from "./AdminCalendario"; 
import { AdminClientes } from "./AdminClientes"; 
import logo from "../../assets/logo.png"; 
import "./AdminDashboard.css";
 
export function AdminDashboard() {
  const navigate = useNavigate();
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seccionActiva, setSeccionActiva] = useState("dashboard"); 
  const [filaExpandida, setFilaExpandida] = useState(null);
 
  const cargarDatosReales = async () => {
    try {
      setLoading(true);
      const respuesta = await getReservas();
      
      if (respuesta.data && respuesta.data.length > 0) {
        const citasFormateadas = respuesta.data.map((res) => {
          const nombreCompleto = res.usuario 
            ? `${res.usuario.nombre || ''} ${res.usuario.apellido || ''}`.trim() 
            : `Cliente #${res.usuarioId || 'Asignado'}`;
 
          return {
            id: res.id,
            cliente: nombreCompleto || "Usuario CFD",
            servicio: res.servicio?.nombre || res.disponibilidad?.servicio?.nombre || "Servicio Contratado",
            fecha: res.disponibilidad?.fecha || "Ver en BD",
            hora: res.disponibilidad?.horaInicio ? res.disponibilidad.horaInicio.substring(0, 5) : "00:00",
            estado: res.estado || "Confirmado",
            telefono: res.usuario?.telefono || "No registrado",
            direccion: res.usuario?.direccion || "Dirección no provista"
          };
        });
        setCitas(citasFormateadas);
      } else {
        setCitas([]);
      }
    } catch (error) {
      console.error("Error al conectar con /reservas:", error);
      setCitas([]); 
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    cargarDatosReales();
  }, []);

  const handleCancelarCita = async (reservaId) => {
    const confirmar = window.confirm(
      "¿Está seguro de que desea cancelar este agendamiento?"
    );
 
    if (!confirmar) return;
 
    try {
      await cancelarReservaApi(reservaId);
      
      alert("Agendamiento cancelado con éxito. Cupo liberado.");
      
      setCitas((prev) => prev.filter((cita) => cita.id !== reservaId));
      
      if (filaExpandida === reservaId) {
        setFilaExpandida(null);
      }
    } catch (error) {
      console.error("Error al intentar cancelar la reserva desde el panel:", error);
      alert("No se pudo procesar la cancelación. Eror en la conexion a los datos.");
    }
  };
 
  const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event('usuarioLogueado'));
    navigate("/login");
  };
 
  const toggleFila = (id) => {
    setFilaExpandida(filaExpandida === id ? null : id);
  };
 
  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo CFD" height="60" className="img-fluid" />
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-link-admin ${seccionActiva === "dashboard" ? "active" : ""}`}
            onClick={() => setSeccionActiva("dashboard")}
          >
            <i className="bi bi-speedometer2"></i> Dashboard
          </button>
          <button 
            className={`nav-link-admin ${seccionActiva === "calendario" ? "active" : ""}`}
            onClick={() => setSeccionActiva("calendario")}
          >
            <i className="bi bi-calendar-event"></i> Calendario
          </button>
          <button 
            className={`nav-link-admin ${seccionActiva === "clientes" ? "active" : ""}`}
            onClick={() => setSeccionActiva("clientes")}
          >
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
 
      <main className="admin-main-content">
        <header className="admin-topbar shadow-sm">
          <div className="d-flex justify-content-between align-items-center px-4 h-100">
            <h5 className="m-0 fw-bold">
              {seccionActiva === "dashboard" 
                ? "Gestión de Agendamientos" 
                : seccionActiva === "calendario" 
                ? "Calendario de Operaciones" 
                : "Directorio Corporativo"}
            </h5>
            <div className="admin-user-info">
              <span className="badge bg-primary">Panel Administrador</span>
            </div>
          </div>
        </header>
 
        <div className="container-fluid p-4">
          {seccionActiva === "dashboard" ? (
            <>
              <div className="row mb-4">
                <div className="col-md-4">
                  <div className="card-kpi kpi-blue">
                    <div className="kpi-icon"><i className="bi bi-calendar-check"></i></div>
                    <div className="kpi-data">
                      <h6>Total Citas</h6>
                      <span className="fs-2 fw-bold">{citas.length}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card-kpi kpi-orange">
                    <div className="kpi-icon"><i className="bi bi-clock-history"></i></div>
                    <div className="kpi-data">
                      <h6>Pendientes</h6>
                      <span className="fs-2 fw-bold">
                        {citas.filter(c => c.estado?.toLowerCase() === 'pendiente').length}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card-kpi kpi-green">
                    <div className="kpi-icon"><i className="bi bi-check-circle"></i></div>
                    <div className="kpi-data">
                      <h6>Confirmadas / Fin</h6>
                      <span className="fs-2 fw-bold">
                        {citas.filter(c => c.estado?.toLowerCase() !== 'pendiente').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
 
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                  <h5 className="m-0 fw-bold text-cfd-blue">Próximos Agendamientos</h5>
                  <span className="text-muted small">Haz clic en una fila para ver los detalles de contacto</span>
                </div>
                <div className="card-body">
                  {loading ? (
                    <div className="text-center py-4">
                      <div className="spinner-border text-primary" role="status"></div>
                      <p className="mt-2 text-muted small">Consultando base de datos ...</p>
                    </div>
                  ) : citas.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                      <i className="bi bi-folder-x fs-2 d-block mb-2"></i>
                      <span>No se registran agendamientos en el sistema.</span>
                    </div>
                  ) : (
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
                          {citas.map((cita) => {
                            const isExpandida = filaExpandida === cita.id;
                            return (
                              <React.Fragment key={cita.id || Math.random()}>
                                <tr 
                                  onClick={() => toggleFila(cita.id)} 
                                  style={{ cursor: "pointer" }}
                                  className={isExpandida ? "table-active" : ""}
                                >
                                  <td className="fw-bold">
                                    <i className={`bi bi-chevron-${isExpandida ? 'down' : 'right'} me-2 text-primary small`}></i>
                                    {cita.cliente}
                                  </td>
                                  <td><span className="badge bg-info text-dark">{cita.servicio}</span></td>
                                  <td>{cita.fecha}</td>
                                  <td>{cita.hora}</td>
                                  <td>
                                    <span className={`status-pill ${cita.estado?.toLowerCase()}`}>
                                      {cita.estado}
                                    </span>
                                  </td>
                                  <td className="text-center" onClick={(e) => e.stopPropagation()}>
                                    <button className="btn btn-icon-edit me-2" title="Editar fila">
                                      <i className="bi bi-pencil"></i>
                                    </button>
                                    <button 
                                      className="btn btn-icon-delete" 
                                      title="Cancelar agendamiento (Liberar cupo)"
                                      onClick={() => handleCancelarCita(cita.id)}
                                    >
                                      <i className="bi bi-calendar-x-fill"></i>
                                    </button>
                                  </td>
                                </tr>
 
                                {isExpandida && (
                                  <tr className="table-light">
                                    <td colSpan="6" className="p-3 bg-light border-start border-primary border-4">
                                      <div className="row g-3 px-3">
                                        <div className="col-md-6">
                                          <span className="text-muted d-block small fw-bold">NÚMERO TELEFÓNICO</span>
                                          <span className="text-dark fw-bold">
                                            <i className="bi bi-telephone me-2 text-secondary"></i>{cita.telefono}
                                          </span>
                                        </div>
                                        <div className="col-md-6">
                                          <span className="text-muted d-block small fw-bold">DIRECCIÓN DE TRABAJO</span>
                                          <span className="text-dark fw-bold">
                                            <i className="bi bi-geo-alt me-2 text-secondary"></i>{cita.direccion}
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : seccionActiva === "calendario" ? (
            <AdminCalendario />
          ) : (
            <AdminClientes />
          )}
        </div>
      </main>
    </div>
  );
}