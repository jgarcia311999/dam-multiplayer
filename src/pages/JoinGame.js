import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

const JoinGame = () => {
  const [nombre, setNombre] = useState('');
  const [sala, setSala] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const testRef = doc(db, 'salas', 'LUL0TJ');
    getDoc(testRef).then((snap) => {
      console.log('TEST sala LUL0TJ existe:', snap.exists());
      if (snap.exists()) {
        console.log('Datos:', snap.data());
      }
    }).catch((err) => {
      console.error('Error test Firebase:', err);
    });
    // Load saved nombre from cookie if exists
    const savedNombre = Cookies.get('nombre');
    if (savedNombre) {
      setNombre(savedNombre);
    }
  }, []);

  useEffect(() => {
    if (nombre) {
      Cookies.set('nombre', nombre, { expires: 7 });
    }
  }, [nombre]);

  const handleJoin = async () => {
    if (!nombre.trim() || !sala.trim()) {
      return setError('Introduce nombre y código de sala');
    }

    const roomCode = sala.trim().toUpperCase();

    try {
      const salaRef = doc(db, 'salas', roomCode);
      const snap = await getDoc(salaRef);

      if (!snap.exists()) {
        return setError('La sala no existe');
      }

      const data = snap.data();
      if ((data.jugadores || []).includes(nombre)) {
        return setError('Ese nombre ya está en uso en esta sala');
      }

      await updateDoc(salaRef, {
        jugadores: arrayUnion(nombre),
      });

      navigate(`/game/${roomCode}?nombre=${encodeURIComponent(nombre)}`);
    } catch (err) {
      console.error(err);
      setError('Error al entrar en la sala');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Unirse a una Sala</h2>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Código de sala"
          value={sala}
          onChange={(e) => setSala(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleJoin} style={styles.button}>
          Entrar
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1e1e1e',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: '10px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    outline: 'none',
    backgroundColor: '#2c2c2c',
    color: '#fff',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default JoinGame;