import { useCallback, useEffect, useState } from "react";
import { ReactNode } from "react";

import words from "./wordList.json";
import { HangmanFigure } from "./HangmanFigure";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import Modal from "./Modal";

function App() {
  const [word] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState<ReactNode>("");

  const incorrectLetters = guessedLetters.filter(
    (letter) => !word.includes(letter)
  );

  const correctLetters = guessedLetters.filter((letter) =>
    word.includes(letter)
  );

  const lostGame = incorrectLetters.length >= 6;
  const wonGame =
    correctLetters.length == word.length &&
    word.split("").every((letter) => correctLetters.includes(letter));

  useEffect(() => {
    if (wonGame) {
      setModalTitle("Congratulations!");
      setModalMessage("You won! - Refresh to try again.");
      setIsModalOpen(true);
    } else if (lostGame) {
      const correctWord = word.toUpperCase();
      setModalTitle("Game Over!");
      setModalMessage(
        <>
          Nice try - The correct word was: <strong>{correctWord}</strong>.{" "}
          <br />
          Refresh to try again.
        </>
      );
      setIsModalOpen(true);
    }
  }, [wonGame, lostGame]);

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || lostGame || wonGame) {
        return;
      }

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, lostGame, wonGame]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) {
        return;
      }

      e.preventDefault();

      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <HangmanFigure numGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={lostGame}
        guessedLetters={guessedLetters}
        playingWord={word}
      />

      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          gameOver={wonGame || lostGame}
          correctLetters={correctLetters}
          incorrectLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>

      <Modal isOpen={isModalOpen} title={modalTitle} message={modalMessage} />
    </div>
  );
}

export default App;

// track the letters being pressed
// both correct and wrong
// add body part per wrong letter
// know correct word to make sure to show correct letters pressed
