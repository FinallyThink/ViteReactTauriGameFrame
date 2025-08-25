import { useNavigate } from "react-router-dom";
import { getCurrentWindow } from "@tauri-apps/api/window";
import "./Home.less";
import KeyManager from "./core/Keyboard";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(1);

  const handleExit = async () => {
    const appWindow = await getCurrentWindow();
    await appWindow.close(); // 关闭当前窗口
  };

  const keyEvents = [
    {
      type: "press",
      key: 37, // 左
      callback: () => setActiveButton((prev) => (prev > 1 ? prev - 1 : 3)),
    },
    {
      type: "press",
      key: 39, // 右
      callback: () => setActiveButton((prev) => (prev < 3 ? prev + 1 : 1)),
    },
    {
      type: "press",
      key: 13, // 回车
      callback: () => {
        if (activeButton === 1) navigate("/GamePage");
        else if (activeButton === 2) navigate("/SetPage");
        else if (activeButton === 3) handleExit();
      },
    },
  ];

  useEffect(() => {
    const unregisterFns = keyEvents.map(({ type, key, callback }) => {
      if (type === "down") {
        return KeyManager.addKeyEvent(key, callback);
      } else if (type === "press") {
        return KeyManager.addPressEvent(key, callback);
      }
      return () => {};
    });

    KeyManager.activateListener();

    return () => {
      unregisterFns.forEach((off) => off());
      KeyManager.deactivateListener();
    };
  }, [activeButton]);

  return (
    <div className="menuCon">
      <div className="buttonBox">
        <button
          className={activeButton === 1 ? "active" : undefined}
          onClick={() => navigate("/GamePage")}
        >
          开始游戏
        </button>
        <button
          className={activeButton === 2 ? "active" : undefined}
          onClick={() => navigate("/SetPage")}
        >
          设置
        </button>
        <button
          className={activeButton === 3 ? "active" : undefined}
          onClick={handleExit}
        >
          退出游戏
        </button>
      </div>
    </div>
  );
}

export default Home;
