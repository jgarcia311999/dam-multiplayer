import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA62Ad-q47xEo8Qhw1zj98MbfDRZCjqlm0",
  authDomain: "dam-multiplayer.firebaseapp.com",
  projectId: "dam-multiplayer",
  storageBucket: "dam-multiplayer.appspot.com",  // Corrige el nombre aquí
  messagingSenderId: "980594721900",
  appId: "1:980594721900:web:d8995100eb79a65a564449"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exporta la instancia de Firestore
export const db = getFirestore(app);