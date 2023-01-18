import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { SocketContext } from "../../Helpers/SocketContext";


const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
  height: "400px",
  width: "600px",
};

const DrawingRoom = (props) => {
  const navigate = useNavigate()
  const {
    currentUser,
    canvasData,
    sendData,
    setCanvasData
  } = useContext(SocketContext);
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };
  const handleChange = debounce((e) => {
    sendData("send_canvas", e);
    setCanvasData(e)
  })
  useEffect(() => {
    if (!currentUser.username) {
      navigate("/")
    }
  }, [])
  return (
    <div>
      <h1>DrawingRoom</h1>
      <div>
        <h2>{currentUser.wordChoosen}</h2>
      </div>
      <div>
        <ReactSketchCanvas
          style={styles}
          strokeWidth={4}
          strokeColor="red"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default DrawingRoom;
