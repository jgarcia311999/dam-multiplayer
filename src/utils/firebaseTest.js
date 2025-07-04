import { db } from "./firebaseConfig";
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";

export const buscarSalaPorCodigo = async (code) => {
  const salasRef = collection(db, "salas");
  const q = query(salasRef, where("code", "==", code));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    };
  } else {
    return null;
  }
};

// Nueva función para unirse a la sala y añadir jugador
export const joinRoom = async (code, playerName) => {
  const sala = await buscarSalaPorCodigo(code);
  if (!sala) return false;

  const salaRef = doc(db, "salas", sala.id);
  try {
    await updateDoc(salaRef, {
      jugadores: arrayUnion(playerName)
    });
    return true;
  } catch (error) {
    console.error("Error uniendo jugador a sala:", error);
    return false;
  }
};