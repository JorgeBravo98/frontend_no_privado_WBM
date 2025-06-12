import { useEffect, useState } from "react";
import axios from "axios";
import "../common/App.css";
import { useNavigate } from "react-router-dom";

export default function PartidasExistentes() {
  const [partidas, setPartidas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMensaje("Debes iniciar sesión para ver tus partidas.");
      return;
    }

    const fetchPartidas = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/games/user/my`, // asegúrate que esta ruta exista en tu backend
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPartidas(response.data.games); // ajusta si el backend usa otro nombre
      } catch (error) {
        setMensaje("Error al cargar las partidas.");
      }
    };

    fetchPartidas();
  }, []);

  const handleIrSala = (id) => {
    navigate(`/waiting-room/${id}`);
  };

  return (
    <div className="partidas-container">
      <h2>Mis Partidas</h2>
      {mensaje && <p>{mensaje}</p>}
      <ul>
        {Array.isArray(partidas) && partidas.length > 0 ? (
          partidas.map((partida) => (
            <li key={partida.id}>
              <strong>{partida.name}</strong> - ID: {partida.id}
              <button onClick={() => handleIrSala(partida.id)}>Ir a Sala</button>
            </li>
          ))
        ) : !mensaje ? (
          <p>No estás unido a ninguna partida.</p>
        ) : null}
      </ul>
    </div>
  );
}
