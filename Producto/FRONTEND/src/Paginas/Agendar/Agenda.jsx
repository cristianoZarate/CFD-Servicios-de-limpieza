import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { crearReserva, loginUsuario, API } from '../Servicios/Api'; 
import 'react-calendar/dist/Calendar.css';
import './Agenda.css';
 
export function Agenda() {
  const [fecha, setFecha] = useState(new Date());
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [servicioSeleccionado, setServicioSeleccionado] = useState("1"); 
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [reservaId, setReservaId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  const [paso, setPaso] = useState(1); 
  const [opcionIngreso, setOpcionIngreso] = useState(""); 
 
  const [correoLogin, setCorreoLogin] = useState("");
  const [claveLogin, setClaveLogin] = useState("");
 
  const [bloquesHorariosDinamicos, setBloquesHorariosDinamicos] = useState([]);
  const [disponibilidadIdReal, setDisponibilidadIdReal] = useState(null);
 
  const serviciosDisponibles = [
    { id: "1", nombre: "Aseo Residencial Regular", icono: "bi-house-heart" },
    { id: "2", nombre: "Limpieza de Vidrios en Altura", icono: "bi-building" },
    { id: "3", nombre: "Sanitización / Aseo Industrial", icono: "bi-shield-shaded" }
  ];
 
  useEffect(() => {
    const cargarHorariosReales = async () => {
      try {
        const ano = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        const fechaFormateada = `${ano}-${mes}-${dia}`;
 
        const respuesta = await API.get(`/disponibilidad/consultar?fecha=${fechaFormateada}&servicioId=${servicioSeleccionado}`);
        
        setBloquesHorariosDinamicos(respuesta.data);
        setError(""); // limpiar error previo al cargar exitosamente
      } catch (err) {
        console.error("Error cargando disponibilidad:", err);
        setError("No se pudieron cargar los horarios del día. Revisa la conexión con el servidor.");
      }
    };
 
    cargarHorariosReales();
  }, [fecha, servicioSeleccionado]);
 
  const handleContinuarPaso2 = () => {
    if (!horaSeleccionada) {
      alert("Por favor, selecciona una hora antes de continuar.");
      return;
    }
    const sesionGuardada = localStorage.getItem("usuarioLogueado");
    if (sesionGuardada) {
      setOpcionIngreso("logged");
    }
    setPaso(2);
  };
 
  const handleProcesarAgendamientoFinal = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
 
    try {
      let usuarioIdFinal = null;
 
      if (opcionIngreso === "login") {
        if (!correoLogin.trim() || !claveLogin.trim()) {
          setError("Por favor ingresa tus credenciales.");
          setLoading(false);
          return;
        }
        try {
          const resLogin = await loginUsuario(correoLogin.trim(), claveLogin);
          localStorage.setItem("token", resLogin.data.token);
          localStorage.setItem("usuarioLogueado", JSON.stringify(resLogin.data.usuario));
          window.dispatchEvent(new Event('usuarioLogueado'));
          
          usuarioIdFinal = resLogin.data.usuario?.id || resLogin.data.usuario?.usuarioId;
          setOpcionIngreso("logged");
        } catch (errLog) {
          setError("Credenciales inválidas. Inténtalo de nuevo o crea una cuenta.");
          setLoading(false);
          return;
        }
      } else {
        const sesion = JSON.parse(localStorage.getItem("usuarioLogueado"));
        usuarioIdFinal = sesion?.id || sesion?.usuarioId;
        
        if (!usuarioIdFinal) {
          setError("Tu sesión ha expirado. Por favor ingresa tus datos nuevamente.");
          setOpcionIngreso("");
          setLoading(false);
          return;
        }
      }
 
      const respuesta = await crearReserva({
        usuarioId: parseInt(usuarioIdFinal, 10),
        disponibilidadId: parseInt(disponibilidadIdReal, 10),
        servicioId: parseInt(servicioSeleccionado, 10)
      });
 
      const idReservaDB = respuesta.data.id || Math.floor(1000 + Math.random() * 9000);
      setReservaId(`CFD-${idReservaDB}`);
      setMostrarConfirmacion(true);
 
    } catch (err) {
      console.error("Error crítico procesando agendamiento:", err);
      setError(err.response?.data || "Ocurrió un error en el servidor al procesar tu agendamiento. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="agenda-bg">
      <div className="container py-5">
        
        {paso === 1 ? (
          <>
            <div className="row justify-content-center mb-5">
              <div className="col-lg-12">
                <div className="agenda-card p-4 text-center" style={{ minHeight: 'auto' }}>
                  <h5 className="fw-bold text-cfd-blue mb-4">
                    <i className="bi bi-stars me-2"></i> 1. Selecciona el servicio de limpieza
                  </h5>
                  <div className="grid-servicios">
                    {serviciosDisponibles.map((serv) => (
                      <button
                        key={serv.id}
                        type="button"
                        className={`btn-servicio-box ${servicioSeleccionado === serv.id ? 'active' : ''}`}
                        onClick={() => {
                          setServicioSeleccionado(serv.id);
                          setHoraSeleccionada(null);
                          setDisponibilidadIdReal(null);
                        }}
                      >
                        <i className={`bi ${serv.icono} d-block fs-3 mb-2`}></i>
                        <span>{serv.nombre}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
 
            <h5 className="text-muted mb-4 ps-2">2. Selecciona la fecha y hora</h5>
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="agenda-card">
                  <div className="card-header-simple">
                    <span>{fecha.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                  </div>
                  <Calendar 
                    onChange={(nuevaFecha) => {
                      setFecha(nuevaFecha);
                      setHoraSeleccionada(null);
                      setDisponibilidadIdReal(null);
                      setError("");
                    }} 
                    value={fecha} 
                    minDate={new Date()}
                    locale="es-ES"
                    prev2Label={null}
                    next2Label={null}
                  />
                </div>
              </div>
 
              <div className="col-lg-6">
                <div className="agenda-card">
                  <div className="card-header-simple border-bottom mb-3">
                    <span>Hora disponible para el {fecha.toLocaleDateString('es-ES')}</span>
                  </div>
                  
                  {error && <div className="alert alert-warning py-1 text-center small mb-2">{error}</div>}
                  
                  <div className="grid-horarios">
                    {bloquesHorariosDinamicos.map((bloque) => {
                      const estaAgotado = bloque.cuposOcupados >= bloque.cuposTotales;
                      return (
                        <button 
                          key={bloque.id}
                          type="button"
                          disabled={estaAgotado}
                          className={`btn-hora ${horaSeleccionada?.id === bloque.id ? 'active' : ''} ${estaAgotado ? 'disabled-agotado' : ''}`}
                          onClick={() => {
                            setHoraSeleccionada({
                              id: bloque.id,
                              hora: bloque.horaInicio.substring(0, 5)
                            });
                            setDisponibilidadIdReal(bloque.id);
                            setError("");
                          }}
                        >
                          {bloque.horaInicio.substring(0, 5)} {estaAgotado ? '(Agotado)' : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
 
            <div className="d-flex justify-content-center mt-5">
              <button type="button" className="btn-confirmar-modern" onClick={handleContinuarPaso2}>
                CONTINUAR <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9">
              <div className="agenda-card p-5">
                <button type="button" className="btn btn-sm btn-link text-decoration-none mb-4 p-0 text-secondary fw-bold" onClick={() => { setPaso(1); setOpcionIngreso(""); }}>
                  <i className="bi bi-arrow-left"></i> Volver a cambiar fecha/hora
                </button>
                
                <h4 className="fw-bold text-cfd-blue mb-2">Datos de Confirmación</h4>
                <p className="text-muted small mb-1">
                  Servicio solicitado: <span className="text-dark fw-bold">{serviciosDisponibles.find(s => s.id === servicioSeleccionado)?.nombre}</span>
                </p>
                <p className="text-muted small mb-4">
                  Día seleccionado: <span className="text-dark fw-bold">{fecha.toLocaleDateString('es-ES')}</span> a las <span className="text-dark fw-bold">{horaSeleccionada?.hora} Hrs</span>
                </p>
 
                {error && <div className="alert alert-danger py-2 text-center small mb-3">{error}</div>}
 
                {opcionIngreso === "" && (
                  <div className="text-center py-3">
                    <h6 className="fw-bold text-secondary mb-4">Para confirmar tu agendamiento, debes iniciar sesión</h6>
                    <div className="d-grid gap-3">
                      <button type="button" className="btn btn-primary py-3 fw-bold" onClick={() => setOpcionIngreso("login")}>
                        <i className="bi bi-box-arrow-in-right me-2"></i> Iniciar Sesión con mi Cuenta
                      </button>
                      <a href="/registro" className="btn btn-outline-secondary py-2 small fw-bold">
                        ¿No tienes cuenta? Regístrate aquí
                      </a>
                    </div>
                  </div>
                )}
 
                {opcionIngreso === "login" && (
                  <form onSubmit={handleProcesarAgendamientoFinal}>
                    <h6 className="fw-bold mb-3 text-secondary"><i className="bi bi-shield-lock"></i> Ingresa a tu cuenta CFD</h6>
                    <div className="mb-3">
                      <label className="form-label text-secondary small">Correo Electrónico</label>
                      <input type="email" className="form-control" value={correoLogin} onChange={(e) => setCorreoLogin(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-secondary small">Contraseña</label>
                      <input type="password" className="form-control" value={claveLogin} onChange={(e) => setClaveLogin(e.target.value)} required />
                    </div>
                    <div className="row g-2">
                      <div className="col-6">
                        <button type="button" className="btn btn-light py-3 w-100 fw-bold rounded-3" onClick={() => setOpcionIngreso("")}>Cambiar opción</button>
                      </div>
                      <div className="col-6">
                        <button type="submit" className="btn-confirmar-modern w-100 m-0 py-3" disabled={loading}>
                          {loading ? "PROCESANDO..." : "CONFIRMAR RESERVA"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
 
                {opcionIngreso === "logged" && (
                  <div className="text-center py-3">
                    <div className="alert alert-success py-2 mb-4 small">
                      <i className="bi bi-check-circle-fill me-1"></i> Sesión detectada con éxito.
                    </div>
                    <p className="small text-muted mb-4">El agendamiento se vinculará directamente a tu perfil de usuario.</p>
                    <button type="submit" onClick={handleProcesarAgendamientoFinal} className="btn-confirmar-modern w-100 py-3" disabled={loading}>
                      {loading ? "PROCESANDO RESERVA..." : "CONFIRMAR MI AGENDAMIENTO"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
 
      {mostrarConfirmacion && (
        <div className="modal-overlay">
          <div className="modal-confirmacion animate__animated animate__zoomIn">
            <div className="modal-icon-success"><i className="bi bi-check-circle-fill"></i></div>
            <h3 className="fw-bold text-cfd-blue">¡Agendado con éxito!</h3>
            <div className="reserva-box my-4">
              <span className="reserva-label">NÚMERO DE RESERVA</span>
              <h2 className="reserva-numero">{reservaId}</h2>
            </div>
            <button type="button" className="btn-login-cfd" onClick={() => { setMostrarConfirmacion(false); setHoraSeleccionada(null); setDisponibilidadIdReal(null); setPaso(1); setOpcionIngreso(""); }}>
              ENTENDIDO
            </button>
          </div>
        </div>
      )}
    </div>
  );
}