import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    if (roomCode.trim() !== "") {
      navigate(`/room/${roomCode}`);
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
    </div>
  );
};

export default Home;