import React from "react";

const PlayerList = ({ players }) => (
  <div style={{ margin: "16px 0" }}>
    <h4>Jugadores en la sala:</h4>
    <ul>
      {players && players.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  </div>
);

export default PlayerList;