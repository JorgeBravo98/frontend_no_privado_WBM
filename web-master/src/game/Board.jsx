import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Board.css";

export default function Board() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [ganadorId, setGanadorId] = useState(null);

  const currentUser = (() => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  })();

  const [tablero, setTablero] = useState([]);
  const [loading, setLoading] = useState(true);
  const [turnoUserId, setTurnoUserId] = useState(null);
  const [dado, setDado] = useState(null);
  const [jugadores, setJugadores] = useState([]);
  const [animandoDado, setAnimandoDado] = useState(false);
  const [inventario, setInventario] = useState([]);
  const [mensaje, setMensaje] = useState(""); //NUEVO
  const [casillaEspecial, setCasillaEspecial] = useState(null);
  const [mensajeMarepoto, setMensajeMarepoto] = useState("");



  const fetchBoard = async () => {
    try {
      const resBoard = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/games/${id}/board`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (Array.isArray(resBoard.data) && resBoard.data.length >= 49) {
        setTablero(resBoard.data);
        setLoading(false);
      } else {
        setTimeout(fetchBoard, 1000);
      }
    } catch {}
  };

  const fetchGame = async () => {
    try {
      const resGame = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/games/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTurnoUserId(resGame.data.turno_user_id);
      setJugadores(resGame.data.jugadores || []);
      if (resGame.data.ganador_id) {
        setGanadorId(resGame.data.ganador_id);
      }
    } catch {}
  };

  useEffect(() => {
    if (ganadorId) {
      navigate(`/result/${id}`);
    }
  }, [ganadorId]);

  const fetchInventario = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/games/${id}/players/${currentUser.id}/powers`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setInventario(res.data);
    } catch (error) {
      console.error("Error al obtener el inventario:", error);
    }
  };


  
  const handleLanzarDado = async () => {
    setAnimandoDado(true);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/games/${id}/move`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setDado(res.data.dado);
      setMensaje(res.data.messagex);
      setMensajeMarepoto(res.data.mensajeMarepoto || ""); 
      fetchBoard();
      fetchGame();
      fetchInventario();
      setCasillaEspecial(res.data.casilla_especial);
      setTimeout(() => setCasillaEspecial(null), 12000);
    } catch {
      const mensajeDiv = document.getElementById("mensaje");
      if (mensajeDiv) {
        mensajeDiv.textContent =
          "❌ No se pudo mover el jugador. Verifica si es tu turno.";
      }
    }
    setTimeout(() => setAnimandoDado(false), 1500);
  };

  useEffect(() => {
    if (mensajeMarepoto) {
      const timeout = setTimeout(() => {
        setMensajeMarepoto("");
      }, 10000); 
      return () => clearTimeout(timeout);
    }
  }, [mensajeMarepoto]);

  useEffect(() => {
    fetchBoard();
    fetchGame();
    fetchInventario();

    const interval = setInterval(() => {
      fetchBoard();
      fetchGame();
      fetchInventario();
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

  const getPlayerNameById = (id) => {
    const player = jugadores.find((p) => p.user.id === id);
    return player ? player.user.name : "jugador desconocido";
  };

  return (
    <div className="board">
      <h1>100 Pasos por Chile</h1>
      <p className="subtitle">Recorre el país descubriendo sus maravillas</p>

      <div className="board-wrapper">
        {/* Panel izquierdo */}
        <div className="left-panel">
          <h3>
            👤 Jugador:{" "}
            {currentUser?.name ||
              getPlayerNameById(currentUser?.id) ||
              currentUser?.id ||
              "?"}
          </h3>
          <p>
            ℹ️ Casilla actual:{" "}
            {tablero.find((box) =>
              box.players.some((p) => p.user_id === currentUser?.id)
            )?.number || "N/A"}
          </p>

          {currentUser?.id === turnoUserId ? (
            <p className="turno-activo">¡Es tu turno!</p>
          ) : (
            <p>⏳ Turno de: {getPlayerNameById(turnoUserId)}</p>
          )}

          {currentUser?.id === turnoUserId && (
            <button
              className={`dice-button ${animandoDado ? "rolling" : ""}`}
              onClick={handleLanzarDado}
              aria-label="Lanzar dado"
              disabled={animandoDado}
            >
              🎲 Lanzar
            </button>
          )}

          {dado && <p>🎯 Sacaste un {dado}</p>}
          
          {mensaje && !mensaje.startsWith("Avanzaste") && (
            <p className="mensaje-evento" id="mensaje">{mensaje}</p>
          )}

          {mensajeMarepoto && (
            <p className="mensaje-marepoto" id="mensaje-marepoto">
              {mensajeMarepoto}
            </p>
          )}

          <p>
            {casillaEspecial === "avance" && (
              <p className="casilla-especial-msg">🚀 ¡Funicular! Avanzaste 5</p>
            )}

            {casillaEspecial === "retroceso" && (
              <p className="casilla-especial-msg">⏪ ¡Taco! Retrocediste 5</p>
            )}
          </p>
        </div>

        {/* Tablero central */}
        <div className="board-grid">
          {tablero.map((box) => (
            <div
              key={box.number}
              className={`square ${
                box.ciudadIconica
                  ? `ciudad-${box.number}`
                  : `type-${box.type}`
              }`}
            >
              <div className="square-number">{box.number}</div>
              <div className="players-in-square">
                {box.players.map((player, idx) => {
                  const allowedAvatars = ["avatar1", "avatar2", "avatar3", "avatar4"];

                let avatarName;
                if (
                  player.avatar &&
                  !player.avatar.startsWith("http") &&
                  player.avatar.trim() !== ""
                ) {
                  const cleanName = player.avatar
                    .split("/")
                    .pop()
                    .replace(".png", "")
                    .trim();
                  avatarName = allowedAvatars.includes(cleanName) ? cleanName : "avatar1";
                } else {
                  avatarName = "avatar1";
                }

                  return (
                    <div
                      key={player.name + idx}
                      className={`player-avatar avatar-${avatarName} player-color-${
                        player.user_id % 4
                      }`}
                      title={player.name}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Panel derecho */}
        <div className="right-panel">
          <h3>🎒 Tu Inventario</h3>
          {inventario.length === 0 ? (
            <p>No tienes cartas aún.</p>
          ) : (
            <ul className="inventory-list">
              {inventario.map((carta) => (
                <li
                  key={carta.id}
                  className={`carta-item carta-${carta.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <span className="carta-nombre">{carta.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}