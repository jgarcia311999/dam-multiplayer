import { useState } from "react";
import Button from "../components/Button";

export default function CreateRoom() {
  const [roomId, setRoomId] = useState("");

  const handleCreateRoom = () => {
    // Aquí irá la lógica real para crear una sala y generar un ID
    const newRoomId = Math.random().toString(36).substr(2, 6).toUpperCase();
    setRoomId(newRoomId);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#222", color: "#fff" }}>
      <h2>Crea una sala nueva</h2>
      <Button onClick={handleCreateRoom}>Generar código de sala</Button>
      {roomId && (
        <div style={{ marginTop: 32, fontSize: 28 }}>
          Código de la sala: <strong>{roomId}</strong>
        </div>
      )}
    </div>
  );
}