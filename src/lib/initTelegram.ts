
import { backButton, isTMA,  swipeBehavior, viewport } from '@telegram-apps/sdk-react';

export const initTelegram = async () => {
  backButton.mount();

  if (swipeBehavior.isSupported() && swipeBehavior.mount.isAvailable()) {
    swipeBehavior.mount();
    swipeBehavior.disableVertical();
  }

  if (await isTMA()) {
    if (viewport.mount.isAvailable()) {
      await viewport.mount();
      viewport.expand();
    }

    if (viewport.requestFullscreen.isAvailable()) {
      await viewport.requestFullscreen();
    }
  }
};
