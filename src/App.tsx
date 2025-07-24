import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [userInput, setUserInput] = useState<number | null>(null);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [userGuesses, setUserGuesses] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);

  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 1001); // 0 a 100
    setRandomNumber(number);
    console.log("Random number generated:", number);
  };

  const calcPontuacao = (numGuesses: number) => {
    return 100 / (numGuesses + 1);
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      userInput === null ||
      isNaN(userInput) ||
      userInput < 0 ||
      userInput > 1000
    ) {
      setMessage("Please enter a number between 0 and 1000.");
      return;
    }

    setUserGuesses((prevGuesses) => {
      const updatedGuesses = [...prevGuesses, userInput];

      if (userInput === randomNumber) {
        setMessage("You guessed it right!");
        setGameOver(true);
        setPontuacao(calcPontuacao(updatedGuesses.length));
        setRandomNumber(null);
      } else if (userInput < randomNumber!) {
        setMessage("Your guess is too low. Try again!");
        setUserInput(null);
      } else {
        setMessage("Your guess is too high. Try again!");
        setUserInput(null);
      }

      return updatedGuesses;
    });
  };

  const restartGame = () => {
    setUserInput(null);
    setUserGuesses([]);
    setGameOver(false);
    setPontuacao(0);
    setMessage("");
    generateRandomNumber();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Guess the Number (0–1000)</h2>

      {!gameOver && (
        <>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="number"
              value={userInput ?? ""}
              onChange={(e) => setUserInput(Number(e.target.value))}
              min={0}
              max={1000}
              placeholder="Enter a number"
            />
            <button style={{ marginLeft: "10px" }}>Submit</button>
          </form>
        </>
      )}

      <div style={{ marginTop: "20px" }}>{message && <div>{message}</div>}</div>

      {userGuesses.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          Attempts: {userGuesses.join(", ")}
        </div>
      )}

      {gameOver && (
        <div style={{ marginTop: "20px" }}>
          <h3>🎉 Game Over!</h3>
          <div>{Math.floor(pontuacao)} pontos.</div>
          <button onClick={restartGame} style={{ marginTop: "10px" }}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
