import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { joinRoom } from "../utils/firebaseTest"; // importa tu helper para Firestore

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    setError("");

    if (!roomCode.trim() || !playerName.trim()) {
      setError("Introduce código de sala y tu nombre.");
      return;
    }

    try {
      const exists = await joinRoom(roomCode.trim().toUpperCase(), playerName.trim());
      if (exists) {
        localStorage.setItem("playerName", playerName.trim());
        navigate(`/room/${roomCode.trim().toUpperCase()}`);
      } else {
        setError("No existe ninguna sala con ese código.");
      }
    } catch (err) {
      setError("Error al intentar unirse a la sala. Inténtalo más tarde.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 400, margin: "auto" }}>
      <h2>Unirse a una sala</h2>
      <input
        type="text"
        placeholder="Código de sala"
        value={roomCode}
        onChange={e => setRoomCode(e.target.value.toUpperCase())}
        style={{ marginBottom: 12, width: "100%", textTransform: "uppercase" }}
      />
      <input
        type="text"
        placeholder="Tu nombre"
        value={playerName}
        onChange={e => setPlayerName(e.target.value)}
        style={{ marginBottom: 12, width: "100%" }}
      />
      <Button onClick={handleJoin}>Entrar</Button>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
};

export default JoinRoom;