// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "./componentes/Navbar/Navbar";
import { Footer } from "./componentes/Footer/Footer";

// Importación de Páginas
import { Home } from "./Paginas/Home/Home";
import { Nosotros } from "./Paginas/Nosotros/Nosotros";
import { Servicios } from "./Paginas/Servicios/Servicios";
import { Agenda } from "./Paginas/Agendar/Agenda";
import { Login } from "./Paginas/Login/Login";
import { Registro } from "./Paginas/Registro/Registro"; // Nueva página de registro
import { AdminDashboard } from "./Paginas/Admin/AdminDashboard";

// Componente auxiliar para manejar la visibilidad de los elementos globales
function LayoutWrapper({ children }) {
  const location = useLocation();
  // Definimos que si la ruta es /admin, NO se muestre el navbar ni el footer
  const esAdmin = location.pathname === "/admin";

  return (
    <div className="d-flex flex-column min-vh-100">
      {!esAdmin && <Navbar />}
      
      <main className="flex-grow-1">
        {children}
      </main>

      {!esAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} /> {/* Ruta para crear cuentas */}
          <Route path="/agenda" element={<Agenda />} />

          {/* Ruta Administrativa (Limpia) */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;