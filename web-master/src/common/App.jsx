import './App.css'

function App() {
  return (
    <div className="landing-container">
      <header>
        <h1>100 Pasos por Chile</h1>
        <p className="subtitle">
          Explora Chile casilla a casilla en un viaje de cultura, azar y chispeza.
        </p>
      </header>

      <div className="card">
        <a href='/nosotros'>👤 Sobre nosotros</a>
        <a href='/instructions'>📖 Instrucciones</a>
        <a href='/board'>🎲 Tablero de Juego</a>
      </div>

      <footer className="read-the-docs">
        Desarrollado por el equipo WebMasters - IIC2513 2025
      </footer>
    </div>
  )
}

export default App
