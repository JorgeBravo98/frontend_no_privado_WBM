
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./estilos.css";
import "../common/App.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); 

  const navigate = useNavigate();

  const validarEmail = (correo) => correo.includes("@");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); 
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valido = true;

    if (!email) {
      setErrorEmail("El correo es obligatorio");
      valido = false;
    } else if (!validarEmail(email)) {
      setErrorEmail("El correo debe contener '@'");
      valido = false;
    } else {
      setErrorEmail("");
    }

    if (!password) {
      setErrorPassword("La contraseña es obligatoria");
      valido = false;
    } else {
      setErrorPassword("");
    }

    if (!valido) return;

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        mail: email,
        password,
      });

      const { token } = response.data;

      setTipoMensaje("exito");
      setMensaje("¡Inicio de sesión exitoso!");
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("authChange"));
      setTimeout(() => navigate("/"), 1200); 

    } catch (error) {
      setTipoMensaje("error");
      if (error.response && error.response.data && error.response.data.error) {
        setMensaje("Error: " + error.response.data.error);
      } else {
        setMensaje("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <div className="registro-izquierda">
          <div>
            <h2 className="registro-subtitulo">Bienvenido a</h2>
            <h1 className="registro-titulo">100 Pasos por Chile</h1>
            <p className="registro-descripcion">
              ¡Inicia sesión para continuar explorando juegos!
            </p>
          </div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Flag_of_Chile.svg/512px-Flag_of_Chile.svg.png"
            alt="Chilito"
            className="registro-imagen"
          />
        </div>

        <div className="registro-derecha">
          <h2 className="registro-formulario-titulo">Iniciar Sesión</h2>
          <form className="registro-formulario" onSubmit={handleSubmit}>
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
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errorPassword && <p className="error">{errorPassword}</p>}
            </div>

            {mensaje && (
              <div className={`mensaje-frontend ${tipoMensaje}`}>
                {mensaje}
              </div>
            )}

            <button type="submit">Ingresar</button>
          </form>

          <p className="registro-login-link">
            ¿Aún no tienes una cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
