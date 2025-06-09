// src/index.tsx
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  // bindThemeParamsCssVars,
  init as initSDK,
  miniApp,
  // mountMiniAppSync,
  // themeParams
} from "@telegram-apps/sdk-react";
import "./index.css"
import { scan } from "react-scan";
import React from "react";
import { BrowserRouter } from "react-router";

scan({
  enabled: true,
});

initSDK();

if (miniApp.mountSync.isAvailable()) {
  miniApp.mountSync();
  miniApp.isMounted();
}

if (miniApp.bindCssVars.isAvailable()) {
  miniApp.bindCssVars();


  miniApp.isCssVarsBound();
}

ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</React.StrictMode>);
