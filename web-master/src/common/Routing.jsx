import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Instructions from '../game/instructions';
import App from './App';
import Board from '../game/Board';
import Registro from '../profile/Registro';
import Login from '../profile/Login';
import Nosotros from './nosotros';
import CrearPartida from '../game/CrearPartida';
import WaitingRoom from "../game/WaitingRoom";
import UnirsePartida from "../game/UnirsePartida";
import PartidasExistentes from '../game/PartidasExistentes';
import Perfil from '../profile/perfil';
import Navbar from './nav';

function Routing() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/instructions' element={<Instructions />} />
                <Route path='/nosotros' element={<Nosotros />} />
                <Route path='/registro' element={<Registro />} />
                <Route path='/login' element={<Login />} />
                <Route path='/crear' element={<CrearPartida />} />
                <Route path='/waiting-room/:id' element={<WaitingRoom />} />
                <Route path='/board/:id' element={<Board />} />
                <Route path='/unirse' element={<UnirsePartida />} />
                <Route path='/mis-partidas' element={<PartidasExistentes />} />
                <Route path='/perfil' element={<Perfil />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
