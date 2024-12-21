import { useState } from "react";
import './Styles/TicTacToe.css';

const TicTacToe = () => {
  const [started, setStarted] = useState(false);
  const [initialPlayer, setInitialPlayer] = useState(null);

  const Position = ({ value, crossPosition }) => {
    return <button onClick={crossPosition} className="tic-button">{value}</button>;
  };

  const startGame = () => {
    // Randomly decide who starts the game (true for "X", false for "O")
    const randomStart = Math.random() < 0.5;
    setInitialPlayer(randomStart);
    setStarted(true);
  };

  const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xTurn, setXTurn] = useState(initialPlayer);

    const handleClick = (e) => {
      if (squares[e] || calculateWinner(squares) || isDraw(squares)) return;
      const copySquares = squares.slice();
      if (xTurn) {
        copySquares[e] = "X";
      } else {
        copySquares[e] = "O";
      }

      setXTurn(!xTurn);
      setSquares(copySquares);
    };

    const calculateWinner = (squares) => {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          return squares[a];
        }
      }
      return null;
    };

    const isDraw = (squares) => {
      return squares.every((square) => square !== null) && !calculateWinner(squares);
    };

    const winner = calculateWinner(squares);
    const draw = isDraw(squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (draw) {
      status = "It's a draw!";
    } else {
      status = "Next player: " + (xTurn ? "X" : "O");
    }

    return (
      <>
      <section>
        <h1>Tic-Tac-Toe Game</h1>
        {started && (
          <div className="tictactoe-pos">
            <div>
              <Position
               
                value={squares[0]}
                crossPosition={() => handleClick(0)}
              />
              <Position
               
                value={squares[1]}
                crossPosition={() => handleClick(1)}
              />
              <Position
                
                value={squares[2]}
                crossPosition={() => handleClick(2)}
              />
            </div>
            <div>
              <Position
              
                value={squares[3]}
                crossPosition={() => handleClick(3)}
              />
              <Position
                value={squares[4]}
                crossPosition={() => handleClick(4)}
              />
              <Position
                value={squares[5]}
                crossPosition={() => handleClick(5)}
              />
            </div>
            <div>
              <Position
                value={squares[6]}
                crossPosition={() => handleClick(6)}
              />
              <Position
                value={squares[7]}
                crossPosition={() => handleClick(7)}
              />
              <Position
                value={squares[8]}
                crossPosition={() => handleClick(8)}
              />
            </div>
            <div className="status">{status}</div>
          </div>
        )}
        
      </section>
      <button className="start-game" onClick={startGame}>Start the game</button>
      </>
    );
  };

  return (
    <>
      <Board />
    </>
  );
};

export default TicTacToe;
