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
        <ol>
          <li>Cada jugador parte en Arica, en el extremo norte del tablero.</li>
          <li>En tu turno, lanza el dado y avanza el número de casillas correspondiente.</li>
          <li>Al avanzar, se activan efectos según la casilla en la que caes.</li>
          <li>Responde correctamente preguntas culturales o supera desafíos para seguir avanzando.</li>
          <li>El primer jugador en llegar a las Torres del Paine (casilla final) gana.</li>
        </ol>
      </div>

      <div className="instructions-card">
        <h2 className="section-subtitle">Tipos de Casillas</h2>
        <ul>
          <li><strong>Casilla Blanca:</strong> Sin efecto, solo avanzas.</li>
          <li><strong>Casilla de Pregunta:</strong> Responde una pregunta de cultura chilena. Si fallas, pierdes un turno.</li>
          <li><strong>Casilla de Taco:</strong> Retrocede 5 casillas automáticamente.</li>
          <li><strong>Casilla de Funicular:</strong> Avanza 5 casillas adicionales.</li>
          <li><strong>Casilla de Carta:</strong> Robas una carta con efectos positivos o negativos.</li>
        </ul>
      </div>

      <div className="instructions-card">
        <h2 className="section-subtitle">Cartas del Juego</h2>
        <p>Las cartas se obtienen al caer en una casilla especial. Pueden incluir:</p>
        <ul>
        <ul>
          <li><strong>Boleto de Metro:</strong> Viaja rápido y avanza 4 casillas adicionales en tu próximo turno.</li>
          <li><strong>Feria de Antigüedades:</strong> Intercambia una carta con otro jugador y cambia tu destino momentáneamente.</li>
          <li><strong>Cueca Alegre:</strong> Pierdes un turno porque te detuviste a bailar y celebrar en la plaza.</li>
        </ul>
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
        <ol>
          <li>
            <strong>Cuarentena Express:</strong> Un brote de virus obliga al jugador actual a entrar en cuarentena 
            por un turno. Durante esa ronda, el jugador no se mueve, pero se recupera automáticamente en el siguiente turno.
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
        </ol>
      </div>

      <footer className="instructions-footer">
        ¡Buena suerte en tu travesía por Chile!
      </footer>
    </div>
  );
}
