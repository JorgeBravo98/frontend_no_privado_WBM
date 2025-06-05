import './App.css';
import './nav.css';
import { useEffect, useState } from 'react';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange")); // Notifica a los componentes
    window.location.href = "/"; // Redirige y actualiza visual
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="navbar-title"> 🏠 100 Pasos por Chile</a>
      </div>
      <div className="navbar-right">
        {!isLoggedIn ? (
          <>
            <a href="/login">👤 Inicio Sesión</a>
            <a href="/registro">📝 Registro de Usuario</a>
          </>
        ) : (
          <button onClick={handleLogout} className="navbar-link">
            🚪 Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
