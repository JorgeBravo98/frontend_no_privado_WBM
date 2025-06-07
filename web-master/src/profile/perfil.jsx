import { useState } from "react"

export default function Perfil() {

    const [nombre, setNombre] = useState(null)

    function handleChange(nombre){
        setNombre(nombre);
    }
    return (
        <>
        <h2> Mi primer componente! </h2>
        <input 
            onChange={e => handleChange(e.target.value)}
            placeholder="Escribe tu nombre"
        />
        <p>Bienvenido, { nombre }</p>
        </>
    )
}