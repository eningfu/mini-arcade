import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Simon from './pages/Simon';
import TicTacToe from './pages/TicTacToe';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/simon" element={<Simon />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
