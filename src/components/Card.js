import React from "react";

const Card = ({ card }) => (
  <div className="card" role="img" aria-label={`Card: ${card}`}>
    {card}
  </div>
);

export default Card;
