import { useState } from "react";

const HangmanGame = () => {
  // WORDS DATABASE
  const wordList = [
    "dinosaur",
    "coconut",
    "astronomy",
    "guitar",
    "bicycle",
    "programming",
    "colonoscopy",
    "pyramid",
    "marine",
    "volcano",
    "informatics",
  ];
  // ERROR LIMIT
  const maxTries = 6;

  //STATES
  const [currentWord, setCurrentWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Function to start the game
  const startGame = () => {
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(word);
    console.log("The current word is: ", word);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
    setWin(false);
    setGameStarted(true);
  };

  // Function to handle guesses
  const handleGuess = (event) => {
    const guess = event.target.value.toLowerCase();
    // BAD SIGNS CHECK
    if (guess.length !== 1 || !/^[a-z]$/.test(guess)) return;
    //  ALREADY GUESSED CHECK
    if (guessedLetters.includes(guess)) {
      alert("You already guessed that letter.");
      return;
    }

    const updatedGuessedLetters = [...guessedLetters, guess];
    setGuessedLetters(updatedGuessedLetters);

    const updatedDisplayWord = currentWord
      .split("")
      .map((letter) => (updatedGuessedLetters.includes(letter) ? letter : "_"))
      .join("");

    if (currentWord.includes(guess)) {
      if (!updatedDisplayWord.includes("_")) {
        setWin(true);
        setGameOver(true);
      }
    } else {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      if (newWrongGuesses >= maxTries) {
        setGameOver(true);
      }
    }
  };

  // display the word with guessed letters
  const displayWord = currentWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  return (
    <div>
      <h1>Hangman Game</h1>
      {!gameOver && <button onClick={startGame} disabled={gameOver || win}>
        Start Game
      </button>}
      {gameOver && <div>Game Over! The word was: {currentWord}</div>}
      {win && <div>Congratulations! You guessed the word!</div>}

      {!gameOver && gameStarted && (
        <div>
          <h3>Word to guess:</h3>
          <p>{displayWord}</p>
          <p>Guessed letters: {guessedLetters.join(", ")}</p>
          <p>Tries left: {maxTries - wrongGuesses}</p>
        </div>
      )}

      <div>
        {gameOver || win ? (
          <button onClick={startGame}>Play Again</button>
        ) : ( gameStarted &&
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
