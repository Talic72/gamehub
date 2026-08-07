import { useState } from "react";
import { Link } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

function TicTacToe() {
  const { playerName } = usePlayer();

  const emptyBoard = Array(9).fill("");

  const [board, setBoard] = useState(emptyBoard);
  const [xTurn, setXTurn] = useState(true);

  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xTurn ? "X" : "O";

    setBoard(newBoard);
    setXTurn(!xTurn);
  }

  function resetGame() {
    setBoard(emptyBoard);
    setXTurn(true);
  }

const isDraw = !winner && board.every((square) => square !== "");

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        textAlign: "center",
        fontFamily: "Arial",
      }}
    >
      <h1>Tic Tac Toe</h1>

      <h3>Player: {playerName || "Guest"}</h3>

      {winner ? (
        <h2>Winner: {winner}</h2>
        ) : isDraw ? (
        <h2>It's a Draw!</h2>
        ) : (
        <h3>Current Turn: {xTurn ? "X" : "O"}</h3>
        )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,100px)",
          justifyContent: "center",
          gap: "5px",
          marginTop: "30px",
        }}
      >
        {board.map((square, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              fontSize: "2rem",
              cursor: "pointer",
            }}
          >
            {square}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "30px" }}>
        <button onClick={resetGame}>Reset Game</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to="/">
          <button>Back to Hub</button>
        </Link>
      </div>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for (const [a,b,c] of lines) {
    if (
      board[a] && board[a] === board[b] && board[a] === board[c]
    ) 
    {
      return board[a];
    }
  }

  return null;
}

export default TicTacToe;

