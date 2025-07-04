// Busca una sala por su código
import { db } from "./firebaseConfig"; // Asegúrate que tienes la instancia exportada
import { collection, query, where, getDocs } from "firebase/firestore";

export const buscarSalaPorCodigo = async (code) => {
  const salasRef = collection(db, "salas");
  const q = query(salasRef, where("code", "==", code));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Devuelve el primer match (debería ser único)
    return {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    };
  } else {
    return null; // No existe la sala
  }
};