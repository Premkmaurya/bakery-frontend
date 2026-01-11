import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { NavProvider } from "./context/NavContext.jsx";
import gsap from "gsap"


gsap.config({ nullTargetWarn: false });

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NavProvider>
      <App />
    </NavProvider>
  </BrowserRouter>
);
