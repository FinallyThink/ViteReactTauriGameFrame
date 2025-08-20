// src/routes.js
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// 懒加载页面
const Home = lazy(() => import("../Home"));
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
    path: "*",
    element: <Home />,
    meta: { title: "Home" },
  },
]);


