import { useEffect } from 'react';
import { miniApp, themeParams } from '@telegram-apps/sdk-react';

export const useTheme = () => {
  useEffect(() => {
    const isDark = themeParams.isDark();
    document.documentElement.classList.toggle('dark', isDark);

    

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (miniApp.setHeaderColor.isAvailable()) {
      try {
        miniApp.setHeaderColor(isDark ? '#000000' : '#ffffff');
      } catch {
        miniApp.setHeaderColor(isDark ? '#ffffff' : '#000000');
      }
    }
  }, []);
};
