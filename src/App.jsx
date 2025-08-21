import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./core/router.jsx";

export default function App() {
  // useEffect(() => {
  //   // 禁止右键菜单
  //   const blockContextMenu = (e) => e.preventDefault();
  //   document.addEventListener("contextmenu", blockContextMenu);
  //   return () => {
  //     document.removeEventListener("contextmenu", blockContextMenu);
  //   };
  // }, []);

  return <RouterProvider router={router} />;
}
