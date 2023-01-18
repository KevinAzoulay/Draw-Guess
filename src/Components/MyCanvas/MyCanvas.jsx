import React, { useEffect, useRef, useState } from "react";

const MyCanvas = ({ canvasArr = [] }) => {
  const canvas = useRef(null);
  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas?.current?.getContext("2d");
      ctx?.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      for (let i = 0; i < canvasArr?.length; i++) {
        const params = canvasArr[i];
        if (params?.drawMode) {
          ctx.beginPath();
          ctx.setTransform(0.5, 0, 0, 0.4, 0, 0)
          ctx.strokeStyle = params.strokeColor;
          ctx.lineWidth = params.strokeWidth;
          JSON.stringify(canvasArr);
          ctx.moveTo(params.paths[0].x, params.paths[0].y);
          for (let j = 1; j < params.paths.length; j++) {
            ctx.lineTo(params.paths[j].x, params.paths[j].y);
          }
          ctx.stroke();
        }
      }
    }
  }, [canvasArr]);

  return canvas ? (
    <div style={{ width: "100%" }}>
      <canvas
        ref={canvas}
        style={{ height: 400, width: 600 }}
        strokeWidth={4}
        strokecolor="red"
        id="myCanvas"
      ></canvas>
    </div>
  ) : null;
};

export default MyCanvas;
