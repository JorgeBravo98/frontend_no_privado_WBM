
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./WaitingRoom.css";

export default function WaitingRoom() {
  const { id } = useParams();
  const [jugadores, setJugadores] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const currentUser = (() => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  })();

  const fetchGame = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const game = response.data;
      setJugadores(game.jugadores);

      if (game.en_progreso) {
        navigate(`/board/${id}`);
      }
    } catch {
    }
  };

  const handleStartGame = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/${id}/start`, {}, {

        headers: { Authorization: `Bearer ${token}` }
      });

      let intentos = 0;
      while (intentos < 10) {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${id}/board`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (Array.isArray(res.data) && res.data.length >= 100) {
          navigate(`/board/${id}`);
          return;
        }

        await new Promise(resolve => setTimeout(resolve, 300));
        intentos++;
      }
    } catch  {
    }
  };

  useEffect(() => {
    fetchGame();
    const intervalo = setInterval(fetchGame, 3000);
    return () => clearInterval(intervalo);
  }, [id]);

  const esHost = jugadores.find(j => j.user.id === currentUser?.id)?.rol === "host";

  return (
    <div className="waiting-container">
      <h2>🕒 Esperando a otros jugadores...</h2>
      <div className="slots">
        {[0, 1, 2, 3].map((i) => {
          const jugador = jugadores[i];
          return (
            <div key={i} className="slot">
              {jugador ? (
                <div className="player-info">
                  <p className="player-name">{jugador.user.name}</p>
                  <p className="player-role">{jugador.rol === "host" ? "Creador" : "Invitado"}</p>
                </div>
              ) : (
                <p>Vacante...</p>
              )}
            </div>
          );
        })}
      </div>
      <p className="game-id">ID de la partida: <code>{id}</code></p>

      {esHost && jugadores.length === 4 && (
        <button className="start-button" onClick={handleStartGame}>
          🚀 Iniciar Partida
        </button>
      )}
    </div>
  );
}
