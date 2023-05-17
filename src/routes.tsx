import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { NotFound } from "./pages/error_pages";
import { Leaderboard } from "./pages/leaderboard";
import { Questions } from "./pages/questions";
import { Quizzes } from "./pages/quizzes";
import { Stats } from "./pages/stats";
import { Auth } from "./pages/auth";
import { Attempts } from "./pages/attempts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    loader: async () => {
      // TODO: Check if user logged in
      // if (!user) { return redirect("/login"); }
      return null; // Note: Specific data will be fetched inside respective components, not here
    },
    children: [
      {
        path: "/",
        element: <Leaderboard />,
      },
      {
        path: "/leaderboard/",
        element: <Leaderboard />,
      },
      {
        path: "/questions/",
        element: <Questions />,
      },
      {
        path: "/quizzes/",
        element: <Quizzes />,
      },
      {
        path: "/attempts/",
        element: <Attempts />,
      },
      {
        path: "/stats/",
        element: <Stats />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);
