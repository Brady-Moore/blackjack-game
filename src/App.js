import Game from "./components/Game";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h2 className="title" tabIndex="0">
        Blackjack
      </h2>
      <Game />
    </div>
  );
}

export default App;
