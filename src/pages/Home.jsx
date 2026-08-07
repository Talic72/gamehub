import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [playerName, setPlayerName] = useState("");

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>GameHub</h1>

      <h3>Developer: Ethan</h3>

      <div style={{ margin: "30px 0" }}>
        <label htmlFor="playerName">Player Name</label>

        <br />

        <input
          id="playerName"
          type="text"
          value={playerName}
          onChange={(event) => setPlayerName(event.target.value)}
          placeholder="Enter your name"
          style={{
            marginTop: "10px",
            padding: "8px",
            width: "250px",
          }}
        />
      </div>

      <h2>Games</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Link to="/rps">
          <button>Rock Paper Scissors</button>
        </Link>

        <Link to="/tictactoe">
          <button>Tic Tac Toe</button>
        </Link>

        <Link to="/wordle">
          <button>Wordle</button>
        </Link>

        <Link to="/memory">
          <button>Memory</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;

