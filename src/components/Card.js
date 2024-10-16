import React from "react";

const Card = ({ card }) => {
  const value = card.slice(0, -1);
  const suit = card.slice(-1);
  const isRed = suit === "♥" || suit === "♦";

  return (
    <div className="card" role="img" aria-label={`Card: ${value} of ${suit}`}>
      <div className={`card-corner top-left ${isRed ? "red" : ""}`}>
        <span className="card-value">{value}</span>
        <span className="card-suit">{suit}</span>
      </div>
      <div className={`card-corner bottom-right ${isRed ? "red" : ""}`}>
        <span className="card-value">{value}</span>
        <span className="card-suit">{suit}</span>
      </div>
    </div>
  );
};

export default Card;
