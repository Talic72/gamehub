import { useState } from "react";
import { MoveButtons } from "./MoveButtons";
import { Scoreboard } from "./Scoreboard";
import { GameHistory } from "./GameHistory";
import { decideWinner, getCpuMove, nextScore } from "../logic/game";
export function GameView({ settings }) {
  const [score, setScore] = useState({
  player: 0,
  cpu: 0,
  ties: 0,
});

  const [history, setHistory] = useState([]);
  const [lastPlayerMove, setLastPlayerMove] = useState(null);
  function handleMove(playerMove) {
    const cpuMove = getCpuMove({
      difficulty: settings?.difficulty,
      lastPlayerMove,
    });

    const winner = decideWinner(playerMove, cpuMove);

    setScore((prev) => nextScore(prev, winner));

    setHistory((prev) => [
      `Player(${playerMove}) vs CPU(${cpuMove}) - ${winner}`,
      ...prev,
    ]);

    setLastPlayerMove(playerMove);
  }
  return (
  <main className="card">
    <header>
      <h2>Rock Paper Scissors</h2>
    </header>

    <div data-testid="greeting">
      Welcome, {settings?.name}!
    </div>

    <p>
      Difficulty:{" "}
      <span id="current-difficulty">{settings?.difficulty}</span>
    </p>

    <Scoreboard score={score} />

    <MoveButtons onMove={handleMove} />

    <GameHistory history={history} />

    <button
      id="reset-game"
      onClick={() => {
        setScore({
          player: 0,
          cpu: 0,
          ties: 0,
        });
        setHistory([]);
        setLastPlayerMove(null);
      }}
    >
      Reset Game
    </button>
  </main>
);
}