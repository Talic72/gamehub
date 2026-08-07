import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function Placeholder({ title }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{title}</h1>
      <p>This game is coming soon.</p>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/rps"
        element={<Placeholder title="Rock Paper Scissors" />}
      />
      <Route
        path="/tictactoe"
        element={<Placeholder title="Tic Tac Toe" />}
      />
      <Route path="/wordle" element={<Placeholder title="Wordle" />} />
      <Route path="/memory" element={<Placeholder title="Memory" />} />
    </Routes>
  );
}

export default App;
