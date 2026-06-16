// src/Paginas/Perfil/Perfil.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarioPorId, actualizarPerfil, getReservasPorUsuario } from "../Servicios/Api";
import "./Perfil.css";

export function Perfil() {
  const navigate = useNavigate();

  const [usuarioId, setUsuarioId] = useState(null);
  const [pestañaActiva, setPestañaActiva] = useState("datos"); // "datos" | "agendamientos"

  // --- Datos del perfil ---
  const [datos, setDatos] = useState({ nombre: "", apellido: "", correo: "", telefono: "", direccion: "" });
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [errorDatos, setErrorDatos] = useState("");
  const [exitoDatos, setExitoDatos] = useState("");

  // --- Historial de agendamientos ---
  const [agendamientos, setAgendamientos] = useState([]);
  const [cargandoAgendamientos, setCargandoAgendamientos] = useState(true);
  const [errorAgendamientos, setErrorAgendamientos] = useState("");

  // 1. Verificar sesión activa y obtener el ID del usuario logueado
  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("usuarioLogueado");
      if (!rawUser || rawUser === "undefined" || rawUser === "null") {
        navigate("/login");
        return;
      }
      const sesion = JSON.parse(rawUser);
      const id = sesion?.id || sesion?.usuarioId;
      if (!id) {
        navigate("/login");
        return;
      }
      setUsuarioId(id);
    } catch (e) {
      console.error("Error al leer la sesión:", e);
      navigate("/login");
    }
  }, [navigate]);

  // 2. Cargar los datos reales del perfil una vez que tenemos el ID
  useEffect(() => {
    if (!usuarioId) return;

    const cargarPerfil = async () => {
      try {
        setCargandoDatos(true);
        const respuesta = await getUsuarioPorId(usuarioId);
        const u = respuesta.data;
        setDatos({
          nombre: u.nombre || "",
          apellido: u.apellido || "",
          correo: u.correo || "",
          telefono: u.telefono || "",
          direccion: u.direccion || "",
        });
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
        setErrorDatos("No se pudieron cargar tus datos. Inténtalo nuevamente.");
      } finally {
        setCargandoDatos(false);
      }
    };

    cargarPerfil();
  }, [usuarioId]);

  // 3. Cargar el historial de agendamientos
  useEffect(() => {
    if (!usuarioId) return;

    const cargarAgendamientos = async () => {
      try {
        setCargandoAgendamientos(true);
        const respuesta = await getReservasPorUsuario(usuarioId);
        setAgendamientos(respuesta.data || []);
      } catch (error) {
        console.error("Error al cargar agendamientos:", error);
        setErrorAgendamientos("No se pudo cargar tu historial de agendamientos.");
      } finally {
        setCargandoAgendamientos(false);
      }
    };

    cargarAgendamientos();
  }, [usuarioId]);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    setErrorDatos("");
    setExitoDatos("");
  };

  const handleGuardar = async (e) => {
    e.preventDefault();

    if (!datos.nombre.trim() || !datos.telefono.trim() || !datos.direccion.trim()) {
      setErrorDatos("Nombre, teléfono y dirección son obligatorios.");
      return;
    }

    try {
      setGuardando(true);
      setErrorDatos("");
      setExitoDatos("");

      const respuesta = await actualizarPerfil(usuarioId, {
        nombre: datos.nombre.trim(),
        apellido: datos.apellido.trim(),
        telefono: datos.telefono.trim(),
        direccion: datos.direccion.trim(),
      });

      // Sincroniza el nombre en localStorage para que la Navbar lo refleje al instante
      const sesion = JSON.parse(localStorage.getItem("usuarioLogueado"));
      const sesionActualizada = { ...sesion, nombre: respuesta.data.nombre };
      localStorage.setItem("usuarioLogueado", JSON.stringify(sesionActualizada));
      window.dispatchEvent(new Event("usuarioLogueado"));

      setExitoDatos("Tus datos se actualizaron correctamente.");
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
      setErrorDatos("No se pudieron guardar los cambios. Inténtalo nuevamente.");
    } finally {
      setGuardando(false);
    }
  };

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "—";
    const [anio, mes, dia] = fechaStr.split("-");
    return `${dia}/${mes}/${anio}`;
  };

  const claseEstado = (estado) => {
    const e = (estado || "").toLowerCase();
    if (e === "confirmada") return "estado-pill confirmada";
    if (e === "cancelada") return "estado-pill cancelada";
    return "estado-pill pendiente";
  };

  return (
    <div className="perfil-bg">
      <header className="banner-tecnologico text-center py-4">
        <div className="container">
          <h1 className="h2 fw-bold mb-1">Mi Perfil</h1>
          <p className="mb-0 small opacity-75">Administra tus datos personales y revisa tu historial de agendamientos</p>
        </div>
      </header>

      <div className="container py-5">
        {/* Selector de pestañas */}
        <div className="perfil-tabs mb-4">
          <button
            type="button"
            className={`perfil-tab ${pestañaActiva === "datos" ? "active" : ""}`}
            onClick={() => setPestañaActiva("datos")}
          >
            <i className="bi bi-person-circle me-2"></i> Mis Datos
          </button>
          <button
            type="button"
            className={`perfil-tab ${pestañaActiva === "agendamientos" ? "active" : ""}`}
            onClick={() => setPestañaActiva("agendamientos")}
          >
            <i className="bi bi-calendar-check me-2"></i> Mis Agendamientos
            {agendamientos.length > 0 && <span className="perfil-tab-badge">{agendamientos.length}</span>}
          </button>
        </div>

        {/* PESTAÑA: Mis Datos */}
        {pestañaActiva === "datos" && (
          <div className="perfil-card">
            {cargandoDatos ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted small">Cargando tus datos...</p>
              </div>
            ) : (
              <form onSubmit={handleGuardar}>
                {errorDatos && <div className="alert alert-danger py-2 small">{errorDatos}</div>}
                {exitoDatos && <div className="alert alert-success py-2 small">{exitoDatos}</div>}

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      value={datos.nombre}
                      onChange={handleChange}
                      disabled={guardando}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Apellido</label>
                    <input
                      type="text"
                      name="apellido"
                      className="form-control"
                      value={datos.apellido}
                      onChange={handleChange}
                      disabled={guardando}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" value={datos.correo} disabled readOnly />
                    <span className="form-text-hint">El correo no puede modificarse desde aquí.</span>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      className="form-control"
                      value={datos.telefono}
                      onChange={handleChange}
                      disabled={guardando}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Dirección del Servicio</label>
                    <input
                      type="text"
                      name="direccion"
                      className="form-control"
                      value={datos.direccion}
                      onChange={handleChange}
                      disabled={guardando}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-login-cfd mt-4" style={{ width: "auto", padding: "12px 40px" }} disabled={guardando}>
                  {guardando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Guardando...
                    </>
                  ) : (
                    "Guardar Cambios"
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* PESTAÑA: Mis Agendamientos */}
        {pestañaActiva === "agendamientos" && (
          <div className="perfil-card">
            {cargandoAgendamientos ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted small">Consultando tu historial...</p>
              </div>
            ) : errorAgendamientos ? (
              <div className="alert alert-danger py-2 small">{errorAgendamientos}</div>
            ) : agendamientos.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <i className="bi bi-calendar-x fs-2 d-block mb-2"></i>
                <span>Todavía no tienes agendamientos registrados.</span>
              </div>
            ) : (
              <div className="agendamientos-lista">
                {agendamientos.map((res) => (
                  <div key={res.id} className="agendamiento-item">
                    <div className="agendamiento-info">
                      <span className="agendamiento-numero">CFD-{res.id}</span>
                      <h6 className="fw-bold mb-1">{res.servicio?.nombre || "Servicio CFD"}</h6>
                      <p className="text-muted small mb-0">
                        <i className="bi bi-calendar3 me-1"></i> {formatearFecha(res.disponibilidad?.fecha)}
                        <span className="mx-2">·</span>
                        <i className="bi bi-clock me-1"></i> {res.disponibilidad?.horaInicio?.substring(0, 5) || "—"} Hrs
                      </p>
                    </div>
                    <span className={claseEstado(res.estado)}>{res.estado}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
