// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./componentes/Navbar/Navbar";
import { Footer } from "./componentes/Footer/Footer";
import { Home } from "./Paginas/Home/Home";
import { Nosotros } from "./Paginas/Nosotros/Nosotros";
import { Servicios } from "./Paginas/Servicios/Servicios";


import { Login } from "./Paginas/Login/Login";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        
        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/servicios" element={<Servicios />} />
            

            <Route path="/login" element={<Login />} />
            

          </Routes>
        </main>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;