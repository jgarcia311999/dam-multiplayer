import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PlayerList from "../components/PlayerList";
import Button from "../components/Button";

const Room = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  // Simula añadir jugador local (solo frontend)
  useEffect(() => {
    const playerName = localStorage.getItem("playerName") || "Jugador";
    setPlayers(prev => {
      if (!prev.includes(playerName)) {
        return [...prev, playerName];
      }
      return prev;
    });
  }, []);

  const handleStart = () => {
    alert("¡Comienza la partida! (Aquí iría la lógica del juego)");
  };

  const handleLeave = () => {
    localStorage.removeItem("playerName");
    navigate("/");
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Sala: {roomCode}</h2>
      <PlayerList players={players} />
      <Button onClick={handleStart}>¡Empezar!</Button>
      <Button onClick={handleLeave} style={{ marginTop: 12, background: "gray" }}>
        Salir
      </Button>
    </div>
  );
};

export default Room;