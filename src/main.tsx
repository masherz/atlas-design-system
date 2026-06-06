import React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "./components/Button";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main style={{ padding: "var(--atlas-space-xl)" }}>
      <Button>Atlas Button</Button>
    </main>
  </React.StrictMode>,
);
