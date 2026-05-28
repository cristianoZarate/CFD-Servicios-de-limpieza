// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Estilos Globales
import './index.css' 
// Iconos para el Footer y Navbar
import 'bootstrap-icons/font/bootstrap-icons.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)