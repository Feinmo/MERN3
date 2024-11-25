// import React from 'react'
import  { useState } from "react";

const HangmanGame = () => {
  const wordList = ["dinosaur", "coconut", "astronomy", "guitar", "bicycle", "programming", "colonoscopy", "pyramid", "marine", "volcano"];
  const maxTries = 6;
  
  const [currentWord, setCurrentWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  // Function to start the game
  const startGame = () => {
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(word);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
    setWin(false);
  };

  // Function to handle guesses
  const handleGuess = (event) => {
    const guess = event.target.value.toLowerCase();
    if (guess.length !== 1 || !/^[a-z]$/.test(guess)) return; // Validate guess

    if (guessedLetters.includes(guess)) {
      alert("You already guessed that letter.");
      return;
    }

    setGuessedLetters([...guessedLetters, guess]);

    if (currentWord.includes(guess)) {
      if (!currentWord.split("").some(letter => !guessedLetters.includes(letter))) {
        setWin(true);
      }
    } else {
      setWrongGuesses(wrongGuesses + 1);
      if (wrongGuesses + 1 >= maxTries) {
        setGameOver(true);
      }
    }
  };

  // Function to display the word with guessed letters
  const displayWord = currentWord.split("").map((letter) => (
    guessedLetters.includes(letter) ? letter : "_"
  )).join(" ");

  return (
    <div>
      <h1>Hangman Game</h1>
      <button onClick={startGame} disabled={gameOver || win}>Start Game</button>
      {gameOver && <div>Game Over! The word was: {currentWord}</div>}
      {win && <div>Congratulations! You guessed the word!</div>}

      <div>
        <h3>Word to guess:</h3>
        <p>{displayWord}</p>
        <p>Guessed letters: {guessedLetters.join(", ")}</p>
        <p>Tries left: {maxTries - wrongGuesses}</p>
      </div>

      <div>
        {gameOver || win ? (
          <button onClick={startGame}>Play Again</button>
        ) : (
          <input
            type="text"
            maxLength="1"
            onChange={handleGuess}
            disabled={gameOver || win}
          />
        )}
      </div>
    </div>
  );
};

export default HangmanGame;
