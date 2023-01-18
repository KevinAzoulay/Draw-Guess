import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../Helpers/SocketContext";

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
      <div>
        {users.map((item, idx) => (
          <div key={`users-${idx + 1}`}>
            <div>{item.username}</div>
            <div>{item.player}</div>
          </div>
        ))}
      </div>
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
