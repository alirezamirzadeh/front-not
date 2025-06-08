// src/components/App.tsx

import { useEffect } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useTheme } from './hooks/useTheme';
import { initTelegram } from './lib/initTelegram';
import RoutesConfig from './routes';


const App = () => {
  useTheme();

  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <TonConnectUIProvider manifestUrl="https://not-shop-psi.vercel.app/">
      <RoutesConfig />
    </TonConnectUIProvider>
  );
};

export default App;
