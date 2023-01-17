import React, { useState, useEffect, useContext } from "react";
import { wordListArr } from "./constants";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../Helpers/SocketContext";

// let socket;
// const connectionPort = "localhost:4000";

const WordChoosing = (props) => {
  const {
    sendData,
    currentUser,
    setCurrentUser,
  } = useContext(SocketContext);

  const navigate = useNavigate();

  const handleClick = (word, currentBetPoint) => {
    setCurrentUser({ ...currentUser, wordChoosen: word, currentBetPoint })
    sendData("send_word", {word,currentBetPoint});
    navigate("/draw");
  };
  useEffect(() => {
    if (!currentUser.username) {
      navigate("/")
    }
  }, [])
  return (
    <div>
      <h1>It's your turn to </h1>
      <div>
        {wordListArr?.map((item, idx) => (
          <div
            key={item + idx}
            style={{ display: "flex", marginBottom: "20px" }}
          >
            <div>
              {item.level} <span>{idx + 1} Points</span>
            </div>
            <button onClick={() => handleClick(item.words, item.points)}>
              {item.words}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordChoosing;
