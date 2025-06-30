Jorge Bravo
llorllinho
En canal de voz
Aquí empieza el canal Lounge. 
Jorge Bravo — 06/05/2025 12:17
Tipo de archivo adjunto: acrobat
1-s2.0-S0377221719306782-main (2).pdf
1.45 MB
tomascouyoumdjian — 09/05/2025 16:35
PS C:\Users\Tomas\OneDrive - Universidad Católica de Chile\Semestre IX\Capstone\P2\Capstone_entera_mixta> python .\main.py
✅ Datos cargados.
Set parameter Username
Academic license - for non-commercial use only - expires 2026-05-06
Set parameter OutputFlag to value 1
Gurobi Optimizer version 12.0.2 build v12.0.2rc0 (win64 - Windows 11.0 (26100.2))

CPU model: Intel(R) Core(TM) i7-1065G7 CPU @ 1.30GHz, instruction set [SSE2|AVX|AVX2|AVX512]
Thread count: 4 physical cores, 8 logical processors, using up to 8 threads

Optimize a model with 31168 rows, 31349 columns and 216237 nonzeros
Model fingerprint: 0xeafad5f7
Variable types: 899 continuous, 30450 integer (30450 binary)
Coefficient statistics:
  Matrix range     [1e+00, 2e+04]
  Objective range  [7e+04, 2e+07]
  Bounds range     [1e+00, 1e+00]
  RHS range        [1e+00, 2e+04]
Presolve removed 3157 rows and 2552 columns
Presolve time: 0.03s

Explored 0 nodes (0 simplex iterations) in 0.06 seconds (0.05 work units)
Thread count was 1 (of 8 available processors)

Solution count 0

Model is infeasible
Best objective -, best bound -, gap -
No se encontró solución óptima. Estado: 3
Traceback (most recent call last):
  File "C:\Users\Tomas\OneDrive - Universidad Católica de Chile\Semestre IX\Capstone\P2\Capstone_entera_mixta\main.py", line 314, in <module>
    motor  = next((i for i in I_WB if a[i, p, t].Xn > 0.5), None)
  File "C:\Users\Tomas\OneDrive - Universidad Católica de Chile\Semestre IX\Capstone\P2\Capstone_entera_mixta\main.py", line 314, in <genexpr>
    motor  = next((i for i in I_WB if a[i, p, t].Xn > 0.5), None)
                                      ^^^^^^^^^^^^^
  File "src\gurobipy\var.pxi", line 128, in gurobipy._core.Var.getattr
  File "src\gurobipy\var.pxi", line 156, in gurobipy._core.Var.getAttr
  File "src\gurobipy\_attrutil.pyx", line 117, in gurobipy._attrutil._getattr
AttributeError: Unable to retrieve attribute 'Xn'
Nicolas Vial — 09/05/2025 16:42
ε = 1e-4
for i in I_WB:
    for t in T[1:]:
        if t - d >= 1:
            model.addConstr(
                y[i, t] <= (1 - m[i, t - d]) * M + m[i, t - d] * ε,
                name=f"reset_y_uppersoft{i}_{t}"
            )
Jorge Bravo — 09/05/2025 17:07
https://teams.microsoft.com/l/meetup-join/19%3Ameeting_MDNjMDVmYWQtMzMzNS00ODY3LTgwZDgtZmY5MzZhNWU0OGIx%40thread.v2/0?context=%7B"Tid"%3A"5ff5d9fa-f83f-4ac1-a4d2-eb48ea0a00d2"%2C"Oid"%3A"b81718ac-c864-4bfd-b179-2560cef1af95"%7D
Microsoft Teams
Imagen
balta — 09/05/2025 18:10
baltazarpieber
Nicolas Vial — 09/05/2025 18:10
nicolasvialy
Jorge Bravo — 09/05/2025 18:10
JorgeBravo98
tomascouyoumdjian — 09/05/2025 18:10
Couyoumdjian13
Santiago — 09/05/2025 18:11
SantiagoRomo
tomascouyoumdjian — 23/06/2025 20:09
Vamos cabros qlos <3<3
tomascouyoumdjian — 23/06/2025 23:38
Couyoumdjian13
Jorge Bravo — ayer a las 18:38
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Board.css";

