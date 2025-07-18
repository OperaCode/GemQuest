import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { GroupsProvider } from "./context/GroupContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer position="top-right" />
      <GroupsProvider>
        <App />
      </GroupsProvider>
    </BrowserRouter>
  </StrictMode>
);
