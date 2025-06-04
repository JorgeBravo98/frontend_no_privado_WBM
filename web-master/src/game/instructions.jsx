import './instructions.css'

export default function Instructions() {
  return (
    <div className="instructions-container">
      <div className="instructions-title-box">
        <h1 className="instructions-title">Instrucciones del Juego</h1>
        <p className="instructions-subtitle">
          Aprende a jugar "100 Pasos por Chile" en simples pasos.
        </p>
      </div>

      <div className="instructions-card">
        <h2 className="section-subtitle">Objetivo del Juego</h2>
        <ol>
          <li>Cada jugador parte en Arica, en el extremo norte del tablero.</li>
          <li>En tu turno, lanza el dado y avanza el número de casillas correspondiente.</li>
          <li>Al avanzar, se activan efectos según la casilla en la que caes.</li>
          <li>Responde correctamente preguntas culturales o supera desafíos para seguir avanzando.</li>
          <li>El primer jugador en llegar a la Región de Magallanes (casilla final) gana.</li>
        </ol>
      </div>

      <div className="instructions-card">
        <h2 className="section-subtitle">Tipos de Casillas</h2>
        <ul>
          <li><strong>Casilla Blanca:</strong> Sin efecto, solo avanzas.</li>
          <li><strong>Casilla de Pregunta:</strong> Responde una pregunta de cultura chilena. Si fallas, pierdes un turno.</li>
          <li><strong>Retroceso:</strong> Vuelves 3 casillas automáticamente.</li>
          <li><strong>Avance Extra:</strong> Avanzas 2 pasos adicionales.</li>
          <li><strong>Pierde Turno:</strong> Saltas tu próximo turno.</li>
          <li><strong>Casilla de Carta:</strong> Robas una carta con efectos positivos o negativos.</li>
        </ul>
      </div>

      <div className="instructions-card">
        <h2 className="section-subtitle">Cartas del Juego</h2>
        <p>Las cartas se obtienen al caer en una casilla especial. Pueden incluir:</p>
        <ul>
          <li><strong>Zapatillas Turbo:</strong> Avanza el doble en tu próximo turno.</li>
          <li><strong>Tráfico en Santiago:</strong> Retrocede hasta la última casilla de Región Metropolitana.</li>
          <li><strong>Festival Regional:</strong> Intercambia posición con otro jugador.</li>
          <li><strong>Viento en contra:</strong> Salta tu siguiente turno.</li>
          <li><strong>Explorador Mapuche:</strong> Protege de una penalización futura.</li>
        </ul>
      </div>

      <div className="instructions-card">
        <h2 className="section-subtitle">Eventos Aleatorios</h2>
        <p>
          Al final de cada ronda (cuando todos juegan una vez), se lanza un dado de evento. Este puede provocar:
        </p>
        <ul>
          <li><strong>Erupción volcánica:</strong> Todos retroceden 2 casillas.</li>
          <li><strong>Bono Cultural:</strong> Todos avanzan 1 casilla.</li>
          <li><strong>Desafío grupal:</strong> Pregunta cooperativa. Si todos responden bien, todos avanzan.</li>
          <li><strong>Cierre de caminos:</strong> Nadie puede usar cartas en la próxima ronda.</li>
        </ul>
      </div>

      <footer className="instructions-footer">
        ¡Buena suerte en tu travesía por Chile!
      </footer>
    </div>
  );
}
