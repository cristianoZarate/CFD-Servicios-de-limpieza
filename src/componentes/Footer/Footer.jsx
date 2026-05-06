import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="cfd-footer pt-5 pb-3">
      <div className="container">
        <div className="row text-center text-md-start">
          
          {/* Columna 1: Logo y Contacto */}
          <div className="col-md-3 mb-4">
            <div className="mb-3">
              <img src={logo} alt="Logo CFD" height="60" className="mb-2" />
              <h4 className="fw-bold" style={{ color: "var(--cfd-blue)" }}>CFD SERVICIOS</h4>
            </div>
            <div className="contact-numbers">
              <p className="mb-1 fw-bold">+569 9996 4866</p> 
            </div>
            <div className="mt-3 fs-4">
              <i className="bi bi-instagram cursor-pointer" style={{ color: "var(--cfd-blue)" }}></i>
            </div>
          </div>

          {/* Columna 2: Contáctanos */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3" style={{ color: "var(--cfd-blue)" }}>Contáctanos</h5>
            <p className="mb-1">
              <a href="mailto:contacto@cfdservicios.cl" className="text-decoration-none border-bottom" style={{ borderColor: "var(--cfd-blue)" }}>
                contacto@cfdservicios.cl
              </a>
            </p>
          </div>

          {/* Columna 3: Links */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3" style={{ color: "var(--cfd-blue)" }}>Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none border-bottom" style={{ borderColor: "var(--cfd-blue)" }}>Inicio</Link>
              </li>
              <li className="mb-2">
                <Link to="/servicios" className="text-decoration-none border-bottom" style={{ borderColor: "var(--cfd-blue)" }}>Nuestros Servicios</Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Sello */}
          <div className="col-md-3 mb-4 text-center">
            <div className="seal-container d-inline-block p-3 rounded-circle border border-2" style={{ borderColor: "var(--cfd-blue)" }}>
                <span className="fw-bold" style={{ fontSize: '0.8rem', color: "var(--cfd-blue)" }}>
                    CFD<br/>GARANTÍA DE:<br/>LIMPIEZA PROFESIONAL
                </span>
            </div>
          </div>
        </div>

        <hr className="mt-4" style={{ opacity: 0.1, backgroundColor: 'var(--cfd-dark)' }} />

        <div className="row mt-3">
          <div className="col text-center text-md-start">
            <p className="small mb-0 text-muted">
              Copyright © 2026 CFD Servicios — San Antonio, V Región
            </p>
          </div>
        </div>
      </div>

      <a href="https://wa.me/56999964866" className="whatsapp-float" target="_blank" rel="noreferrer">
        <i className="bi bi-whatsapp"></i>
      </a>
    </footer>
  );
}