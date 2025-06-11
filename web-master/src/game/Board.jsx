import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Board.css';

export default function Board() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [tablero, setTablero] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${id}/board`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (Array.isArray(response.data) && response.data.length >= 49) {
          setTablero(response.data);
          setLoading(false);
        } else {
          setTimeout(fetchBoard, 1000);
        }
      } catch (error) {
        console.error("Error al cargar el tablero:", error);
      }
    };

    fetchBoard();
  }, [id]);

  if (loading) {
    return (
      <div className="board">
        <h2>⏳ Cargando tablero...</h2>
      </div>
    );
  }

  return (
    <div className="board">
      <h1>100 Pasos por Chile</h1>
      <p className="subtitle">Recorre el país descubriendo sus maravillas</p>
      <div className="board-grid">
        {tablero.map((box) => (
          <div
            key={box.number}
            className={`square ${box.ciudadIconica ? `ciudad-${box.number}` : `type-${box.type}`}`}
          >
            <div className="square-number">{box.number}</div>
            <div className="players-in-square">
              {box.players.map((name, idx) => (
                <span key={idx} className="player-token">{name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
