import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Predict from "./pages/Predict.jsx";
import NewJournal from "./pages/NewJournal.jsx";

const api_url = {
  model_api: "http://127.0.0.1:8080",
  web_api: "http://127.0.0.1:5000",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home web_api_url={api_url.web_api} />,
  },
  {
    path: "/input-journal",
    element: (
      <NewJournal
        model_api_url={api_url.model_api}
        web_api_url={api_url.web_api}
      />
    ),
  },
  {
    path: "/predict",
    element: <Predict model_api_url={api_url.model_api} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
