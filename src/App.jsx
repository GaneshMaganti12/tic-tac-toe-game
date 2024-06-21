import React, { useState } from "react";
import "./App.css";

function App() {
  const initialBoard = Array(9).fill("");

  const [boardArray, setBoardArray] = useState(initialBoard);
  const [playerTurn, setPlayerTurn] = useState("X");
  const [isGameOver, setISGameOver] = useState(false);
  const [playersCount, setPlayersCount] = useState({ x: 0, o: 0 });
  const [boardIndexes, setBoardIndexes] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [onePlayerMode, setOnePlayerMode] = useState(true);

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

  const findBestMove = (board, currentPlayer) => {
    for (let condition of winConditions) {
      const [a, b, c] = condition;

      if (
        board[a] === currentPlayer &&
        board[b] === currentPlayer &&
        !board[c]
      ) {
        return c;
      }
      if (
        board[b] === currentPlayer &&
        board[c] === currentPlayer &&
        !board[a]
      ) {
        return a;
      }
      if (
        board[c] === currentPlayer &&
        board[a] === currentPlayer &&
        !board[b]
      ) {
        return b;
      }
    }
    return null;
  };

  const calculateWinner = (newBoard) => {
    const { anyWinner, winner } = checkTheBoard(newBoard);

    if (anyWinner) {
      setPlayersCount((obj) =>
        winner === "X" ? { ...obj, x: obj.x + 1 } : { ...obj, o: obj.o + 1 }
      );
      setISGameOver(true);
      setPlayerTurn(playerTurn);
      setTimeout(() => {
        alert(`Player ${winner} won the game.`);
      }, 200);
      return;
    }

    if (newBoard.every((cell) => cell !== "")) {
      setISGameOver(true);
      setTimeout(() => {
        alert("It's a draw, Play again");
      }, 200);
      return;
    }
  };

  const checkTheBoard = (newBoard) => {
    for (let condition of winConditions) {
      const [a, b, c] = condition;

      if (newBoard[a] !== "" && newBoard[b] !== "" && newBoard[c] !== "") {
        if (newBoard[a] === newBoard[b] && newBoard[b] === newBoard[c]) {
          return { anyWinner: true, winner: newBoard[a] };
        }
      }
    }
    return { anyWinner: false };
  };

  const handleClick = (index) => {
    if (!isGameOver && boardArray[index] === "" && onePlayerMode !== null) {
      const newBoard = boardArray.slice();
      newBoard[index] = playerTurn;

      const { anyWinner } = checkTheBoard(newBoard);

      if (onePlayerMode && !anyWinner) {
        const oppPlayer = playerTurn === "X" ? "O" : "X";

        let bestMove = findBestMove(newBoard, oppPlayer);

        if (bestMove === null) {
          bestMove = findBestMove(newBoard, playerTurn);
        }

        if (bestMove === null) {
          const emptyIndexes = boardIndexes.filter((i) => newBoard[i] === "");
          bestMove =
            emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
        }

        newBoard[bestMove] = oppPlayer;
      } else {
        setPlayerTurn(playerTurn === "X" ? "O" : "X");
      }
      calculateWinner(newBoard);
      setBoardArray(newBoard);
    }
  };

  const handlePlayerMode = (type) => {
    if (type === "one") {
      setOnePlayerMode(true);
    } else {
      setOnePlayerMode(false);
    }
    setPlayersCount({ x: 0, o: 0 });
    setBoardIndexes([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setBoardArray(initialBoard);
    setPlayerTurn("X");
    setISGameOver(false);
  };

  const handleReset = (type) => {
    if (!type) {
      setPlayersCount({ x: 0, o: 0 });
    }
    setBoardIndexes([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setBoardArray(initialBoard);
    setPlayerTurn("X");
    setISGameOver(false);
  };

  const playerCountButton = (
    <>
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
          <button className="game-button" onClick={() => handleReset("again")}>
            Play Again?
          </button>
        )}
        {(playersCount.x !== 0 || playersCount.o !== 0) && (
          <button className="game-button" onClick={() => handleReset()}>
            Reset
          </button>
        )}
        {boardArray.some((e) => e !== "") && !isGameOver && (
          <button className="game-button" onClick={() => handleReset("clear")}>
            Clear
          </button>
        )}
      </div>
    </>
  );

  return (
    <div className="tic-tac-toe-container">
      <h1 className="title small">Tic Tac Toe</h1>
      <div className="tic-tac-toe-card">
        <div className="title-player-turn-count-card">
          <h1 className="title large">Tic Tac Toe</h1>

          <div className="select-player-card">
            <span
              className={`select-player ${onePlayerMode && "one-player"}`}
              onClick={() => handlePlayerMode("one")}
            >
              One Player
            </span>
            <span
              className={`select-player ${!onePlayerMode && "two-player"}`}
              onClick={() => handlePlayerMode("two")}
            >
              Two Players
            </span>
          </div>
          {onePlayerMode ? (
            <p className="player-turn">
              You are player <span className="player">X</span>
            </p>
          ) : (
            <p className="player-turn">
              Player <span className="player">{playerTurn}</span> Turn
            </p>
          )}
          <div className="player-count-buttons-card-large">
            {playerCountButton}
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
        <div className="player-count-buttons-card">{playerCountButton}</div>
      </div>
    </div>
  );
}

export default App;
