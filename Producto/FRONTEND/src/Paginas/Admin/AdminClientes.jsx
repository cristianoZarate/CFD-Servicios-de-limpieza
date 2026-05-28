// src/Paginas/Admin/AdminClientes.jsx
import React, { useState, useEffect } from "react";
import { getUsuarios } from "../Servicios/Api"; 
import "./AdminClientes.css";

export function AdminClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarClientesReales = async () => {
      try {
        setLoading(true);
        const respuesta = await getUsuarios();
        
        if (respuesta.data && respuesta.data.length > 0) {
          // Omitimos de forma estricta: apellido, estado y password_hash en el mapeo
          const clientesFormateados = respuesta.data.map((u) => ({
            id: u.id,
            nombre: u.nombre || "Usuario CFD",
            correo: u.correo || u.email || "No registrado",
            rol: u.rol || u.role || "cliente",
            telefono: u.telefono || "No registrado",
            direccion: u.direccion || "Dirección no provista"
          }));

          // Filtrar por seguridad para mostrar solo los que tienen rol 'cliente' 
          // (o quitar el .filter si deseas ver administradores también)
          setClientes(clientesFormateados.filter(c => c.rol.toLowerCase() === "cliente"));
        } else {
          setClientes([]);
        }
      } catch (error) {
        console.error("Error al conectar con /usuarios:", error);
        setClientes([]);
      } finally {
        setLoading(false);
      }
    };

    cargarClientesReales();
  }, []);

  return (
    <div className="clientes-section-wrapper animate__animated animate__fadeIn">
      {/* Fila de Tarjetas de Métrica (KPI idéntico al Dashboard) */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card-kpi kpi-purple">
            <div className="kpi-icon"><i className="bi bi-people-fill"></i></div>
            <div className="kpi-data">
              <h6>Clientes Registrados</h6>
              <span className="fs-2 fw-bold">{clientes.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Directorio de Clientes */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3">
          <h5 className="m-0 fw-bold text-cfd-blue">Directorio de Clientes</h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2 text-muted small">Consultando base de datos MySQL...</p>
            </div>
          ) : clientes.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-person-x fs-2 d-block mb-2"></i>
              <span>No se registran clientes en la base de datos.</span>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nombre Completo</th>
                    <th>Correo Electrónico</th>
                    <th>Teléfono</th>
                    <th>Dirección de Trabajo</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td className="text-muted small fw-bold">#{cliente.id}</td>
                      <td className="fw-bold text-dark">
                        <i className="bi bi-person-circle me-2 text-secondary"></i>
                        {cliente.nombre}
                      </td>
                      <td>{cliente.correo}</td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          <i className="bi bi-telephone me-1 text-primary"></i>
                          {cliente.telefono}
                        </span>
                      </td>
                      <td className="text-truncate" style={{ maxValue: "250px" }}>
                        <i className="bi bi-geo-alt me-1 text-danger"></i>
                        {cliente.direccion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}