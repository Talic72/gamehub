import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import words from "./words";
import "./Wordle.css";

function Wordle() {
  const { playerName } = usePlayer();

  const emptyBoard = Array(6)
    .fill(null)
    .map(() => Array(5).fill(""));

  const emptyColors = Array(6)
    .fill(null)
    .map(() => Array(5).fill(""));

  const [board, setBoard] = useState(emptyBoard);
  const [colors, setColors] = useState(emptyColors);

  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);

  const [targetWord, setTargetWord] = useState("");

  const [message, setMessage] = useState("");

  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const random =
      words[Math.floor(Math.random() * words.length)];

    setTargetWord(random.toUpperCase());

    console.log(random);
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (gameOver) return;

      const key = e.key.toUpperCase();

      if (/^[A-Z]$/.test(key)) {
        addLetter(key);
      }

      if (e.key === "Backspace") {
        deleteLetter();
      }

      if (e.key === "Enter") {
        submitGuess();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [board, row, col, gameOver]);

    function addLetter(letter) {
    if (col >= 5) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = letter;

    setBoard(newBoard);
    setCol(col + 1);
  }

  function deleteLetter() {
    if (col === 0) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col - 1] = "";

    setBoard(newBoard);
    setCol(col - 1);
  }

  function checkGuess(guess) {
  const result = Array(5).fill("incorrect");

  const target = targetWord.split("");
  const guessLetters = guess.split("");

  
  const used = Array(5).fill(false);

  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === target[i]) {
      result[i] = "correct";
      used[i] = true;
      guessLetters[i] = null;
    }
  }
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === null) continue;

    for (let j = 0; j < 5; j++) {
      if (!used[j] && guessLetters[i] === target[j]) {
        result[i] = "misplaced";
        used[j] = true;
        break;
      }
    }
  }

  return result;
}

  async function submitGuess() {
  if (col !== 5) {
    setMessage("Word must be 5 letters.");
    return;
  }

  const guess = board[row].join("").toUpperCase();

 
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${guess.toLowerCase()}`
    );

    if (!response.ok) {
      setMessage("Not in word list.");
      return;
    }
  } catch (error) {
    console.error(error);
    setMessage("Could not check word.");
    return;
  }

  
  const result = checkGuess(guess);

  const newColors = colors.map((r) => [...r]);

  for (let i = 0; i < 5; i++) {
    newColors[row][i] = result[i];
  }

  setColors(newColors);


  if (result.every((status) => status === "correct")) {
    setMessage("You Win!");
    setGameOver(true);
    return;
  }

 
  if (row === 5) {
    setMessage(`Game Over! Word was ${targetWord}`);
    setGameOver(true);
    return;
  }

  setRow(row + 1);
  setCol(0);
  setMessage("");
}
function resetGame() {
  setBoard(
    Array(6)
      .fill(null)
      .map(() => Array(5).fill(""))
  );

  setColors(
    Array(6)
      .fill(null)
      .map(() => Array(5).fill(""))
  );

  setRow(0);
  setCol(0);
  setMessage("");
  setGameOver(false);

  const random =
    words[Math.floor(Math.random() * words.length)];

  setTargetWord(random.toUpperCase());
}

  return (
    <div className="wordle-container">
      <h1>Wordle</h1>

      <h3>Player: {playerName || "Guest"}</h3>

      {message && <h2>{message}</h2>}

      <div id="wordle-grid">
        {board.map((boardRow, rowIndex) =>
          boardRow.map((letter, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`letter ${colors[rowIndex][colIndex]}`}
            >
              {letter}
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={resetGame}>
          New Game
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to="/">
          <button>Back to Hub</button>
        </Link>
      </div>
    </div>
  );
}

export default Wordle;
