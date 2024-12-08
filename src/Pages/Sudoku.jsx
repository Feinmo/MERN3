import { useState, useEffect } from 'react';
import Sudoku from 'sudoku';

const SudokuGame = () => {
  const [sudokuBoard, setSudokuBoard] = useState([]);
  const [solvedBoard, setSolvedBoard] = useState([]);
  const [userBoard, setUserBoard] = useState([]);

  // Generate a Sudoku puzzle when the component mounts
  useEffect(() => {
    const puzzle = Sudoku.makepuzzle();
    // We check if solved is truthy, and sudokuBoard is correctly solved
    const solved = Sudoku.solvepuzzle(puzzle);
    
    // Initialize boards
    setSudokuBoard(puzzle);
    console.log("Puzzle: ", puzzle);
    console.log("Solved Puzzle: ", solved);
    setSolvedBoard(solved);
    setUserBoard(puzzle);
  }, []);

  // Handle user input
  const handleChange = (index, value) => {
    const newUserBoard = [...sudokuBoard];
    newUserBoard[index] = value;
    setSudokuBoard(newUserBoard);
    // console.log(newUserBoard);
  };

  // Check if the puzzle is solved
  const isSolved = () => {
    return userBoard === solvedBoard;
  };

  // Render the Sudoku board
  const renderBoard = () => {
    return userBoard.map((value, index) => {
      return (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          disabled={sudokuBoard[index] !== null} // Disable if it's a pre-filled cell
          className="sudoku-cell"
        />
      );
    });
  };

  return (
    <div className="sudoku-container">
      <h1>Sudoku Game</h1>
      <div className="sudoku-board">
        {renderBoard()}
      </div>
      {isSolved() && <div className="success-message">Congratulations! You solved the puzzle.</div>}
    </div>
  );
};

export default SudokuGame;

