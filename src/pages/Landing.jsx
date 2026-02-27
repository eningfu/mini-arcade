import { useState } from 'react'
import '../App.css'
import GameCard from '../components/GameCard'

function Landing() {

  return (
    <>
      <div className='landing'>
        <h1 className="title">welcome to da mini arcade</h1>
        <div className='games'>
          <div className='one-p'>
            <h2 className='title'>single player</h2>
            <GameCard gamename={"simon"}/>
          </div>
          <div className='two-p'>
            <h2 className='title'>two player</h2>
            <GameCard gamename={"tictactoe"}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing



 