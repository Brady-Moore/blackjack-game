import React from "react";

const Controls = ({ gameOver, hit, stand, startNewGame }) => (
  <div className="controls">
    <button onClick={hit} disabled={gameOver} aria-label="Hit">
      Hit
    </button>
    <button onClick={stand} disabled={gameOver} aria-label="Stand">
      Stand
    </button>
    <button onClick={startNewGame} aria-label="Start new game">
      New Game
    </button>
  </div>
);

export default Controls;
