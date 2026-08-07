export function GameHistory({ history }) {
  return (
    <section className="game-history">
      <h3>Game History</h3>

      <ul id="history">
        {history.map((round, index) => (
          <li key={index}>{round}</li>
        ))}
      </ul>
    </section>
  );
}