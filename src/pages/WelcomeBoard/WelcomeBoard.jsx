import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../Helpers/SocketContext";
import "./WelcomeBoard.css"


const WelcomeBoard = () => {
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
    <div className="wrapper-content">
      <h1>Welcome To<br></br> <span className="cf-gradient-span">Draw & Guess</span></h1>
      <p>Draw and Guess is a fun and exciting game for two players. The objective of the game is for one player to draw a word and the other player to guess what the word is.</p>
      <div className="formtoplay">
        <div className="Form">
          <input
            className="inputname"
            placeholder="username"
            onChange={(e) =>
              setCurrentUser({
                ...currentUser,
                username: e.target.value,
                player: !users.length ? 1 : 2,
              })
            }
          />
          <button className="button-gradient" onClick={() => connectToGame("drawnGuess")}>PLAY</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBoard;
