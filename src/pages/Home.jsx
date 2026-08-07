import { Link } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

function Home() {
  const { playerName, setPlayerName } = usePlayer();

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        textAlign: "center",
        fontFamily: "Arial",
      }}
    >
      <h1>🎮 GameHub</h1>

      <h3>Developer: Ethan</h3>

      <div style={{ marginTop: "30px" }}>
        <label>Player Name</label>

        <br />

        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
          style={{
            padding: "10px",
            width: "250px",
            marginTop: "10px",
          }}
        />
      </div>

      <h2 style={{ marginTop: "40px" }}>Games</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
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

        <Link to="/treasure">
          <button>Treasure Hunt</button>
        </Link>
        </div>
    </div>
  );
}

export default Home;
