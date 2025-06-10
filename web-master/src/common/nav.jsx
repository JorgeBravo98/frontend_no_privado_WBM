import './App.css';
import './nav.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState({ name: "", mail: "" });
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setShowMenu(false);
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  // Cargar datos del usuario (ajusta según tu backend/localStorage)
  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error("No se pudo obtener el usuario");
          return res.json();
        })
        .then(userData => {
          setUser({
            name: userData.name || "Usuario",
            mail: userData.mail || "correo@ejemplo.com"
          });
        })
        .catch(err => {
          console.error("Error al obtener usuario:", err);
          handleLogout(); // Desloguear si hay error por seguridad
        });
    }
  }, [isLoggedIn]);

  // Cerrar el menú si se hace click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
    window.location.href = "/";
  };

  const handlePerfil = () => {
    setShowMenu(false);
    navigate("/perfil");
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
          <div className="navbar-user-menu" ref={menuRef}>
            <button
              className="navbar-user-btn"
              onClick={() => setShowMenu((v) => !v)}
              aria-label="Menú de usuario"
            >
              👤
            </button>
            {showMenu && (
              <div className="navbar-dropdown">
                <div className="navbar-user-info">
                  <div className="navbar-user-name">{user.name}</div>
                  <div className="navbar-user-mail">{user.mail}</div>
                </div>
                <button className="navbar-dropdown-btn" onClick={handlePerfil}>
                  Editar perfil
                </button>
                <button className="navbar-dropdown-btn" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
