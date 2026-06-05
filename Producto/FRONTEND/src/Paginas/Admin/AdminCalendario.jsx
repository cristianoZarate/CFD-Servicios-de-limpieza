// src/Paginas/Admin/AdminCalendario.jsx
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { getReservas } from "../Servicios/Api";
import "react-calendar/dist/Calendar.css";
import "./AdminCalendario.css";

export function AdminCalendario() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [todasLasCitas, setTodasLasCitas] = useState([]);
  const [citasDelDia, setCitasDelDia] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para expandir los datos de despacho de una tarjeta específica
  const [tarjetaExpandida, setTarjetaExpandida] = useState(null);

  //  Cargar únicamente las reservas reales desde MySQL al montar el componente
  useEffect(() => {
    const obtenerReservasAdmin = async () => {
      try {
        setLoading(true);
        const respuesta = await getReservas();
        
        if (respuesta.data && respuesta.data.length > 0) {
          const formateadas = respuesta.data.map((res) => ({
            id: res.id,
            cliente: res.usuario?.nombre || `Invitado #${res.usuario?.id || 'Asignado'}`,
            servicio: res.disponibilidad?.servicio?.nombre || "Aseo Residencial Regular",
            fecha: res.disponibilidad?.fecha || "",
            hora: res.disponibilidad?.horaInicio ? res.disponibilidad.horaInicio.substring(0, 5) : "00:00",
            estado: res.estado || "CONFIRMADA",
            telefono: res.usuario?.telefono || "No registrado",
            direccion: res.usuario?.direccion || "Dirección no provista"
          }));
          setTodasLasCitas(formateadas);
        } else {
          // Si el backend responde exitosamente pero la tabla está vacía, se deja en blanco
          setTodasLasCitas([]);
        }
      } catch (error) {
        console.error("Error al cargar reservas reales en calendario admin:", error);
        setTodasLasCitas([]); // En caso de error de conexión, se mantiene en blanco de forma segura
      } finally {
        setLoading(false);
      }
    };

    obtenerReservasAdmin();
  }, []);

  
  useEffect(() => {
    const ano = fechaSeleccionada.getFullYear();
    const mes = String(fechaSeleccionada.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaSeleccionada.getDate()).padStart(2, '0');
    const stringFechaSeleccionada = `${ano}-${mes}-${dia}`;

    const filtradas = todasLasCitas.filter(cita => cita.fecha === stringFechaSeleccionada);
    setCitasDelDia(filtradas);
    setTarjetaExpandida(null); // Resetear expansión al cambiar de día
  }, [fechaSeleccionada, todasLasCitas]);

  return (
    <div className="container-fluid p-0">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3">
          <h5 className="m-0 fw-bold text-cfd-blue">Calendario de Operaciones</h5>
          <p className="text-muted small m-0">Selecciona un día para revisar las asignaciones de trabajo e información de clientes</p>
        </div>
        
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2 text-muted small">Sincronizando cronograma...</p>
            </div>
          ) : (
            <div className="row g-4">
              {/* Contenedor del Calendario Visual */}
              <div className="col-xl-5 d-flex justify-content-center">
                <div className="admin-calendar-wrapper w-100">
                  <Calendar
                    onChange={setFechaSeleccionada}
                    value={fechaSeleccionada}
                    locale="es-ES"
                    prev2Label={null}
                    next2Label={null}
                  />
                </div>
              </div>

              {/* Lista Lateral de Citas del Día */}
              <div className="col-xl-7">
                <h6 className="fw-bold mb-3 text-secondary">
                  Agendamientos para el: <span className="text-primary">{fechaSeleccionada.toLocaleDateString('es-ES')}</span>
                </h6>

                {citasDelDia.length === 0 ? (
                  <div className="alert alert-light text-center border py-4">
                    <i className="bi bi-calendar-x fs-3 text-muted d-block mb-2"></i>
                    <span className="text-muted small">No hay servicios agendados para este día.</span>
                  </div>
                ) : (
                  <div className="admin-citas-scroll">
                    {citasDelDia.map((cita) => (
                      <div 
                        key={cita.id} 
                        className="admin-cita-item-card shadow-sm mb-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => setTarjetaExpandida(tarjetaExpandida === cita.id ? null : cita.id)}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <span className="badge bg-dark text-white mb-2">Reserva #CFD-{cita.id}</span>
                            <h6 className="fw-bold m-0 text-cfd-blue">{cita.cliente}</h6>
                            <p className="m-0 text-muted small mt-1">
                              <i className="bi bi-tools me-1"></i> {cita.servicio}
                            </p>
                          </div>
                          <div className="text-end">
                            <span className="d-block fw-bold fs-5 text-primary mb-1">
                              <i className="bi bi-clock me-1"></i> {cita.hora}
                            </span>
                            <span className={`status-pill ${cita.estado.toLowerCase()}`}>
                              {cita.estado}
                            </span>
                          </div>
                        </div>

                        {/* Bloque extendido interno al pinchar la tarjeta del calendario */}
                        {tarjetaExpandida === cita.id && (
                          <div className="mt-3 pt-3 border-top border-light text-start animate__animated animate__fadeIn">
                            <div className="row g-2 bg-light p-2 rounded-3">
                              <div className="col-12 mb-1">
                                <span className="text-muted d-block small fw-bold" style={{ fontSize: '0.75rem' }}>TELÉFONO</span>
                                <span className="small text-dark fw-bold"><i className="bi bi-telephone me-2 text-secondary"></i>{cita.telefono}</span>
                              </div>
                              <div className="col-12">
                                <span className="text-muted d-block small fw-bold" style={{ fontSize: '0.75rem' }}>DIRECCIÓN DE TRABAJO</span>
                                <span className="small text-dark fw-bold"><i className="bi bi-geo-alt me-2 text-secondary"></i>{cita.direccion}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}