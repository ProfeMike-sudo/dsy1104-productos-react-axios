import React from 'react'
import ReactDOM from 'react-dom/client'
// El CSS de Bootstrap va primero, para que styles.css pueda sobrescribirlo.
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import ProductosPage from './pages/ProductosPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductosPage />
  </React.StrictMode>
)
