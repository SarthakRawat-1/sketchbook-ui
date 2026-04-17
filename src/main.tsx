import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SketchProvider } from "./lib";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SketchProvider>
      <App />
    </SketchProvider>
  </StrictMode>,
);
