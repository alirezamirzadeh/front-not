import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';

const scrollPositions = new Map<string, number>();

export const useScrollLocker = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const position = scrollPositions.get(location.pathname);
    if (typeof position === 'number') {
      document.documentElement.scrollTo(0, position);
      scrollPositions.delete(location.pathname);
    }

    const handleBeforeUnload = () => {
      scrollPositions.set(location.pathname, document.documentElement.scrollTop);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload();
    };
  }, [location.pathname]);
};