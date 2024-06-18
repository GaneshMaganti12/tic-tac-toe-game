import React, { useState } from "react";
import "./App.css";

function App() {
  const initialBoard = Array(9).fill("");
  const [boardArray, setBoardArray] = useState(initialBoard);
  const [playerTurn, setPlayerTurn] = useState("X");
  const [isGameOver, setISGameOver] = useState(false);
  const [playersCount, setPlayersCount] = useState({ x: 0, o: 0 });

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (newBoard, index) => {
    for (let condition of winConditions) {
      const [a, b, c] = condition;

      if (newBoard[a] !== "" && newBoard[b] !== "" && newBoard[c] !== "") {
        if (newBoard[a] === newBoard[b] && newBoard[b] === newBoard[c]) {
          setPlayersCount((obj) =>
            playerTurn === "X"
              ? { ...obj, x: obj.x + 1 }
              : { ...obj, o: obj.o + 1 }
          );
          setISGameOver(true);
          setPlayerTurn(playerTurn);
          setTimeout(() => {
            alert(`Player ${playerTurn} won the game.`);
          }, 200);
          return;
        }
      }
    }
    if (newBoard.every((cell) => cell !== "")) {
      setISGameOver(true);
      setTimeout(() => {
        alert("It's a draw, Play again");
      }, 200);
      return;
    }
  };

  const handleClick = (index) => {
    if (!isGameOver && boardArray[index] === "") {
      const newBoard = boardArray.slice();

      newBoard[index] = playerTurn;

      setPlayerTurn(playerTurn === "X" ? "O" : "X");
      setBoardArray(newBoard);
      calculateWinner(newBoard, index);
    }
  };

  const handleReset = (type) => {
    if (!type) {
      setPlayersCount({ x: 0, o: 0 });
    }
    setBoardArray(initialBoard);
    setPlayerTurn("X");
    setISGameOver(false);
  };

  return (
    <div className="tic-tac-toe-container">
      <div className="tic-tac-toe-card">
        <div className="title-player-turn-count-card">
          <h1 className="title">Tic Tac Toe</h1>
          <p className="player-turn">
            Player <span className="player">{playerTurn}</span> Turn
          </p>
          <div className="player-count-buttons-card-large">
            <div className="players-count-card">
              <p className="player-count">
                Player X: <span className="count">{playersCount.x}</span>
              </p>
              <p className="player-count">
                Player O: <span className="count">{playersCount.o}</span>
              </p>
            </div>
            <div className="buttons-container">
              {isGameOver && (
                <button
                  className="game-button"
                  onClick={() => handleReset("again")}
                >
                  Play Again?
                </button>
              )}
              {(playersCount.x !== 0 || playersCount.o !== 0) && (
                <button className="game-button" onClick={() => handleReset()}>
                  Reset
                </button>
              )}
              {boardArray.some((e) => e !== "") && !isGameOver && (
                <button
                  className="game-button"
                  onClick={() => handleReset("clear")}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="game-container-card">
          <div className="game-container">
            {boardArray.map((winner, index) => (
              <div
                className="game-card"
                key={index}
                onClick={() => handleClick(index)}
              >
                {winner}
              </div>
            ))}
          </div>
        </div>
        <div className="player-count-buttons-card">
          <div className="players-count-card">
            <p className="player-count">
              Player X: <span className="count">{playersCount.x}</span>
            </p>
            <p className="player-count">
              Player O: <span className="count">{playersCount.o}</span>
            </p>
          </div>
          <div className="buttons-container">
            {isGameOver && (
              <button
                className="game-button"
                onClick={() => handleReset("again")}
              >
                Play Again?
              </button>
            )}
            {(playersCount.x !== 0 || playersCount.o !== 0) && (
              <button className="game-button" onClick={() => handleReset()}>
                Reset
              </button>
            )}
            {boardArray.some((e) => e !== "") && !isGameOver && (
              <button
                className="game-button"
                onClick={() => handleReset("clear")}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
