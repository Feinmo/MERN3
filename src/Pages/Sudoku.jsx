import { useState} from "react";
import Sudoku from "sudoku";
import ("./Styles/Sudoku.css");

const SudokuGame = () => {
  // STATES
  const [sudokuBoard, setSudokuBoard] = useState([]); // the starting board
  const [solvedBoard, setSolvedBoard] = useState([]); // the solved board
  const [userBoard, setUserBoard] = useState([]); // the player's board, where he's going to play
  const [solved, setSolved] = useState(false);
  const [started, setStarted] = useState(false);

  // GEN BOARD AND SOLUTION
  // useEffect(() => {
  //   startGame();
  // }, [])
  // START THE GAME
  const startGame = () => {
    const puzzle = Sudoku.makepuzzle();
    const solved = Sudoku.solvepuzzle(puzzle);

    setSudokuBoard(puzzle);
    setSolvedBoard(solved);
    setSolved(false);
    setStarted(true);
    // console.log(solved);
    setUserBoard(puzzle.map((val) => (val === null ? null : val)));
  };
  // FILL THE BOARD
  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // Limit input to 0-9

    const newUserBoard = [...userBoard];
    newUserBoard[index] = value === "" ? null : parseInt(value, 10);
    setUserBoard(newUserBoard);
  };
  // CHECK WIN CONDITIONS
  const checkWin = () => {
    if (userBoard.every((val, idx) => val === solvedBoard[idx])) {
      setSolved(true);
    }
  };
  // SOLVE SUDOKU BOARD
  const solveSudoku = () => {
    setUserBoard(solvedBoard);
  };
  // RENDER THE BOARD
  const renderBoard = () => {
    return userBoard.map((value, index) => {
      return (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={value === null ? "" : value}
          onChange={(e) => handleChange(index, e.target.value)}
          disabled={sudokuBoard[index] !== null}
          className="sudoku-cell"
        />
      );
    });
  };

  // HTML CODE
  return (
    <div className="sudoku-container">
      <h1>Sudoku Game</h1>
      {started && <div className="sudoku-board">{renderBoard()}</div>}

      {solved ? (
        <div className="success-message">
          Congratulations! You solved the puzzle.
        </div>
      ) : (started &&
        <div className="Game buttons">
          <button className="solution-button" onClick={checkWin}>
            Check the board
          </button>
          <button className="solution-button" onClick={solveSudoku}>
            Show Solution
          </button>
        </div>
      )}
      <button onClick={startGame}> Start the new Game</button>
    </div>
  );
};

export default SudokuGame;
