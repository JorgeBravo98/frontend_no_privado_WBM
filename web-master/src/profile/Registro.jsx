import React, { useState } from "react";
import axios from "axios";
import "./estilos.css";
import "../common/App.css";

import avatar1 from "./avatar1.png";
import avatar2 from "./avatar2.png";
import avatar3 from "./avatar3.png";
import avatar4 from "./avatar4.png";

export default function Registro() {
  const [avatarSeleccionado, setAvatarSeleccionado] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [name, setName] = useState("");

  const avatares = [avatar1, avatar2, avatar3, avatar4];

  const validarEmail = (email) => {
    return email.includes("@");
  };

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
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {

        name,
        mail: email,
        password,
        avatar: avatarSeleccionado || null,
        date: null, // podrías agregar un campo para esto
        type: null
      });

      alert("Registro exitoso: " + response.data.message);
    } catch (error) {
      if (error.response) {
        alert("Error: " + error.response.data.error);
      } else {
        alert("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <div className="registro-izquierda">
          <div>
            <h2 className="registro-subtitulo">Bienvenido a</h2>
            <h1 className="registro-titulo">100 Pasos por Chile </h1>
            <p className="registro-descripcion">
              ¡Crea una cuenta para unirte a nuestra comunidad de gamers!
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

            <button type="submit">Crear cuenta</button>
          </form>

          <p className="registro-login-link">
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
}
