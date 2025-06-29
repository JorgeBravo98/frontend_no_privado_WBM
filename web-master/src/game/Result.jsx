import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Result.css"; // Usa un archivo propio para separar estilos

export default function Result() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGameData(res.data);
    };

    fetchResult();
  }, [id]);

  if (!gameData) {
    return <h2>⏳ Cargando resultados...</h2>;
  }

  const ganador = gameData.jugadores.find(j => j.user.id === gameData.ganador_id);
  const resto = gameData.jugadores
    .filter(j => j.user.id !== gameData.ganador_id)
    .sort((a, b) => b.posicion - a.posicion);

  return (
    <div className="result-container">
      <h1>🎉 Partida Terminada 🎉</h1>
      <h2 className="ganador">🏆 Ganador: {ganador?.user.name}</h2>

      <h3>📊 Posiciones finales:</h3>
      <div className="slots">
        {[ganador, ...resto].map(j => (
          <div className={`slot ${j.user.id === gameData.ganador_id ? 'winner' : ''}`} key={j.id}>
            <p className="slot-name">{j.user.name}</p>
            <p className="slot-pos">Casilla {j.posicion}</p>
          </div>
        ))}
      </div>

      <p className="game-id">ID de la partida: #{gameData.id}</p>
    </div>
  );
}

