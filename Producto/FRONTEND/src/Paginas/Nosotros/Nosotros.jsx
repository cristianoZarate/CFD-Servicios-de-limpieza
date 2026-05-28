// src/Paginas/Nosotros/Nosotros.jsx
import React from "react";
import "./Nosotros.css";
// Importamos el CSS global para asegurar el acceso a las variables --cfd-blue, etc.
import "../../index.css"; 

export function Nosotros() {
  return (
    <div className="nosotros-page">
      {/* Header con efecto de profundidad */}
      <header className="nosotros-header text-center py-5">
        <div className="container">
          <h1 className="display-3 fw-bold text-cfd-blue">Nuestra Empresa</h1>
          <p className="lead mx-auto" style={{ maxWidth: '800px' }}>
            CFD SERVICIOS es una empresa dinámica y proactiva, comprometida con el éxito y crecimiento de nuestros clientes a través de soluciones precisas y profesionales.
          </p>
        </div>
      </header>

      <section className="container py-5">
        <div className="row g-4">
          
          {/* Tarjeta Misión */}
          <div className="col-md-4">
            <div className="nosotros-card mission">
              <div className="icon-box">
                <i className="bi bi-rocket-takeoff"></i>
              </div>
              <h3>Nuestra Misión</h3>
              <p>Satisfacer las necesidades de nuestros clientes asegurando el correcto funcionamiento de su operación mediante planes personalizados.</p>
            </div>
          </div>

          {/* Tarjeta Visión */}
          <div className="col-md-4">
            <div className="nosotros-card vision">
              <div className="icon-box">
                <i className="bi bi-eye"></i>
              </div>
              <h3>Nuestra Visión</h3>
              <p>Ser un referente en soluciones de mantención y aseo, ofreciendo un enfoque definitivo y perdurable para lugares públicos y privados.</p>
            </div>
          </div>

          {/* Tarjeta Calidad */}
          <div className="col-md-4">
            <div className="nosotros-card quality">
              <div className="icon-box">
                <i className="bi bi-shield-check"></i>
              </div>
              <h3>Política de Calidad</h3>
              <p>Compromiso total con la mejora continua, productos confiables y responsabilidad socio-ambiental bajo el marco legal vigente.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Sección Técnica / Valores */}
      <section className="technical-info py-5 bg-cfd-dark text-white text-center">
        <div className="container">
          <h2 className="mb-4">Capacitación y Excelencia</h2>
          <div className="row">
            <div className="col-md-6">
              <p className="fs-5">Personal calificado en normativa <strong>BPM, HACCP y BRC</strong>.</p>
            </div>
            <div className="col-md-6">
              <p className="fs-5">Uso experto de maquinaria industrial y seguridad industrial.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}