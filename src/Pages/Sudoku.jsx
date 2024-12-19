import { useState, useEffect } from "react";
import Sudoku from "sudoku";

const SudokuGame = () => {
  // STATES
  const [sudokuBoard, setSudokuBoard] = useState([]);
  const [solvedBoard, setSolvedBoard] = useState([]);
  const [userBoard, setUserBoard] = useState([]);
  const [solved, setSolved] = useState(false);

  // GEN BOARD AND SOLUTION
  useEffect(() => {
    const puzzle = Sudoku.makepuzzle();
    const solved = Sudoku.solvepuzzle(puzzle);

    setSudokuBoard(puzzle);
    setSolvedBoard(solved);
    console.log(solved);
    setUserBoard(puzzle.map((val) => (val === null ? null : val))); // Initialize userBoard
  }, []);

  // FILL THE BOARD
  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // Limit input to 0-9

    const newUserBoard = [...userBoard];
    newUserBoard[index] = value === "" ? null : parseInt(value, 10);
    setUserBoard(newUserBoard);
  };

  // CHECK WIN CONDITIONS
  const checkWin = () => {
    if (userBoard.every((val, idx) => val === solvedBoard[idx])){
      setSolved(true);    
    };
  };

  const solveSudoku = () => {
    console.log("fill the board")
  }

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

  return (
    <div className="sudoku-container">
      <h1>Sudoku Game</h1>
      <div className="sudoku-board">{renderBoard()}</div>

      {solved ? (
        <div className="success-message">
          Congratulations! You solved the puzzle.
        </div>
      ) : (
        <div>
          <button className="solution-button" onClick={checkWin}>Check the solution</button>
      <button className="solution-button" onClick={solveSudoku}>Show Solution</button>
      </div>
      )}
    </div>
   
  );
};

export default SudokuGame;
