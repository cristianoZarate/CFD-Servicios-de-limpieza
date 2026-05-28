import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import chapaog from "../../assets/chapaog.png"; 
import "./Footer.css";

export function Footer() {
  return (
    <footer className="cfd-footer pt-5 pb-3">
      <div className="container">
        <div className="row text-center text-md-start align-items-center">
          
          {/* Columna 1: Logo */}
          <div className="col-md-4 mb-4">
            <div className="mb-3">
              <img src={logo} alt="Logo CFD" height="70" className="mb-2" />
              <h4 className="fw-bold" style={{ color: "var(--cfd-blue)" }}>CFD SERVICIOS</h4>
            </div>
          </div>

          {/* Columna 2: Contáctanos (Ahora incluye el teléfono) */}
          <div className="col-md-4 mb-4 text-center">
            <h5 className="fw-bold mb-3" style={{ color: "var(--cfd-blue)" }}>Contáctanos</h5>
            <p className="mb-1">
              <a href="mailto:contacto@cfdservicios.cl" className="text-decoration-none border-bottom" style={{ borderColor: "var(--cfd-blue)", color: "inherit" }}>
                contacto@cfdservicios.cl
              </a>
            </p>
            <p className="mt-2 fw-bold" style={{ color: "var(--cfd-blue)" }}>
              +569 9996 4866
            </p>
          </div>

          {/* Columna 3: Sello de Garantía (Imagen PNG) */}
          <div className="col-md-4 mb-4 text-center">
            <img 
              src={chapaog} 
              alt="Garantía de Limpieza Profesional" 
              style={{ maxHeight: "150px", width: "auto" }} 
              className="img-fluid"
            />
          </div>
        </div>

        <hr className="mt-4" style={{ opacity: 0.1, backgroundColor: 'var(--cfd-dark)' }} />

        {/* Fila Inferior: Dirección actualizada */}
        <div className="row mt-3">
          <div className="col text-center">
            <p className="small mb-0 text-muted">
              Copyright © 2026 CFD Servicios — Reina Maud #6124, Lo Prado, Santiago
            </p>
          </div>
        </div>
      </div>

      {/* Botón Flotante de WhatsApp */}
      <a href="https://wa.me/56999964866" className="whatsapp-float" target="_blank" rel="noreferrer">
        <i className="bi bi-whatsapp"></i>
      </a>
    </footer>
  );
}