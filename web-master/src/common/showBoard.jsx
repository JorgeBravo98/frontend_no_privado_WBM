import React, { useEffect, useState } from "react";
import axios from "axios";
import "../game/Board.css";

export default function ShowBoard() {
  const [tablero, setTablero] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cambia la URL por la de tu backend si es necesario
    const fetchBoard = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/1/board`);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setTablero(res.data);
        }
      } catch {
        // Puedes mostrar un mensaje de error si quieres
      } finally {
        setLoading(false);
      }
    };
    fetchBoard();
  }, []);

  if (loading) return <div>Cargando tablero...</div>;
  if (!tablero.length) return <div>No hay tablero para mostrar.</div>;

  return (
    <div className="board-grid">
      {tablero.map((box) => (
        <div
          key={box.number}
          className={`square ${box.ciudadIconica ? `ciudad-${box.number}` : `type-${box.type}`}`}
        >
          <div className="square-number">{box.number}</div>
          <div className="players-in-square">
            {box.players && box.players.map((player, idx) => {
              const isExternal = player.avatar?.startsWith("http");
              const avatarName = isExternal
                ? "url"
                : player.avatar?.split("/").pop()?.replace(".png", "") || "avatar1";

              return (
                <div
                  key={player.name + idx}
                  className={`player-avatar avatar-${avatarName} player-color-${player.user_id % 4}`}
                  title={player.name}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}