import { Routes, Route, Link } from "react-router-dom";
import { usePlayer } from "./context/PlayerContext";
import Home from "./pages/Home";
import RockPaperScissors from "./pages/RockPaperScissors";
import TicTacToe from "./pages/TicTacToe";
import Wordle from "./pages/Wordle";
import TreasureHunt from "./games/TreasureHunt/TreasureHunt";

function Placeholder({ title }) {
  const { playerName } = usePlayer();

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <h1>{title}</h1>

      <h3>Player: {playerName || "No Player"}</h3>

      <Link to="/">
        <button>Back to Hub</button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rps" element={<RockPaperScissors />} />
      <Route path="/tictactoe" element={<TicTacToe />} />
      <Route path="/wordle" element={<Wordle />} />
      <Route path="/treasure" element={<TreasureHunt />} />
    </Routes>
  );
}

export default App;