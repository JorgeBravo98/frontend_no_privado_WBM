import './App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="landing-container">
      <header>
        <h1>100 Pasos por Chile</h1>
        <p className="subtitle">
          Explora Chile casilla a casilla en un viaje de cultura, azar y chispeza.
        </p>
      </header>

      <div className="card">
        <Link to='/nosotros'>👤 Sobre nosotros</Link>
        <Link to='/instructions'>📖 Instrucciones</Link>
        <Link to='/board'>🎲 Tablero de Juego</Link>

        {isLoggedIn ? (
          <>
            <Link to='/crear'>🆕 Crear partida</Link>
            <Link to='/unirse'>🔗 Unirse a partida</Link>
            <Link to='/mis-partidas'>📋 Ver mis partidas</Link>
          </>
        ) : (
          <Link to='/login' className="jugar-btn">¡Ir a Jugar!</Link>
        )}
      </div>

      <footer className="read-the-docs">
        Desarrollado por el equipo WebMasters - IIC2513 2025
      </footer>
    </div>
  );
}

export default App;
