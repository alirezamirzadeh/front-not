// src/index.tsx
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  bindThemeParamsCssVars,
  init as initSDK,

  mountMiniAppSync,

  themeParams
} from "@telegram-apps/sdk-react";
import "./index.css"
initSDK();
themeParams.mountSync()
bindThemeParamsCssVars()
if (mountMiniAppSync.isAvailable()) {
  mountMiniAppSync();                       
}
if (themeParams.mountSync.isAvailable()) {
  themeParams.mountSync();                 
}
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
