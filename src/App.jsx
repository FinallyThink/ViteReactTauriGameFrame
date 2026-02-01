import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./core/router.jsx";
import { ensureInitFiles } from "./core/fileSystem.js";
import audioManager from "./core/AudioManager.js";
import "./global.less";

export default function App() {
  useEffect(() => {
    const blockContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", blockContextMenu);
    return () => document.removeEventListener("contextmenu", blockContextMenu);
  }, []);

  useEffect(() => {
    let canceled = false;

    (async () => {
      await ensureInitFiles();
      if (canceled) return;
      await audioManager.initSet();
    })();

    return () => {
      canceled = true;
    };
  }, []);

  return <RouterProvider router={router} />;
}