export default function Board() {
Expandir
message.txt
8 KB
Jorge Bravo — ayer a las 18:53
const allowedAvatars = ["avatar1", "avatar2", "avatar3", "avatar4"];
                let avatarName;
                if (
                  player.avatar &&
                  !player.avatar.startsWith("http") &&
                  player.avatar.trim() !== ""
                ) {
                  const cleanName = player.avatar
                    .split("/")
                    .pop()
                    .replace(".png", "")
                    .trim();
                  avatarName = allowedAvatars.includes(cleanName) ? cleanName : "avatar1";
                } else {
                  avatarName = "avatar1";
                }
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Board.css";

export default function Board() {
Expandir
message.txt
8 KB
Jorge Bravo — ayer a las 19:15
const allowedAvatars = ["avatar1", "avatar2", "avatar3", "avatar4"];
                let avatarName;
                if (
                  player.avatar &&
                  !player.avatar.startsWith("http") &&
                  player.avatar.trim() !== ""
                ) {
                  const cleanName = player.avatar
                    .split("/")
                    .pop()
                    .replace(".png", "")
                    .trim();
                  avatarName = allowedAvatars.includes(cleanName) ? cleanName : "avatar1";
                } else {
                  avatarName = "avatar1";
                }
Nicolas Vial — 15:52
import "./instructions.css";

export default function Instructions() {
  return (
    <div className="instructions-container">
      <div className="instructions-title-box">
Expandir
message.txt
5 KB
﻿
import "./instructions.css";

export default function Instructions() {
  return (
    <div className="instructions-container">
      <div className="instructions-title-box">
        <h1 className="instructions-title">Instrucciones del Juego</h1>
        <p className="instructions-subtitle">
          Aprende a jugar "50 Pasos por Chile" en simples pasos.
        </p>
      </div>

      <div className="instructions-card">
        <h2 className="section-subtitle">Objetivo del Juego</h2>
        <ul>
          <li>Cada jugador parte en Arica, en el extremo norte del tablero.</li>
          <li>En tu turno, lanza el dado y avanza el número de casillas correspondiente.</li>
          <li>Al avanzar, se activan efectos según la casilla en la que caes.</li>
          <li>Deberas ser estrategico para atacar a tus compañero o enfrentar los problemas!</li>
          <li>El primer jugador en llegar a las Torres del Paine (casilla final) gana.</li>
        </ul>
      </div>

      <div className="instructions-card">
        <h2 className="section-subtitle">Tipos de Casillas</h2>
        <ul>
          <li><strong>Casilla Carretera:</strong> Sin efecto, solo avanzas.</li>
          <li><strong>Casilla de Interrogación:</strong> Robas una carta con efectos positivos o negativos.</li>
          <li><strong>Casilla de Taco:</strong> Retrocede 5 casillas automáticamente.</li>
          <li><strong>Casilla de Funicular:</strong> Avanza 5 casillas adicionales.</li>
        </ul>
      </div>

      <div className="instructions-card">
        <h2 className="section-subtitle">Cartas del Juego</h2>
        <p>Las cartas se obtienen al caer en una casilla especial (Interrogación). Al ocurrir esto te tocara una de las siguientes
           opciones, las cuales podras usarla desde el siguiente turno antes de ejecutar el lanzamiento del dado.</p>
        <ul>
        
          <li><strong>Sopaipilla:</strong> Aplícala y multiplicaras x2 lo que obtengas en tu siguiente tirada de dados.</li>
          <li><strong>Empanada:</strong> Intercambia con otro jugador que tu elijas de posición en el tablero.</li>
          <li><strong>Choripán:</strong> Inhibe durante una ronda la posibilidad de que te lancen una empanada.</li>
        </ul>
        
      </div>

      <div className="instructions-card">
        <h2 className="section-subtitle">Eventos Aleatorios</h2>
        <p>
          Dentro del juego existirán una serie de eventos aleatorios que añaden un componente
          de imprevisibilidad y emoción a cada partida. Estos eventos pueden activarse cada vez
          que un jugador lanza el dado, y tienen la capacidad de afectar tanto al jugador actual
          como al resto de los participantes. A continuación, se presentan los eventos:
        </p>
        <ul>
          <li>
            <strong>Cuarentena Express:</strong> Un brote de virus obliga al jugador actual a entrar en cuarentena 
            por un turno. Durante esa ronda, el jugador no se mueve, pero se recupera automáticamente en el siguiente turno.
            Este evento tiene una probabilidad de ocurrencia del 5% en cada lanzamiento
          </li>
          <li>
            <strong>18 de septiembre:</strong> Después de una intensa celebración de fiestas patrias, el
            jugador que reciba este evento sufre una desorientación tal que vuelve a la
            casilla número 1. Este evento tiene una probabilidad de ocurrencia del 3%. en cada lanzamiento.
          </li>
          <li>
            <strong>Marepoto:</strong> Este es el evento más improbable de todo el juego. Un gran sismo
            sacude el tablero y provoca un maremoto que hace que todos los jugadores
            sean reubicados aleatoriamente en una nueva casilla. Este evento tiene una probabilidad de ocurrencia 
            del 1% pero solo cuando el jugador cae en una casilla "normal".
          </li>
        </ul>
      </div>

      <footer className="instructions-footer">
        <strong>¡Buena suerte en tu travesía por Chile!</strong>
      </footer>
    </div>
  );
}