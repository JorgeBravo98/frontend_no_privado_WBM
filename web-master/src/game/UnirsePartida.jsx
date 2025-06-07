import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UnirsePartida.css";

export default function UnirsePartida() {
  const [idPartida, setIdPartida] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMensaje("Debes iniciar sesión para unirte.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/games/${idPartida}/join`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate(`/waiting-room/${idPartida}`);
    } catch (error) {
      if (error.response?.data?.error) {
        setMensaje(error.response.data.error);
      } else {
        setMensaje("Error al intentar unirse a la partida.");
      }
    }
  };

  return (
    <div className="landing-container">
      <div className="card">
        <h2 className="crear-titulo">Unirse a una partida existente</h2>
        <form onSubmit={handleJoin} className="crear-formulario">
          <label htmlFor="idPartida">ID de la partida</label>
          <input
            id="idPartida"
            type="number"
            value={idPartida}
            onChange={(e) => setIdPartida(e.target.value)}
            placeholder="Ej: 3"
            required
          />
          <button type="submit">Unirse</button>
        </form>
        {mensaje && <p className="crear-mensaje">{mensaje}</p>}
      </div>
    </div>
  );
}
