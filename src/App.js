import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JoinGame from './pages/JoinGame';
import GameRoom from './pages/GameRoom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JoinGame />} />
        <Route path="/join" element={<JoinGame />} />
        <Route path="/game/:sala" element={<GameRoom />} />
      </Routes>
    </Router>
  );
};

export default App;