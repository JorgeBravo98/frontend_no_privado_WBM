import React, { useState } from "react";
import "./estilos.css";
import "../common/App.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const validarEmail = (correo) => correo.includes("@");

  const handleSubmit = (e) => {
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

    if (valido) {
      // Aquí iría la lógica real de login
      alert("Inicio de sesión exitoso");
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
            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            alt="Gaming Icon"
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
