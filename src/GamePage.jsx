import { useEffect } from "react";
import KeyManager from "./core/Keyboard";
    const keyEvents = [
      { type: "down", key: 37, callback: () => console.log("← move callback A") },
      { type: "down", key: 37, callback: () => console.log("← move callback B") },
      { type: "press", key: 32, callback: () => console.log("Space 完整事件 A") },
      { type: "press", key: 32, callback: () => console.log("Space 完整事件 B") },
    ];

function GamePage() {
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
  }, []);

  return <div>Game Page</div>;
}

export default GamePage;
