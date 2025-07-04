import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarSalaPorCodigo } from "../utils/firebaseTest";

const Home = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    setError("");
    if (roomCode.trim() !== "") {
      const sala = await buscarSalaPorCodigo(roomCode.trim());
      if (sala) {
        navigate(`/room/${roomCode.trim()}`);
      } else {
        setError("No existe ninguna sala con ese código.");
      }
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
          onChange={(e) => setRoomCode(e.target.value)}
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