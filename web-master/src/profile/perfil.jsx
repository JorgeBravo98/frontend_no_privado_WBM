import React, { useState, useEffect } from "react";
import axios from "axios";
import "./estilos.css";
import "../common/App.css";
import { Link, useNavigate } from "react-router-dom";


import avatar1 from "./avatar1.png";
import avatar2 from "./avatar2.png";
import avatar3 from "./avatar3.png";
import avatar4 from "./avatar4.png";

export default function Perfil() {
  const navigate = useNavigate();
  const [avatarSeleccionado, setAvatarSeleccionado] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [name, setName] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); 
  const avatares = [avatar1, avatar2, avatar3, avatar4];

  const validarEmail = (email) => {
    return email.includes("@");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const user = response.data;
        setName(user.name);
        setEmail(user.mail);
        setAvatarSeleccionado(user.avatar);
      } catch (error) {
        console.error("Error al cargar usuario", error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!validarEmail(email)) {
        setErrorEmail("El correo debe contener '@'");
        valid = false;
    } else {
        setErrorEmail("");
    }

    if (password !== confirmPassword) {
        setErrorPass("Las contraseñas no coinciden");
        valid = false;
    } else {
        setErrorPass("");
    }

    if (!valid) return;

    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
        name,
        mail: email,
        password: password || undefined,
        avatar: avatarSeleccionado || null,
        }, {
        headers: { Authorization: `Bearer ${token}` }
        });

        setTipoMensaje("exito");
        setMensaje("¡Datos actualizados con éxito!");
        window.dispatchEvent(new Event("authChange"));
        setTimeout(() => navigate("/"), 1500);
    } catch (error) {
        setTipoMensaje("error");
        setMensaje("Error al actualizar usuario.");
    }
};


  return (
    <div className="registro-container">
      <div className="registro-card">
        <div className="registro-izquierda">
          <div>
            <h1 className="registro-titulo">100 Pasos por Chile </h1>
            <p className="registro-descripcion">
              ¡Actualiza tus datos para tener la mejor experiencia!
            </p>
          </div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Flag_of_Chile.svg/512px-Flag_of_Chile.svg.png"
            alt="Chilito"
            className="registro-imagen"
          />
        </div>

        <div className="registro-derecha">
          <h2 className="registro-formulario-titulo">Registro</h2>
          <form className="registro-formulario" onSubmit={handleSubmit}>
            <div className="registro-campo">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="registro-campo">
              <label>Correo electrónico</label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errorEmail && <p className="error">{errorEmail}</p>}
            </div>
            <div className="registro-campo">
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="Contraseña segura"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="registro-campo">
              <label>Confirmar contraseña</label>
              <input
                type="password"
                placeholder="Repetir contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errorPass && <p className="error">{errorPass}</p>}
            </div>
            <div className="registro-campo">
              <label>Elige tu avatar</label>
              <div className="registro-avatares">
                {avatares.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Avatar ${index + 1}`}
                    className={`registro-avatar ${
                      avatarSeleccionado === src ? "seleccionado" : ""
                    }`}
                    onClick={() => setAvatarSeleccionado(src)}
                  />
                ))}
              </div>
            </div>
            {mensaje && (
              <div className={`mensaje-frontend ${tipoMensaje}`}>
                {mensaje}
              </div>
            )}
            <button type="submit">Actualizar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
