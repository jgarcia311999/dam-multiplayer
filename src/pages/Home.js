import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinRoom } from "../utils/firebaseTest";

const Home = () => {
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    setError("");

    if (roomCode.trim() === "" || playerName.trim() === "") {
      setError("Por favor, introduce el código de sala y tu nombre.");
      return;
    }

    try {
      const success = await joinRoom(roomCode.trim().toUpperCase(), playerName.trim());
      if (success) {
        navigate(`/room/${roomCode.trim().toUpperCase()}`);
      } else {
        setError("No existe ninguna sala con ese código.");
      }
    } catch (err) {
      setError("Error al unirse a la sala. Inténtalo de nuevo.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
      <h1>¡Bienvenido a D.A.M Multiplayer!</h1>
      <form onSubmit={handleJoin}>
        <input
          type="text"
          placeholder="Introduce el código de sala"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          style={{ padding: "10px", width: "80%", marginTop: 20, textTransform: 'uppercase' }}
        />
        <br />
        <input
          type="text"
          placeholder="Introduce tu nombre"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          style={{ padding: "10px", width: "80%", marginTop: 20 }}
        />
        <br />
        <button
          type="submit"
          style={{
            marginTop: 20,
            padding: "10px 30px",
            background: "#333",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Entrar en la sala
        </button>
      </form>
      {error && (
        <div style={{ color: "red", marginTop: 20 }}>{error}</div>
      )}
    </div>
  );
};

export default Home;