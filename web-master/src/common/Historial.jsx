import { useEffect, useState } from "react";
import axios from "axios";
import "../common/App.css";
import { useNavigate } from "react-router-dom";

export default function Historial() {
  const [partidas, setPartidas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMensaje("Debes iniciar sesión para ver tu historial.");
      return;
    }

    const fetchHistorial = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/games/user/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Filtra solo partidas con ganador_id definido
        const terminadas = response.data.games.filter(
          (g) => g.ganador_id !== null && g.estado == false && g.en_progreso == false
        );

        setPartidas(terminadas);
      } catch {
        setMensaje("Error al cargar el historial.");
      }
    };

    fetchHistorial();
  }, []);

  const handleVerResultado = (id) => {
    navigate(`/result/${id}`);
  };

  return (
    <div className="partidas-container">
      <h2>📜 Historial de Partidas</h2>
      {mensaje && <p>{mensaje}</p>}
      <ul>
        {Array.isArray(partidas) && partidas.length > 0 ? (
          partidas.map((partida) => (
            <li key={partida.id}>
              <strong>{partida.name}</strong> - ID: {partida.id} <br />
              Ganador:{" "}
              {
                partida.jugadores.find((j) => j.user.id === partida.ganador_id)
                  ?.user.name
              }
              <button onClick={() => handleVerResultado(partida.id)}>
                Ver Resultado
              </button>
            </li>
          ))
        ) : !mensaje ? (
          <p>No tienes partidas finalizadas aún.</p>
        ) : null}
      </ul>
    </div>
  );
}
