import { useState } from "react";
import axios from "axios";
import "../common/App.css";
import "./CrearPartida.css";
import { useNavigate } from "react-router-dom";

export default function CrearPartida() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMensaje("Debes iniciar sesión para crear una partida.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/games`, {
        name: nombre,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const gameId = response.data.game.id;
      navigate(`/waiting-room/${gameId}`); 
    } catch (error) {
      setMensaje("Error al crear la partida.");
    }
  };

  return (
    <div className="landing-container">
      <div className="card">
        <h2 className="crear-titulo">Crear nueva partida</h2>
        <form onSubmit={handleSubmit} className="crear-formulario">
          <label htmlFor="nombre">Crea el nombre de la partida</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Aventura Patagónica"
            required
          />
          <button type="submit">Crear</button>
        </form>
        {mensaje && <p className="crear-mensaje">{mensaje}</p>}
      </div>
    </div>
  );
}
