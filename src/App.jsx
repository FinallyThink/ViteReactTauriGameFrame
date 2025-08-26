import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./core/router.jsx";
import { checkInitFile } from "./core/fileSystem.js";
import audioManager from "./core/AudioManager.js";
import "./global.less"; // 全局样式
export default function App() {
  useEffect(() => {
    // 禁止右键菜单
    const blockContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", blockContextMenu);
    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
    };
  }, []);
  useEffect(() => {
    // 初始化文件系统
    checkInitFile();
    audioManager.initSet()
  }, []);

  return <RouterProvider router={router} />;
}
