type HangmanWordProps = {
  reveal?: boolean;
  guessedLetters: string[];
  playingWord: string;
};

export function HangmanWord({
  reveal = false,
  guessedLetters,
  playingWord,
}: HangmanWordProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {playingWord.split("").map((letter, idx) => (
        <span style={{ borderBottom: ".1em solid black" }} key={idx}>
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && reveal
                  ? "hsl(200, 100%, 50%)"
                  : "black",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
