import "./instructions.css";

export default function Instructions() {
  return (
    <div className="instructions-container">
      <div className="instructions-title-box">
        <h1 className="instructions-title">Instrucciones del Juego</h1>
        <p className="instructions-subtitle">
          Aprende a jugar "50 Pasos por Chile" en simples pasos.
        </p>
      </div>

      <div className="instructions-card">
        <h2 className="section-subtitle">Objetivo del Juego</h2>
        <ul>
          <li>Cada jugador parte en Arica, en el extremo norte del tablero.</li>
          <li>En tu turno, lanza el dado y avanza el número de casillas correspondiente.</li>
          <li>Al avanzar, se activan efectos según la casilla en la que caes.</li>
          <li>Deberas ser estrategico para atacar a tus compañero o enfrentar los problemas!</li>
          <li>El primer jugador en llegar a las Torres del Paine (casilla final) gana.</li>
        </ul>
      </div>

      <div className="instructions-card">
        <h2 className="section-subtitle">Tipos de Casillas</h2>
        <ul>
          <li><strong>Casilla Carretera:</strong> Sin efecto, solo avanzas.</li>
          <li><strong>Casilla de Interrogación:</strong> Robas una carta con efectos positivos o negativos.</li>
          <li><strong>Casilla de Taco:</strong> Retrocede 5 casillas automáticamente.</li>
          <li><strong>Casilla de Funicular:</strong> Avanza 5 casillas adicionales.</li>
        </ul>
      </div>

      <div className="instructions-card">
        <h2 className="section-subtitle">Cartas del Juego</h2>
        <p>Las cartas se obtienen al caer en una casilla especial (Interrogación). Al ocurrir esto te tocara una de las siguientes
           opciones, las cuales podras usarla desde el siguiente turno antes de ejecutar el lanzamiento del dado.</p>
        <ul>
        
          <li><strong>Sopaipilla:</strong> Aplícala y multiplicaras x2 lo que obtengas en tu siguiente tirada de dados.</li>
          <li><strong>Empanada:</strong> Intercambia con otro jugador que tu elijas de posición en el tablero.</li>
          <li><strong>Choripán:</strong> Inhibe durante una ronda la posibilidad de que te lancen una empanada.</li>
        </ul>
        
      </div>

      <div className="instructions-card">
        <h2 className="section-subtitle">Eventos Aleatorios</h2>
        <p>
          Dentro del juego existirán una serie de eventos aleatorios que añaden un componente
          de imprevisibilidad y emoción a cada partida. Estos eventos pueden activarse cada vez
          que un jugador lanza el dado, y tienen la capacidad de afectar tanto al jugador actual
          como al resto de los participantes. A continuación, se presentan los eventos:
        </p>
        <ul>
          <li>
            <strong>Cuarentena Express:</strong> Un brote de virus obliga al jugador actual a entrar en cuarentena 
            por dos turnos. Durante las siguienes dos rondas, el jugador no se mueve.
            Este evento tiene una probabilidad de ocurrencia del 5% en cada lanzamiento
          </li>
          <li>
            <strong>18 de septiembre:</strong> Después de una intensa celebración de fiestas patrias, el
            jugador que reciba este evento sufre una desorientación tal que vuelve a la
            casilla número 1. Este evento tiene una probabilidad de ocurrencia del 3%. en cada lanzamiento.
          </li>
          <li>
            <strong>Marepoto:</strong> Este es el evento más improbable de todo el juego. Un gran sismo
            sacude el tablero y provoca un maremoto que hace que todos los jugadores
            sean reubicados aleatoriamente en una nueva casilla. Este evento tiene una probabilidad de ocurrencia 
            del 1% pero solo cuando el jugador cae en una casilla "normal".
          </li>
        </ul>
      </div>

      <footer className="instructions-footer">
        <strong>¡Buena suerte en tu travesía por Chile!</strong>
      </footer>
    </div>
  );
}