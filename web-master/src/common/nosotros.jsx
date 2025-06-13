import "./App.css";
import "./nosotros.css";
import nicoImg from "../assets/nico.jpg";
import jorgeImg from "../assets/Jorge.jpg";
import baltaImg from "../assets/balta.jpeg";

export default function Nosotros() {
  return (
    <div className="nosotros-container">
      <h1 className="nosotros-titulo">Sobre Nosotros</h1>
      <p className="nosotros-descripcion">
        Somos el equipo <b>WebMasters</b>, grupo de estudiantes de Ingenieria, apasionados por la tecnología y la entretención.
        Creamos esta plataforma para generar una instancia entretetenida en la cual puedes enfrentarte a tu familia o amigos con la mejor temática, desde cualquier lugar de nuestro lindo país.
      </p>
      <div className="nosotros-equipo">
        <div className="nosotros-miembro">
          <img
            src={nicoImg}
            alt="Nicolás Vial"
            className="nosotros-foto"
          />
          <h3>Nicolás Vial</h3>
          <p>Desarrollador Frontend.</p>
        </div>
        <div className="nosotros-miembro">
          <img
            src={jorgeImg}
            alt="Miembro 2"
            className="nosotros-foto"
          />
          <h3>Jorge Bravo</h3>
          <p>Desarrollador Backend. </p>
        </div>
        <div className="nosotros-miembro">
          <img
            src={baltaImg}
            alt="Balta"
            className="nosotros-foto"
          />
          <h3>Baltazar Pieber</h3>
          <p>Full Stack. </p>
        </div>
      </div>
    </div>
  );
}
