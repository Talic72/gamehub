import { useEffect, useState } from "react";

import { LobbyView } from "../games/RockPaperScissors/components/Lobby";
import { GameView } from "../games/RockPaperScissors/components/Game";

import { loadSettings } from "../games/RockPaperScissors/logic/settings";

import { usePlayer } from "../context/PlayerContext";

import "../games/RockPaperScissors/App.css";

function RockPaperScissors() {
  const { playerName } = usePlayer();

  const [settings, setSettings] = useState(() => {
    const saved = loadSettings();

    return {
      ...saved,
      name: playerName || saved?.name || "",
    };
  });

  const [currentPage, setCurrentPage] = useState("lobby");

  useEffect(() => {
    if (playerName) {
      setSettings((prev) => ({
        ...prev,
        name: playerName,
      }));
    }
  }, [playerName]);

  const currentTheme = settings?.darkMode ? "theme-dark" : "theme-light";

  return (
    <main className={currentTheme}>
      <h1>Rock Paper Scissors</h1>

      {currentPage === "lobby" ? (
        <LobbyView
          settings={settings}
          setSettings={setSettings}
          onStart={() => setCurrentPage("game")}
        />
      ) : (
        <GameView settings={settings} />
      )}
    </main>
  );
}

export default RockPaperScissors;