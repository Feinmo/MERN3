import "./App.css";
import { NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <>
    <h1>M-Box Game Platform </h1>
      <nav>
        <NavLink to=" ">Home</NavLink>
        <NavLink to="tictactoe ">Tic Tac Toe</NavLink>
        <NavLink to="hangman ">Hangman</NavLink>
        <NavLink to="sudoku ">Sudoku</NavLink>
      </nav>
      
      <Outlet />
    </>
  );
}

export default App;
