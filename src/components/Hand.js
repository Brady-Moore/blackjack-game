import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";

const Hand = ({ title, cards, total = undefined, hideTotal = false }) => (
  <section className="hand" aria-label={`${title} hand`}>
    <h2>{title}</h2>
    <div className="cards">
      {cards.map((card, index) => (
        <Card key={card} card={card} />
      ))}
    </div>
    {total !== undefined && !hideTotal && (
      <p className="hand-total" aria-label={`${title} total value is ${total}`}>
        Total: {total}
      </p>
    )}
  </section>
);

Hand.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  total: PropTypes.number,
  hideTotal: PropTypes.bool,
};

export default Hand;
