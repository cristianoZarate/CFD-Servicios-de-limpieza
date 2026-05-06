// src/Paginas/Servicios/Servicios.jsx
import React, { useState } from "react";
import "./Servicios.css";
import "../Nosotros/Nosotros.css"; 
import "../../index.css";

export function Servicios() {
  const [servicioActivo, setServicioActivo] = useState(null);

  const servicios = [
    {
      id: "industrial",
      titulo: "Aseo Industrial",
      icono: "bi-buildings",
      clase: "mission",
      descripcion: "CFD posee experiencia en el aseo y mantención de plantas productivas en la industria alimentaria, talleres, galpones de almacenaje, bodegas, patios de acopio, maquinaria y paradas de planta.",
      items: ["Plantas productivas", "Talleres y Galpones", "Maquinaria pesada"]
    },
    {
      id: "oficinas",
      titulo: "Aseo Oficinas y Domicilio",
      icono: "bi-briefcase",
      clase: "vision",
      descripcion: "Mantenemos la pulcritud en oficinas, colegios, universidades, bancos, hospitales y malls. La limpieza mejora la productividad y el clima laboral.",
      items: ["Instituciones educativas", "Centros de salud", "Bancos y Malls"]
    },
    {
      id: "vidrios",
      titulo: "Vidrios y Fachadas",
      icono: "bi-droplet-half",
      clase: "quality",
      descripcion: "Personal y equipo especializado para limpieza de vidrios y fachadas en altura, bajo estrictas normas de seguridad y prevención de riesgos.",
      items: ["Vidrios interior/exterior", "Fachadas de vidrio", "Hidrolavado"]
    }
  ];

  return (
    <div className="servicios-page">
      <header className="banner-tecnologico">
        <div className="container">
          <h1 className="display-4 fw-bold">Nuestros Servicios</h1>
          <p className="lead">Selecciona un servicio para ver más detalles</p>
        </div>
      </header>

      <section className="container py-5">
        <div className="row g-4 mb-5">
          {servicios.map((s) => (
            <div className="col-12 d-flex justify-content-center" key={s.id}>
              <div 
                className={`nosotros-card ${s.clase} ${servicioActivo === s.id ? 'card-selected' : ''}`}
                onClick={() => setServicioActivo(s.id)}
                style={{ 
                  cursor: 'pointer', 
                  display: 'flex', 
                  flexDirection: 'column', // Alineación vertical para el cuadrado
                  alignItems: 'center',    // Centrado horizontal de contenido
                  justifyContent: 'center', // Centrado vertical de contenido
                  textAlign: 'center',     // Centrado del texto
                  padding: '20px',
                  width: '250px',          // Ancho fijo para hacerlo cuadrado
                  height: '250px',         // Alto fijo para hacerlo cuadrado
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="icon-box mb-3" style={{ flexShrink: 0 }}>
                  <i className={`bi ${s.icono}`} style={{ fontSize: '2.5rem' }}></i>
                </div>
                <div>
                  <h3 className="h5 fw-bold mb-2">{s.titulo}</h3>
                  <p className="small m-0 text-muted">Click para detalles</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="info-desplegable-container" style={{ minHeight: '200px' }}>
          {servicioActivo && (
            <div className="info-panel show">
              {servicios.filter(s => s.id === servicioActivo).map(s => (
                <div 
                  key={s.id}
                  className="p-4 rounded-4 shadow-sm bg-white border-start border-5" 
                  style={{ borderColor: `var(--cfd-${s.clase === 'mission' ? 'blue' : s.clase === 'vision' ? 'turquoise' : 'lime'})` }}
                >
                  <h2 className="text-cfd-blue fw-bold mb-3">{s.titulo}</h2>
                  <p className="fs-5 text-secondary">{s.descripcion}</p>
                  <div className="d-flex flex-wrap gap-2 mt-4">
                    {s.items.map((item, i) => (
                      <span key={i} className="badge-servicio">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}