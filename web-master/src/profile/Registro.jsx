
import React, { useState } from "react";
import axios from "axios";
import "./estilos.css";
import "../common/App.css";
import { useNavigate } from "react-router-dom";
import avatar1 from "../assets/avatar/avatar1.png";
import avatar2 from "../assets/avatar/avatar2.png";
import avatar3 from "../assets/avatar/avatar3.png";
import avatar4 from "../assets/avatar/avatar4.png";

export default function Registro() {
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
      // 1. Crear usuario
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
        name,
        mail: email,
        password,
        avatar: avatarSeleccionado || null,
        date: null,
        type: null
      });

      // 2. Iniciar sesión automáticamente
      const loginResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        mail: email,
        password
      });

      const { token } = loginResponse.data;
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("authChange"));
      setTipoMensaje("exito");
      setMensaje("¡Registro exitoso! Bienvenido a 50 Pasos por Chile.");
      setTimeout(() => navigate("/"), 1500);

    } catch (error) {
      setTipoMensaje("error");
      if (error.response?.data?.error) {
        setMensaje("Error: " + error.response.data.error);
      } else {
        setMensaje("Error de conexión con el servidor");
      }
    }
  }
  
  return (
    <div className="registro-container">
      <div className="registro-card">
        <div className="registro-izquierda">
          <div>
            <h2 className="registro-subtitulo">Bienvenido a</h2>
            <h1 className="registro-titulo">50 Pasos por Chile </h1>
            <p className="registro-descripcion">
              ¡Crea una cuenta para unirte a nuestra comunidad chilena!
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
