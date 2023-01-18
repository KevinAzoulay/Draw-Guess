import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import "./SocketContext.css"

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
  const socket = socketIOClient("http://localhost:8080");
  // const socket = socketIOClient("https://guess-n-draw-backend.herokuapp.com")

  useEffect(() => {
    return () => {
      console.log("Emitted ending the game")
      socket.emit("exit_game", "drawnGuess")
      navigate("/")
    };
  }, []);

  useEffect(() => {

    // socket.on("join_game", (data) => {
    //   setUsers(data);
    // });

    const playerEntered = ({ players }) => {
      console.log("hello from ", players, " socket context");
      setUsers([...users, players]);
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
      socket.off("player_entered", playerEntered);
      socket.off("received_word", receivedWord);
      socket.off("received_canvas", receivedCanvas);
      socket.off("switch_context", switchContext);
      socket.off("game_ended", gameEnded)
    }
  }, [currentUser, users.length])

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
      {
        users && users.length > 0 &&
        <div className="state-wrapper">
          <div className="state-holder">
            {users.map((item, idx) => (
              <div key={`users-${idx + 1}`}>
                <div>
                  <p>Player n°{item.player}: {item.username}</p>
                  <p>Points: {item.points ? item.points : 0}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      {props.children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };