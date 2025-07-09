import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { doc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const GameRoom = () => {
  const { sala } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const nombreJugador = query.get('nombre');

  const [frase, setFrase] = useState('');
  const [jugadores, setJugadores] = useState([]);
  const [error, setError] = useState('');
  const [votado, setVotado] = useState('');
  const [votoEnviado, setVotoEnviado] = useState(false);

  useEffect(() => {
    const salaRef = doc(db, 'salas', sala);
    const unsub = onSnapshot(salaRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setFrase(data.fraseActual);
        setVotado('');
        setVotoEnviado(false);
        setJugadores(data.jugadores || []);
      } else {
        setError('La sala no existe.');
      }
    }, (err) => {
      console.error(err);
      setError('Error al obtener datos.');
    });

    return () => unsub();
  }, [sala]);

  const votar = async (jugador) => {
    if (!jugador || votoEnviado) return;
    try {
      const salaRef = doc(db, 'salas', sala);
      await updateDoc(salaRef, {
        [`votos.${jugador}`]: increment(1),
      });
      setVotoEnviado(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sala: {sala}</h2>
        <p style={styles.phrase}>{frase}</p>

        {jugadores.map((j) => (
          <button
            key={j}
            onClick={() => setVotado(j)}
            disabled={votoEnviado}
            style={{
              ...styles.voteButton,
              backgroundColor: votado === j ? '#2ecc71' : 'rgba(0,100,0,0.5)',
              opacity: votoEnviado ? 0.6 : 1,
              borderColor: votado === j ? '#27ae60' : 'green',
            }}
          >
            {j}
          </button>
        ))}

        {jugadores.length > 0 && (
          <button
            onClick={() => votar(votado)}
            disabled={!votado || !!error || votoEnviado}
            style={{
              marginTop: '20px',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#3498db',
              color: '#fff',
              cursor: !votado || !!error || votoEnviado ? 'not-allowed' : 'pointer',
              opacity: !votado || !!error || votoEnviado ? 0.5 : 1,
            }}
          >
            Enviar voto
          </button>
        )}

        {votoEnviado && (
          <p style={{ color: '#ccc', textAlign: 'center' }}>
            Esperando al anfitrión...
          </p>
        )}

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    overflowX: 'hidden',
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
  },
  phrase: {
    color: '#ddd',
    fontSize: '18px',
    textAlign: 'center',
    margin: '10px 0',
  },
  voteButton: {
    padding: '12px',
    border: '2px solid green',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '16px',
    margin: '5px',
    cursor: 'pointer',
    backgroundColor: 'rgba(0,100,0,0.5)',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default GameRoom;