import "./App.css";
import { NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <>
    <nav>
      <NavLink to=" ">Home</NavLink>
      <NavLink to="tictactoe ">Tic Tac Toe</NavLink>
      <NavLink to="hangman ">Hangman</NavLink>
      <NavLink to="sudoku ">Sudoku</NavLink>
    </nav>
    <header>MERN 3 RtC</header>

      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti,
        quaerat quos. Quo inventore aperiam, incidunt itaque ex atque quas nemo
        delectus suscipit iste perspiciatis repellendus et debitis perferendis
        dicta esse asperiores quos cupiditate officiis, reiciendis ipsa neque.
        Quod, laboriosam explicabo sequi sit corrupti accusamus maiores vero
        possimus qui, sed facere.
      </div>
      <Outlet />
    </>
  );
}

export default App;
