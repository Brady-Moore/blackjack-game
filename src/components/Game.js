import React, { useState, useEffect } from "react";
import Hand from "./Hand";
import Controls from "./Controls";

const suits = ["♠", "♣", "♥", "♦"];
const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

const deck = [];

for (let suit of suits) {
  for (let rank of ranks) {
    deck.push(`${rank}${suit}`);
  }
}

const getCardValue = (card) => {
  const faceValue = card.slice(0, -1);
  if (["K", "Q", "J"].includes(faceValue)) return 10;
  if (faceValue === "A") return 11; // Initially treat Ace as 11
  return parseInt(faceValue, 10);
};

// Function to calculate the total value of a hand, handling Aces as 1 or 11
const calculateHandValue = (hand) => {
  let total = 0;
  let aces = 0;

  hand.forEach((card) => {
    const value = getCardValue(card);
    if (value === 11) aces += 1;
    total += value;
  });

  // Adjust for Aces if total is greater than 21
  while (total > 21 && aces > 0) {
    total -= 10; // Convert an Ace from 11 to 1
    aces -= 1;
  }

  return total;
};

const shuffleDeck = (deck) => [...deck].sort(() => Math.random() - 0.5);

const Game = () => {
  const [shuffledDeck, setShuffledDeck] = useState(shuffleDeck(deck));
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    // Deal initial hands
    startNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startNewGame = () => {
    const newDeck = shuffleDeck(deck);
    setShuffledDeck(newDeck);
    setPlayerHand([newDeck[0], newDeck[1]]);
    setDealerHand([newDeck[2], newDeck[3]]);
    setGameOver(false);
    setWinner("");
  };

  const hit = () => {
    const nextCardIndex = playerHand.length + dealerHand.length;
    if (nextCardIndex < shuffledDeck.length) {
      const newCard = shuffledDeck[nextCardIndex];
      setPlayerHand([...playerHand, newCard]);
      // Check if player busts after hitting
      const newPlayerTotal = calculateHandValue([...playerHand, newCard]);
      if (newPlayerTotal > 21) {
        setWinner("Dealer wins! Player busted.");
        setGameOver(true);
      }
    }
  };

  const stand = () => {
    // Simulate dealer's turn and decide winner
    let updatedDealerHand = [...dealerHand];
    let dealerTotal = calculateHandValue(updatedDealerHand);

    // Dealer hits until total is at least 17
    while (dealerTotal < 17) {
      const nextCardIndex = playerHand.length + updatedDealerHand.length;
      if (nextCardIndex >= shuffledDeck.length) break; // Prevent out-of-bounds
      const nextCard = shuffledDeck[nextCardIndex];
      updatedDealerHand.push(nextCard);
      dealerTotal = calculateHandValue(updatedDealerHand);
    }

    setDealerHand(updatedDealerHand);
    determineWinner(playerHand, updatedDealerHand);
  };

  const determineWinner = (player, dealer) => {
    const playerTotal = calculateHandValue(player);
    const dealerTotal = calculateHandValue(dealer);

    if (playerTotal > 21) {
      setWinner("Dealer wins! Player busted.");
    } else if (dealerTotal > 21) {
      setWinner("Player wins! Dealer busted.");
    } else if (playerTotal > dealerTotal) {
      setWinner("Player wins!");
    } else if (dealerTotal > playerTotal) {
      setWinner("Dealer wins!");
    } else {
      setWinner("It's a tie!");
    }
    setGameOver(true);
  };

  const playerTotal = calculateHandValue(playerHand);
  const dealerTotal = calculateHandValue(dealerHand);

  return (
    <div className="game-container">
      <Hand
        title="Dealer"
        cards={dealerHand}
        total={dealerTotal}
        hideTotal={!gameOver}
      />
      <div className="result-container">
        {gameOver && (
          <p className="winner" aria-live="polite">
            {winner}
          </p>
        )}
      </div>

      <Hand title="Player" cards={playerHand} total={playerTotal} />
      <Controls
        gameOver={gameOver}
        hit={hit}
        stand={stand}
        startNewGame={startNewGame}
      />
    </div>
  );
};

export default Game;
