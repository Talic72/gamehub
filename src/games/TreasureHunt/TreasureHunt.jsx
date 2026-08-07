import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import {
  createRoom,
  getRoom,
  updateRoom,
} from "./api";

function TreasureHunt() {
  const { playerName } = usePlayer();

  const [roomId, setRoomId] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const [gameState, setGameState] = useState(null);

  const [isHost, setIsHost] = useState(false);

  const [message, setMessage] = useState("");

  async function handleCreateRoom() {
    const initialState = {
      treasure: -1,
      guesses: [],
      guessesRemaining: 3,
      winner: null,
      phase: "placing",
    };

    const room = await createRoom(initialState);

    setRoomId(room.roomId);
    setGameState(room.gameState);
    setIsHost(true);
  }

  async function handleJoinRoom() {
    if (!roomCode) return;

    const room = await getRoom(roomCode);

    setRoomId(roomCode);
    setGameState(room.gameState);
    setIsHost(false);
  }

useEffect(() => {
  if (!roomId) return;

  const interval = setInterval(async () => {
    const room = await getRoom(roomId);

    setGameState(room.gameState);

    if (
      isHost &&
      room.gameState.phase === "guessing"
    ) {
      setMessage("Treasure hidden. Waiting for guesses...");
    }

    if (
      room.gameState.phase === "finished"
    ) {
      if (room.gameState.winner) {
        setMessage(
          `${room.gameState.winner} found the treasure!`
        );
      } else {
        setMessage("Game Over");
      }
    }
  }, 1000);

  return () => clearInterval(interval);
}, [roomId, isHost]);

  async function hideTreasure(index) {
    if (!isHost) return;

    if (gameState.phase !== "placing") return;

    const updatedState = {
      ...gameState,
      treasure: index,
      phase: "guessing",
    };

    await updateRoom(roomId, updatedState);

    setGameState(updatedState);

    setMessage(
      "Treasure hidden. Waiting for Player 2."
    );
  }

  function getDistance(a, b) {
    const row1 = Math.floor(a / 4);
    const col1 = a % 4;

    const row2 = Math.floor(b / 4);
    const col2 = b % 4;

    return (
      Math.abs(row1 - row2) +
      Math.abs(col1 - col2)
    );
  }

  async function makeGuess(index) {
    if (isHost) return;

    if (gameState.phase !== "guessing") return;

    if (gameState.guessesRemaining <= 0) return;

    if (index === gameState.treasure) {
      const updatedState = {
        ...gameState,
        winner: playerName,
        phase: "finished",
      };

      await updateRoom(roomId, updatedState);

      setGameState(updatedState);

      setMessage("You found the treasure!");

      return;
    }

    const distance = getDistance(
      index,
      gameState.treasure
    );

    const updatedState = {
      ...gameState,
      guesses: [
        ...gameState.guesses,
        index,
      ],
      guessesRemaining:
        gameState.guessesRemaining - 1,
    };

    if (updatedState.guessesRemaining === 0) {
      updatedState.phase = "finished";
    }

    await updateRoom(roomId, updatedState);

    setGameState(updatedState);

    setMessage(
      `Wrong! Distance: ${distance}`
    );
  }

    return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        textAlign: "center",
        fontFamily: "Arial",
      }}
    >
      <h1>🏴‍☠️ Treasure Hunt</h1>

      <h3>Player: {playerName || "Guest"}</h3>

      {!roomId && (
        <>
          <button onClick={handleCreateRoom}>
            Create Room
          </button>

          <br />
          <br />

          <input
            value={roomCode}
            onChange={(e) =>
              setRoomCode(e.target.value.toUpperCase())
            }
            placeholder="Room Code"
          />

          <button
            onClick={handleJoinRoom}
            style={{ marginLeft: "10px" }}
          >
            Join Room
          </button>
        </>
      )}

      {roomId && (
        <>
          <h2>Room: {roomId}</h2>

          <p>{message}</p>

          {isHost &&
            gameState?.phase === "placing" && (
              <h3>
                Choose a square to hide the
                treasure.
              </h3>
            )}

          {!isHost &&
            gameState?.phase === "guessing" && (
              <h3>
                Find the treasure!
                <br />
                Guesses Remaining:{" "}
                {gameState.guessesRemaining}
              </h3>
            )}

          {gameState?.phase === "finished" && (
            <>
              {gameState.winner ? (
                <h2>
                  🎉 {gameState.winner} found the
                  treasure!
                </h2>
              ) : (
                <h2>
                  Game Over
                </h2>
              )}
            </>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4,80px)",
              gap: "10px",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            {Array.from(
              { length: 16 },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (
                      isHost &&
                      gameState.phase ===
                        "placing"
                    ) {
                      hideTreasure(index);
                    }

                    if (
                      !isHost &&
                      gameState.phase ===
                        "guessing"
                    ) {
                      makeGuess(index);
                    }
                  }}
                  style={{
                    width: "80px",
                    height: "80px",
                    fontSize: "26px",
                    cursor: "pointer",
                  }}
                >
                  {isHost &&
                  gameState?.treasure ===
                    index
                    ? "💰"
                    : gameState?.phase ===
                        "finished" &&
                      gameState?.treasure ===
                        index
                    ? "💰"
                    : "?"
                  }
                </button>
              )
            )}
          </div>

          {!isHost &&
            gameState?.guesses.length >
              0 && (
              <>
                <h3
                  style={{
                    marginTop: "30px",
                  }}
                >
                  Previous Guesses
                </h3>

                {gameState.guesses.map(
                  (guess, i) => (
                    <div key={i}>
                      Square {guess + 1}
                    </div>
                  )
                )}
              </>
            )}
        </>
      )}

      <br />
      <br />

      <Link to="/">
        <button>
          Back to Hub
        </button>
      </Link>
    </div>
  );
}

export default TreasureHunt;

//This file was very hard to code and not have it break