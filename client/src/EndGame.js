const EndGame = ({ newGame, player, draw, X_PLAYER, O_PLAYER }) => {
  return (
    <div className="end-game-screen">
      {!draw && (
        <span className="win-text">
          El jugador {player ? O_PLAYER : X_PLAYER} gano!
        </span>
      )}
      {draw && <span className="win-text">Draw</span>}
      <button className="btn" onClick={newGame}>
        Nuevo Juego
      </button>
    </div>
  );
};
export default EndGame;
