import { useState, useEffect } from "react";

import './Simon.css';
import GoBack from "../components/GoBack";

const squares = [
  { id: 0, color: 'red' },
  { id: 1, color: 'blue' },
  { id: 2, color: 'yellow' },
  { id: 3, color: 'green' },
];

export default function Simon() {
  const [ready, setReady] = useState(false);
  // round starts at 1
  const [round, setRound] = useState(1);
  // instructions list
  const [instruction, setInstruction] = useState([]);
  const [instructionIndex, setInstructionIndex] = useState(0);
  // is the button disabled?
  const [disabled, setDisabled] = useState(true);
  // user clicked button order
  const [clickedButtons, setClickedButtons] = useState([]);
  // is game over?
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);

  useEffect(() => {
    if (ready) {
      startRound();
    }
  }, [ready, round]);

  const startRound = () => {
    setDisabled(true);
    setClickedButtons([]);
    setGameOver(false);

    // create the instructions array
    const randomSquare = squares[Math.floor(Math.random() * squares.length)];

    setInstruction(prev => {
      const newInstructions = round === 1 ? [randomSquare.id] : [...prev, randomSquare.id];

      setInstructionIndex(0);
      displayInstructions(newInstructions);
      return newInstructions;
    });
  };

  const displayInstructions = (instructions) => {
    let index = 0;

    const playNext = () => {
      if (index >= instructions.length) {
        setInstructionIndex(-1);
        setDisabled(false);
        return;
      }

      setInstructionIndex(index);

      setTimeout(() => {
        setInstructionIndex(-1);

        setTimeout(() => {
          index++;
          playNext();
        }, 300);
      }, 500);
    };

    playNext();
  };

  const handleClick = (id) => {
    if (disabled || gameOver) {
      return;
    }

    const clicked = [...clickedButtons, id];
    setClickedButtons(clicked);

    console.log(clicked, instruction);

    if (clicked.length === round) {
      checkRoundResult(clicked);
    }
  };

  const handleStart = () => {
    if (!ready) {
      setReady(true);
    }
  }

  const resetGame = () => {
    setInstruction([]);
    setClickedButtons([]);
    setRound(1);
    setGameOver(false);
    setReady(false);
    setDisabled(true);
    setGameWin(false);
  };

  const checkRoundResult = (clickedButtons) => {
    // compare the two arrays
    for (let i = 0; i < clickedButtons.length; i++) {
      if (clickedButtons[i] !== instruction[i]) {
        setGameOver(true);
        setInstruction([]);
        setRound(1);
        return;
      }
    }

    if (round === 5) {
      setGameWin(true);
      setRound(1);
      setReady(false);
    } else {
      setTimeout(() => {
        setRound(prev => prev + 1);
      }, 500);
    }
  };

  return (
    <div className="page-container">
      <GoBack />
      <div className="spec-container">
        <div className="simon">
          {squares.map((square) => (
            <button
              key={square.id}
              className={`click-box ${square.color} ${instruction[instructionIndex] === square.id ? "active" : ""}`}
              onClick={() => handleClick(square.id)}
              disabled={disabled}
            />
          ))}
        </div>
        {!ready && !gameOver && !gameWin && <button className="start-simon" onClick={handleStart}>&gt; start game</button>}
        {gameOver && (<button className="start-simon" onClick={resetGame}>game over<br/>&gt; play again!</button>)}
        {gameWin && (<button className="start-simon" onClick={resetGame}>you win!<br/>&gt; play again!</button>)}
      </div>
    </div>
  );
}