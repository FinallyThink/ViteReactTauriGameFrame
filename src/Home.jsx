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
    // 如果需要完全退出应用，可以使用 exit 方法
  };
  const activeClass = ["start", "set", "close"];
  const keyEvents = [
    {
      type: "press",
      key: 37,
      callback: () => setActiveButton(activeButton > 1 ? activeButton - 1 : 3),
    },
    {
      type: "press",
      key: 39,
      callback: () => setActiveButton(activeButton < 3 ? activeButton + 1 : 1),
    },
    {
      type: "press",
      key: 13,
      callback: () => {
        if (activeButton == 1) navigate("/GamePage");
        else if (activeButton == 2) navigate("/SetPage");
        else if (activeButton == 3) handleExit();
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
      // 卸载时解绑当前注册的事件
      unregisterFns.forEach((off) => off());

      KeyManager.deactivateListener();
    };
  });

  return (
    <div className="menuCon">
      <div className="buttonBox">
        <button
          className={activeButton == 1 && "active"}
          onClick={() => navigate("/GamePage")}
        >
          开始游戏
        </button>
        <button
          className={activeButton == 2 && "active"}
          onClick={() => navigate("/SetPage")}
        >
          设置
        </button>
        <button
          className={activeButton == 3 && "active"}
          onClick={() => handleExit()}
        >
          退出游戏
        </button>{" "}
        {/* 退出游戏关闭窗口 */}
      </div>
    </div>
  );
}

export default Home;
