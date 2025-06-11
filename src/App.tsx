import {  useEffect } from 'react';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { miniApp, themeParams, useLaunchParams, viewport } from '@telegram-apps/sdk-react';
import { initTelegram } from './lib/initTelegram';
import Routes from './routes';
import { useTheme } from './hooks/useTheme';

function App() {
  useTheme();

  const launchParams = useLaunchParams();

  useEffect(() => {
    initTelegram(launchParams);

    return () => {
      if (viewport.isMounted()) {
        viewport.unmount();
      }

      if (miniApp.isMounted()) {
        miniApp.unmount();
        miniApp.isDark.unsubAll();
      }

      if (themeParams.isMounted()) {
        themeParams.unmount();
      }
    };
  }, [launchParams]);

  console.log("App Rendered");

  return (
    <TonConnectUIProvider manifestUrl="https://not-shop-psi.vercel.app/tonconnect-manifest.json">
      <div className="bg-white text-black dark:bg-black dark:text-white">
          <Routes />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;