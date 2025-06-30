import { BrowserRouter, Routes, Route } from "react-router-dom";
import Instructions from "../game/instructions";
import App from "./App";
import Board from "../game/Board";
import Registro from "../profile/Registro";
import Login from "../profile/Login";
import Nosotros from "./nosotros";
import CrearPartida from "../game/CrearPartida";
import WaitingRoom from "../game/WaitingRoom";
import UnirsePartida from "../game/UnirsePartida";
import PartidasExistentes from "../game/PartidasExistentes";
import Perfil from "../profile/perfil";
import Navbar from "./nav";
import ShowBoard from "./showBoard";
import Result from "../game/Result";
import Historial from "./Historial";

import PrivateRoute from "./PrivateRoute";

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404 - Página no encontrada</h1>
      <p>La ruta que buscaste no existe.</p>
    </div>
  );
}

function Routing() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path='/' element={<App />} />
        <Route path='/instructions' element={<Instructions />} />
        <Route path='/nosotros' element={<Nosotros />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cboard' element={<ShowBoard />}/>

        {/* RUTAS PROTEGIDAS */}
        <Route
          path='/crear'
          element={
            <PrivateRoute>
              <CrearPartida />
            </PrivateRoute>
          }
        />
        <Route
          path='/waiting-room/:id'
          element={
            <PrivateRoute>
              <WaitingRoom />
            </PrivateRoute>
          }
        />
        <Route
          path='/board/:id'
          element={
            <PrivateRoute>
              <Board />
            </PrivateRoute>
          }
        />
        <Route
          path='/unirse'
          element={
            <PrivateRoute>
              <UnirsePartida />
            </PrivateRoute>
          }
        />
        <Route
          path='/mis-partidas'
          element={
            <PrivateRoute>
              <PartidasExistentes />
            </PrivateRoute>
          }
        />
        <Route
          path='/perfil'
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />

        <Route
          path='/result/:id'
          element={
            <PrivateRoute>
              <Result />
            </PrivateRoute>
          }
        />

        <Route
          path='/historial'
          element={
            <PrivateRoute>
              <Historial />
            </PrivateRoute>
          }
        />

        {/* RUTA 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
