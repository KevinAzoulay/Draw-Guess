import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import './SocketContext.css'

const SocketContext = createContext();

const SocketProvider = (props) => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [canvasData, setCanvasData] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    username: "",
    player: "",
    wordChoosen: "",
    currentBetPoint: 0,
    wordToGuess: "",
    points: 0,
  });
  const socket = socketIOClient('http://localhost:4000');

  useEffect(() => {
    return () => {
      socket.emit("exit_game", "drawnGuess")
      navigate("/")
    };
  }, []);

  useEffect(() => {
    const playerEntered = ({ players }) => {
      console.log("hello from ", players, " socket context");
      setUsers(players);
    }
    const receivedWord = ({ wordToGuess, currentBetPoint }) => {
      console.log('wordToGuess :>> ', wordToGuess, currentBetPoint, currentUser);
      if (currentUser.player == 2) {
        setCurrentUser({ ...currentUser, wordToGuess, currentBetPoint });
      }
    }
    const receivedCanvas = (canvasData) => {
      setCanvasData(canvasData);
    }
    const switchContext = (users) => {
      console.log('contextChanges', users)
      setCanvasData(null);
      setUsers(users);
      setCurrentUser({
        ...currentUser,
        wordChoosen: "",
        currentBetPoint: 0,
        wordToGuess: "",
        player: (currentUser.player == 1) ? 2 : 1
      });
      navigate("/")
    }
    const gameEnded = () => {
      setUsers([])
      setCanvasData(null);
      setCurrentUser({
        username: "",
        player: "",
        wordChoosen: "",
        currentBetPoint: 0,
        wordToGuess: "",
        points: 0,
      })
      navigate("/")
    }
    socket.on("player_entered", playerEntered);
    socket.on("received_word", receivedWord);
    socket.on("received_canvas", receivedCanvas);
    socket.on("switch_context", switchContext);
    socket.on("game_ended", gameEnded)
    return () => {
      //   socket.off("player_entered", playerEntered);
      //   socket.off("received_word", receivedWord);
      //   socket.off("received_canvas", receivedCanvas);
      //   socket.off("switch_context", switchContext);
      //   socket.off("game_ended", gameEnded)
    }
  }, [currentUser])

  const sendData = (event, dataToSend) => {
    socket.emit(event, { player: currentUser.player, data: dataToSend });
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        users,
        canvasData,
        currentUser,
        sendData,
        setCanvasData,
        setCurrentUser,
        setUsers,
      }}
    >
      <div >
        <div>


          {users ? users.map((item, idx) => (
            <div className="state-wrapper" key={`users-${idx + 1}`}>

              <div className="state-holder"><p>Player n°{item.player}: {item.username}</p>
                <p>Points: {item.points ? item.points : 0}</p>
              </div>
            </div>
          )) : null}
        </div>
      </div>
      {props.children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
