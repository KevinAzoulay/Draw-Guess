import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../Helpers/SocketContext";

const WaitingRoom = (props) => {
  const { socket, users, currentUser } = useContext(SocketContext);

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
      <h1>WaitingRoom</h1>
      <h1>{currentUser.username}</h1>
      <h1>{currentUser.player}</h1>
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
