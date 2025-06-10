// src/components/App.tsx

import { useEffect } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useTheme } from './hooks/useTheme';
import { initTelegram } from './lib/initTelegram';
import RoutesConfig from './routes';
import { miniApp, viewport, themeParams, useLaunchParams } from '@telegram-apps/sdk-react';
import { useNavigate } from 'react-router';


const App = () => {
  useTheme();
  // const params = useLaunchParams()
  // const startParam = params.tgWebAppStartParam
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (startParam) {
  //     const productId = startParam.split("_")[1];
  //     if (productId) {
  //       navigate("/product/" + productId);
  //     }
  //   }
  // }, [])
  const lp = useLaunchParams();

  

  useEffect(() => {
    initTelegram(lp);


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
  }, []);
  console.log("App");

  return (
    <TonConnectUIProvider manifestUrl="https://not-shop-psi.vercel.app/">
      <RoutesConfig />
    </TonConnectUIProvider>
  );
};

export default App;
