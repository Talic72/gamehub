export function MoveButtons({ onMove }) {
  const moves = ["rock", "paper", "scissors"];

  return (
    <div className="move-buttons">
      {moves.map((move) => (
        <button
          key={move}
          data-move={move}
          onClick={() => onMove(move)}
        >
          {move}
        </button>
      ))}
    </div>
  );
}