import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import CanvasDrawing from "../../Components/MyCanvas/CanvasDrawing";
import MyCanvas from "../../Components/MyCanvas/MyCanvas";
import { SocketContext } from "../../Helpers/SocketContext";

function GuessingRoom({ }) {
  const navigate = useNavigate()
  const {
    users,
    setUsers,
    currentUser,
    sendData,
    canvasData,
    setCurrentUser
  } = useContext(SocketContext);
  const [currentGuess, setGuess] = useState("")
  const [error, setError] = useState(false)
  useEffect(() => {
    if (!currentUser.username) {
      navigate("/")
    }
  }, [])
  return (
    <div>
      <h1>Guessing Room</h1>
      <h2>{currentUser.wordToGuess}</h2>
      <div>
        <h2>
          <input onChange={e => {
            setGuess(e.target.value)
            setError(false)
          }} placeholder={"Guess the word"} />
          <button onClick={() => {
            if (currentUser.wordToGuess !== currentGuess) {
              setError(true)
            } else {
              setCurrentUser({ ...currentUser, points: currentUser.points + currentUser.currentBetPoint, player: (currentUser.player == 1) ? 2 : 1 })
              sendData("add_point", currentUser.currentBetPoint)
              let currentPlayerIndex = users.findIndex(p => p.player == currentUser.player)
              users[currentPlayerIndex].points = users[currentPlayerIndex].points + currentUser.currentBetPoint
              let temp = users[0].player
              users[0].player = users[1].player
              users[1].player = temp
              setUsers(users)
              navigate("/")
            }
          }}>Submit</button>
        </h2>
        <p style={{ color: "red" }}>{error ? "Incorrect" : ""}</p>
      </div>
      <MyCanvas canvasArr={canvasData} />
    </div>
  );
}

export default GuessingRoom;
