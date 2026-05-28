// src/Paginas/Servicios/Servicios.jsx
import React, { useState } from "react";
import "./Servicios.css";

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
      <header className="banner-tecnologico text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Nuestros Servicios</h1>
          <p className="lead">Haz clic en un servicio para explorar los detalles</p>
        </div>
      </header>

      <section className="container py-5">
        <div className="services-wrapper">
          {servicios.map((s) => (
            <div 
              key={s.id}
              className={`service-item-container ${servicioActivo === s.id ? 'is-active' : ''}`}
              onClick={() => setServicioActivo(servicioActivo === s.id ? null : s.id)}
            >
              {/* Parte Izquierda: El Cuadrado */}
              <div className={`nosotros-card ${s.clase}`}>
                <div className="icon-box">
                  <i className={`bi ${s.icono}`}></i>
                </div>
                <div className="card-info-basic">
                  <h3 className="h5 fw-bold mb-1">{s.titulo}</h3>
                  <p className="small m-0 text-muted">
                    {servicioActivo === s.id ? 'Cerrar' : 'Click para detalles'}
                  </p>
                </div>
              </div>

              {/* Parte Derecha: El Texto que aparece */}
              <div className="service-details-content">
                <div className="details-inner">
                  <h2 className="text-cfd-blue fw-bold mb-3">{s.titulo}</h2>
                  <p className="description-text">{s.descripcion}</p>
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    {s.items.map((item, i) => (
                      <span key={i} className="badge-servicio">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}