import React, { useEffect, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const CanvasDrawing = ({ canvasParams }) => {
  const canvasRef = useRef(null);


  useEffect(() => {
    if (canvasRef.current && canvasParams.length) {
      canvasRef.current.loadPaths(canvasParams[0].paths);
    }
  }, [canvasParams]);

  return <ReactSketchCanvas ref={canvasRef} />;
};

export default CanvasDrawing;
