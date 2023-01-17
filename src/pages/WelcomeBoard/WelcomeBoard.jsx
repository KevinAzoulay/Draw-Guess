import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../Helpers/SocketContext";
// let socket;
// const connectionPort = "localhost:4000";

const WelcomeBoard = (props) => {
  const {
    socket,
    users,
    currentUser,
    setCurrentUser
  } = useContext(SocketContext);
  const navigate = useNavigate()

  const connectToGame = (gameId) => {
    socket.emit("join_game", { gameId, currentUser });
    localStorage.setItem(
      "user",
      JSON.stringify({ username: currentUser.username })
    );
    navigate("/waiting");
  };
  useEffect(() => {
    if (currentUser.username) {
      navigate("/waiting")
    }
  }, [])
  return (
    <div>
      <h1>WelcomeBoard</h1>
      <input
        placeholder="username"
        onChange={(e) =>
          setCurrentUser({
            ...currentUser,
            username: e.target.value,
            player: !users.length ? 1 : 2,
          })
        }
      />
      <button onClick={() => connectToGame("drawnGuess")}>PLAY</button>
    </div>
  );
};

export default WelcomeBoard;
