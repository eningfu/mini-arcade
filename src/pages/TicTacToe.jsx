import { useState } from 'react'
import GoBack from '../components/GoBack'
import './TicTacToe.css';

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function TicTacToe() {
  const [board, setBoard] = useState(['','','','','','','','','']);

  const [isOTurn, setIsOTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [winner, setWinner] = useState(null);

  const checkWinner = (currentBoard) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;

      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinner(currentBoard[a]);
        return currentBoard[a];
      }
    }

    return null;
  };

  const handleClick = (index) => {
    if (gameOver) {
      return;
    }

    if (board[index] !== '') {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isOTurn ? 'O' : 'X';
    setBoard(newBoard);
    setIsOTurn(!isOTurn);

    const winner = checkWinner(newBoard);

    if (winner) {
      setGameOver(true);
    } else if (!newBoard.includes('')) {
      setGameOver(true);
      setIsDraw(true);
    }
  };

  const resetGame = () => {
    setIsOTurn(true);
    setGameOver(false);
    setIsDraw(false);
    setBoard(['','','','','','','','','']);
  };

  return (
    <>
      <div className="page-container">
      <GoBack />
      <div className="spec-container">
        <div className="ttt">
          {board.map((value, index) => (
            <button
              key={index}
              className={`ttt-tile  ${value === "O" ? "o-turn" : value === "X" ? "x-turn" : ""}`}
              onClick={() => handleClick(index)}
            >
              {value}
            </button>
          ))}
        </div>
        {gameOver && !isDraw && (<button className="start-simon" onClick={resetGame}>{winner} wins!<br/>&gt; play again</button>)}
        {gameOver && isDraw && (<button className="start-simon" onClick={resetGame}>game draw!<br/>&gt; play again</button>)}
      </div>
    </div>
    </>
  )
}

export default TicTacToe



 