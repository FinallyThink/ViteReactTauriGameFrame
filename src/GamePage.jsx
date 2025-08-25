import { useEffect, useState, useRef } from "react";
import GloData from "./core/globalState";
import "./GamePage.less";
import KeyManager from "./core/Keyboard";

function GamePage() {
  const canvasRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const TimerRef = useRef(null);
  // 设置窗口大小
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    startGame();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      StopGame();
    };
  }, [windowSize]);

  const startGame = () => {
    if (TimerRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d", {
      willReadFrequently: true, // 提高读取频率，优化性能
    });
    TimerRef.current = setInterval(() => {
      if (!GloData.isPause && !GloData.isGameOver) {
        GloData.addrunTime(GloData.rate);
      }
      ctx.clearRect(0, 0, windowSize.width, windowSize.height);
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(`运行时间: ${GloData.formatRunTime()}`, 20, 30);
      ctx.fillStyle = "blue";
      ctx.fillText(`运行时间2: ${GloData.formatRunTime()}`, 60, 100);
    }, GloData.rate); // 每秒更新一次
  };
  //停止Game
  const StopGame = () => {
    if (TimerRef.current) {
      clearInterval(TimerRef.current);
      TimerRef.current = null;
    }
  };

  return (
    <div>
      <canvas
      className="game-canvas"
        ref={canvasRef}
        width={windowSize.width}
        height={windowSize.height}
        style={{ hidden: true }}
      ></canvas>
    </div>
  );
}

export default GamePage;
