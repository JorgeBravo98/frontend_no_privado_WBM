import React from "react";
import tableroImg from "../assets/tablero.png";
import "./showboard.css";

export default function ShowBoard() {
  return (
    <div className="showboard-container">
      <img
        src={tableroImg}
        alt="Imagen Tablero"
        className="showboard-image"
      />
    </div>
  );
}
