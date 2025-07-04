import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    // Aquí deberías validar/cargar sala desde backend en el futuro
    if (roomCode && playerName) {
      // Guarda en local (simulación de login a sala)
      localStorage.setItem("playerName", playerName);
      navigate(`/room/${roomCode}`);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Unirse a una sala</h2>
      <input
        type="text"
        placeholder="Código de sala"
        value={roomCode}
        onChange={e => setRoomCode(e.target.value.toUpperCase())}
        style={{ marginBottom: 12, width: "100%" }}
      />
      <input
        type="text"
        placeholder="Tu nombre"
        value={playerName}
        onChange={e => setPlayerName(e.target.value)}
        style={{ marginBottom: 12, width: "100%" }}
      />
      <Button onClick={handleJoin}>Entrar</Button>
    </div>
  );
};

export default JoinRoom;