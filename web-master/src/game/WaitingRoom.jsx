import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./WaitingRoom.css";

export default function WaitingRoom() {
  const { id } = useParams();
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJugadores(response.data.jugadores);
      } catch (error) {
        console.error("Error al obtener la partida:", error);
      }
    };

    fetchGame();
    const intervalo = setInterval(fetchGame, 3000);

    return () => clearInterval(intervalo);
  }, [id]);

  return (
    <div className="waiting-container">
      <h2>🕒 Esperando a otros jugadores...</h2>
      <div className="slots">
        {[0, 1, 2, 3].map((i) => {
          const jugador = jugadores[i];
          return (
            <div key={i} className="slot">
              {jugador ? (
                <div>
                  <strong>{jugador.user.name}</strong>
                  <p>{jugador.rol === "host" ? "Creador" : "Invitado"}</p>
                </div>
              ) : (
                <p>Vacante...</p>
              )}
            </div>
          );
        })}
      </div>
      <p className="game-id">ID de la partida: <code>{id}</code></p>
    </div>
  );
}
