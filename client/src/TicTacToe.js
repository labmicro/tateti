import { useEffect, useState } from "react";
import Square from "./Square";
import EndGame from "./EndGame";
import { empezar, movimiento } from "./apiCalls";
const INITIAL = "";
const X_PLAYER = "X";
const O_PLAYER = "O";
const X_PLAYER_NAME = "Juan";
const O_PLAYER_NAME = "Pedro";

const TicTacToe = () => {
  const [grid, setGrid] = useState(Array(9).fill(INITIAL));
  const [player, setPlayer] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [draw, setDraw] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await empezar([O_PLAYER_NAME, X_PLAYER_NAME]);
      setIsLoaded(true);
    };
    fetchData();
  }, [isLoaded]);

  const newGame = () => {
    setGrid(Array(9).fill(INITIAL));
    setGameFinished(false);
    setDraw(false);
    empezar([O_PLAYER_NAME, X_PLAYER_NAME]);
  };

  const handleClick = async (id) => {
    const result = await movimiento(id % 3, Math.floor(id / 3));
    isGameOver(result);
    setGrid(
      grid.map((item, index) => {
        if (index === id) {
          if (player) {
            return X_PLAYER;
          } else {
            return O_PLAYER;
          }
        } else {
          return item;
        }
      })
    );
    setPlayer(!player);
  };
  const isGameOver = (result) => {
    if (!gameFinished) {
      console.log("Ganador: ", result);
      if (result.ganador) {
        setGameFinished(true);
      }
      if (!grid.includes(INITIAL)) {
        setDraw(true);
        setGameFinished(true);
      }
    }
  };

  return (
    <div>
      <div className="player-turn">
        Turn player: {player ? X_PLAYER_NAME : O_PLAYER_NAME}
      </div>
      {gameFinished && (
        <EndGame
          newGame={newGame}
          player={player}
          draw={draw}
          X_PLAYER={X_PLAYER_NAME}
          O_PLAYER={O_PLAYER_NAME}
        />
      )}
      <Square clickedArray={grid} handleClick={handleClick} />
    </div>
  );
};
export default TicTacToe;
