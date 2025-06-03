import React from 'react';
import './Board.css';

export default function Board() {
  const filas = [];
  for (let fila = 0; fila < 10; fila++) {
    const inicio = fila * 10 + 1;
    let numeros = Array.from({ length: 10 }, (_, i) => inicio + i);
    if (fila % 2 === 1) {
      numeros = numeros.reverse();
    }
    filas.push(numeros);
  }

  const squares = filas.flat();

  return (
    <div className="board">
      <h1>100 Pasos por Chile</h1>
      <p className="subtitle">Recorre el país descubriendo sus maravillas</p>
      <div className="board-grid">
        {squares.map((num) => (
          <div key={num} className="square">
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}
