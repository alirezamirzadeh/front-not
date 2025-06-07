// src/App.tsx

import  { useEffect } from "react";
import RoutesConfig from "./routes";
import { backButton, miniApp,  themeParams, useSignal } from "@telegram-apps/sdk-react";

function App() {
  const isDark = useSignal(themeParams.isDark);

  useEffect(() => {
    backButton.mount();

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (miniApp.setHeaderColor.isAvailable()) {
      try {
        miniApp.setHeaderColor(isDark ? "#000000" : "#ffffff");
      } catch {
        miniApp.setHeaderColor(isDark ? "#ffffff" : "#000000");
      }
    }
  }, [isDark]);

  return <RoutesConfig />;
}

export default App;
