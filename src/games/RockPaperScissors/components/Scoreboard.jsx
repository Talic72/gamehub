export function Scoreboard({ score }) {
  return (
    <section className="scoreboard">
      <h3>Score</h3>

      <p>
        Player: <span id="score-player">{score.player}</span>
      </p>

      <p>
        CPU: <span id="score-cpu">{score.cpu}</span>
      </p>

      <p>
        Ties: <span id="score-ties">{score.ties}</span>
      </p>
    </section>
  );
}