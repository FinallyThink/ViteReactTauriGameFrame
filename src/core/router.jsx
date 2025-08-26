import { createBrowserRouter } from "react-router-dom";
import Home from "../Home";
import GamePage from "../GamePage";
import SetCom from "../components/Set.jsx";

export const router = createBrowserRouter(
  [
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
  ],
  {
    future: {
      v7_skipActionErrorRevalidation: true,
    },
  }
);
