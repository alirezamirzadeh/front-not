// src/index.tsx
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"
import { scan } from "react-scan";
import React from "react";

scan({
  enabled: true,
});



ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode>
    <App />
</React.StrictMode>);
