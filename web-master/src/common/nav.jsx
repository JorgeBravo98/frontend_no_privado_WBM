import './App.css'
import './nav.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="navbar-title"> 🏠 100 Pasos por Chile</a>
      </div>
      <div className="navbar-right">
        <a href='/login'>👤 Inicio Sesión</a>
        <a href='/registro'>📝 Registro de Usuario</a>
      </div>
    </nav>
  )
}

export default Navbar



