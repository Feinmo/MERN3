import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Home from "./Pages/Home.jsx";
import TicTacToe from "./Pages/TicTacToe.jsx";
import Hangman from "./Pages/HangMan.jsx";
import SudokuGame from "./Pages/Sudoku.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
         <Route index element={<Home/>}></Route>
          <Route path="tictactoe" element={<TicTacToe/>}></Route>
          <Route path="hangman" element={<Hangman/>}></Route>
          <Route path="sudoku" element={<SudokuGame/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
