import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Board.css';

export default function Board() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const currentUser = (() => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  })();

  const [tablero, setTablero] = useState([]);
  const [loading, setLoading] = useState(true);
  const [turnoUserId, setTurnoUserId] = useState(null);
  const [dado, setDado] = useState(null);
  const [mensaje, setMensaje] = useState("");


  const fetchBoard = async () => {
    try {
      const resBoard = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${id}/board`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (Array.isArray(resBoard.data) && resBoard.data.length >= 49) {
        setTablero(resBoard.data);
        setLoading(false);
      } else {
        setTimeout(fetchBoard, 1000);
      }
    } catch (error) {
      console.error("Error al cargar el tablero:", error);
    }
  };

  const fetchTurno = async () => {
    try {
      const resGame = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTurnoUserId(resGame.data.turno_user_id);
    } catch (error) {
      console.error("Error al obtener el turno:", error);
    }
  };

  const tirarDado = async () => {
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/games/${id}/move`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDado(res.data.dado);
      setMensaje(res.data.message);
      fetchBoard(); // actualizar tablero
      fetchTurno(); // actualizar turno
    } catch (error) {
      alert("❌ No se pudo mover el jugador. Verifica si es tu turno.");
    }
  };

  useEffect(() => {
    fetchBoard();
    fetchTurno();
    const interval = setInterval(() => {
      fetchTurno();
      fetchBoard();
    }, 4000);
    return () => clearInterval(interval);
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

      {currentUser?.id === turnoUserId && (
        <button className="dice-button" onClick={tirarDado}>
          🎲 Lanzar dado
        </button>
      )}

      {dado && <p>🎯 Sacaste un {dado}: {mensaje}</p>}

      <div className="board-grid">
        {tablero.map((box) => (
          <div
            key={box.number}
            className={`square ${box.ciudadIconica ? `ciudad-${box.number}` : `type-${box.type}`}`}
          >
            <div className="square-number">{box.number}</div>
            <div className="players-in-square">
              {box.players.map((player, idx) => {
                const isExternal = player.avatar?.startsWith('http');
                const avatarName = isExternal
                  ? 'url'
                  : player.avatar?.split('/').pop()?.replace('.png', '') || 'avatar1';

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
    </div>
  );
}
