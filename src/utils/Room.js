import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../utils/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

export default function Room() {
  const { roomCode } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomCode) return;

    const docRef = doc(db, "salas", roomCode);

    // Escucha cambios en la sala en tiempo real
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setRoomData(docSnap.data());
      } else {
        setRoomData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [roomCode]);

  if (loading) return <p>Cargando sala...</p>;

  if (!roomData) return <p>No existe la sala con código {roomCode}</p>;

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "auto", textAlign: "center" }}>
      <h2>Sala: {roomCode}</h2>
      {!roomData.started ? (
        <p>Esperando a que el anfitrión empiece el juego...</p>
      ) : (
        <p>
          Número generado: <strong>{roomData.randomNumber}</strong>
        </p>
      )}
    </div>
  );
}