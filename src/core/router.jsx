// src/routes.js
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// 懒加载页面
const Home = lazy(() => import("../Home"));
const SetCom = lazy(() => import("../components/Set.jsx"));
const GamePage = lazy(() => import("../GamePage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    meta: { title: "Home" },
  },
  {
    path: "/GamePage",
    element: <GamePage />,
    meta: { title: "GamePage" },
  },
  {
    path: "/SetPage",
    element: <SetCom />,
    meta: { title: "SetPage" },
  },
  {
    path: "*",
    element: <Home />,
    meta: { title: "Home" },
  },
]);


