import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../App.css'

function GameCard({ gamename }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${gamename}`);
  };

  return (
    <>
      <button className='game-card' onClick={handleClick}>
        {gamename}
      </button>
    </>
  )
}

export default GameCard
