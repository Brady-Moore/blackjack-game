import Game from "./components/Game";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="title" tabIndex="0">
        Blackjack
      </h1>
      <Game />
    </div>
  );
}

export default App;
