import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../Helpers/SocketContext";
import "./WaitingRoom.css"
const WaitingRoom = () => {
  const { users, currentUser } = useContext(SocketContext);

  const disabled = users.length === 1;

  const navigate = useNavigate();

  const handleClick = () => {
    if (currentUser.player === 1) {
      navigate("/choose");
    } else {
      navigate("/guess");
    }
  };
  useEffect(() => {
    if (!currentUser.username) {
      navigate("/")
    }
  }, [])
  return (
    <div>
      <h1>Waiting for Player {currentUser.player === 1 ? 2 : 1}</h1>
      <p>As soon as both players a set, you would be able to hit the START button below</p>
      <button
        disabled={disabled}
        style={{
          backgroundColor: disabled ? "gray" : "blue",
          color: "white",
        }}
        onClick={handleClick}
      >
        START
      </button>
    </div>
  );
};

export default WaitingRoom;
