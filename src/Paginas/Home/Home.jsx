// src/Paginas/Home/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importante para la navegación
import { getServicios } from "../Servicios/Api";
import "../../index.css";

export function Home() {
  // Estado para servicios si decides mostrarlos en el Home más adelante
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    // Ejemplo de carga de datos inicial
    const fetchServicios = async () => {
      try {
        const res = await getServicios();
        setServicios(res.data);
      } catch (error) {
        console.error("Error cargando servicios en Home");
      }
    };
    fetchServicios();
  }, []);
  
  return (
    <div className="home-container">
      {/* Banner Principal: 
        Mantenemos la identidad visual con 'banner-tecnologico'
      */}
      <section className="banner-tecnologico">
        <div className="container py-5 text-center text-md-start">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">
                SERVICIOS INTEGRALES DE ASEO INDUSTRIAL Y DOMICILIARIO
              </h1>
              <p className="lead mb-4">
                Soluciones eficientes y profesionales en la Región Metropolitana y alrededores.
              </p>
              
              <div className="mt-4">
                {/* Navegación a la página de Servicios */}
                <Link to="/servicios" className="btn btn-lg btn-conocer-home me-3 shadow-sm">
                  Conocer Servicios
                </Link>
                
                {/* Navegación al nuevo Portal de Clientes (Login) */}
                <Link to="/login" className="btn btn-outline-light btn-lg shadow-sm">
                  Portal Clientes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Introducción */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2 className="text-cfd-blue fw-bold mb-4">Compromiso con la Excelencia</h2>
              <p className="text-secondary fs-5">
                En CFD nos especializamos en mantener espacios impecables bajo los más altos estándares 
                de seguridad y eficiencia. Ya sea en plantas industriales o en su oficina, 
                nuestro equipo está listo para actuar.
              </p>
              <div className="border-bottom border-3 border-cfd-lime w-25 mx-auto mt-4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Espacio para secciones futuras de Clientes o Testimonios */}
      <section className="py-5" style={{ backgroundColor: "#f8fbff" }}>
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <i className="bi bi-shield-check display-5 text-cfd-blue"></i>
              <h4 className="mt-3 fw-bold">Seguridad</h4>
              <p className="small">Protocolos estrictos en cada intervención.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-clock-history display-5 text-cfd-blue"></i>
              <h4 className="mt-3 fw-bold">Puntualidad</h4>
              <p className="small">Cumplimiento riguroso de los plazos establecidos.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-people display-5 text-cfd-blue"></i>
              <h4 className="mt-3 fw-bold">Profesionalismo</h4>
              <p className="small">Personal capacitado y con amplia experiencia.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}