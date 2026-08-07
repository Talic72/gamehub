export function StartGameButton({ disabled, onStart }) {
  return (
    <div className="game-actions">
      <button
        id="start-game"
        type="button"
        disabled={disabled}
        onClick={onStart}
      >
        Start Game
      </button>
    </div>
  );
}