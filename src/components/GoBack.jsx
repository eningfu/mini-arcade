import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../App.css'

function GoBack() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <button className='go-back' onClick={handleClick}>
        &lt;
      </button>
    </>
  )
}

export default GoBack
