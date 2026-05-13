import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Agenda.css';

export function Agenda() {
  const [fecha, setFecha] = useState(new Date());
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [reservaId, setReservaId] = useState("");

  const bloquesHorarios = [
    "09:00", "10:00", "11:00", 
    "12:00", "13:00", "14:00", 
    "15:00", "16:00", "17:00", 
    "18:00", "19:00", "20:00"
  ];

  const handleAgendar = () => {
    if (!horaSeleccionada) return alert("Por favor, selecciona una hora");
    const idGenerado = "CFD-" + Math.floor(1000 + Math.random() * 9000);
    setReservaId(idGenerado);
    setMostrarConfirmacion(true);
  };

  return (
    <div className="agenda-bg">
      <div className="container py-5">
        <h5 className="text-muted mb-4 ps-2">Selecciona la fecha y hora</h5>
        
        <div className="row g-4">
          {/* Bloque Calendario */}
          <div className="col-lg-6">
            <div className="agenda-card">
              <div className="card-header-simple">
                <i className="bi bi-chevron-left"></i>
                <span>{fecha.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                <i className="bi bi-chevron-right"></i>
              </div>
              <Calendar 
                onChange={setFecha} 
                value={fecha} 
                minDate={new Date()}
                locale="es-ES"
                prev2Label={null}
                next2Label={null}
              />
            </div>
          </div>

          {/* Bloque Horas */}
          <div className="col-lg-6">
            <div className="agenda-card">
              <div className="card-header-simple border-bottom mb-3">
                <span>Hora</span>
              </div>
              <div className="text-center mb-3 fw-bold text-secondary">
                {fecha.toLocaleDateString('es-ES')}
              </div>
              <div className="grid-horarios">
                {bloquesHorarios.map((hora) => (
                  <button 
                    key={hora}
                    className={`btn-hora ${horaSeleccionada === hora ? 'active' : ''}`}
                    onClick={() => setHoraSeleccionada(hora)}
                  >
                    {hora}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <button className="btn-confirmar-modern" onClick={handleAgendar}>
            CONFIRMAR AGENDAMIENTO
          </button>
        </div>
      </div>

      {/* Modal de Confirmación (Mismo del paso anterior) */}
      {mostrarConfirmacion && (
        <div className="modal-overlay">
          <div className="modal-confirmacion animate__animated animate__zoomIn">
            <div className="modal-icon-success">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <h3 className="fw-bold text-cfd-blue">¡Agendado con éxito!</h3>
            <div className="reserva-box my-4">
              <span className="reserva-label">NÚMERO DE RESERVA</span>
              <h2 className="reserva-numero">{reservaId}</h2>
            </div>
            <button className="btn-login-cfd" onClick={() => setMostrarConfirmacion(false)}>
              ENTENDIDO
            </button>
          </div>
        </div>
      )}
    </div>
  );
}