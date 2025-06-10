import { bindThemeParamsCssVars, bindViewportCssVars, init, isTMA, miniApp, postEvent, themeParams, useLaunchParams, viewport, type LaunchParams } from '@telegram-apps/sdk-react';

const isVersionAtLeast = (version: string, current?: string) => {
  const v1 = (current ?? useLaunchParams().tgWebAppVersion ?? "0")
    .replace(/^\s+|\s+$/g, "")
    .split(".");
  const v2 = version.replace(/^\s+|\s+$/g, "").split(".");
  const a = Math.max(v1.length, v2.length);
  let p1: number | undefined;
  let p2: number | undefined;
  for (let i = 0; i < a; i++) {
    p1 = Number.parseInt(v1[i]) || 0;
    p2 = Number.parseInt(v2[i]) || 0;
    if (p1 === p2) continue;
    if (p1 > p2) return true;
    return false;
  }
  return true;
};

const handleTheme = (isDark: boolean) => {
  document.body.setAttribute("data-theme", isDark ? "dark" : "light");

  postEvent("web_app_set_header_color", {
    color: isDark ? "#000000" : "#ffffff",
  });

  postEvent("web_app_set_background_color", {
    color: isDark ? "#000000" : "#ffffff",
  });

  postEvent("web_app_set_bottom_bar_color", {
    color: isDark ? "#000000" : "#ffffff",
  });
};


export const initTelegram = async (lp: LaunchParams) => {
  if (!isTMA()) return;


  init();
  if (miniApp.mountSync.isAvailable() && !miniApp.isMounted()) {
    miniApp.mountSync();
    handleTheme(miniApp.isDark());
    miniApp.isDark.sub(handleTheme);
  }
  if (themeParams.mountSync.isAvailable() && !themeParams.isMounted()) {
    themeParams.mountSync();
    bindThemeParamsCssVars();
  }

  if (viewport.mount.isAvailable() && !viewport.isMounted()) {
    try {
      await viewport.mount();
      bindViewportCssVars();
    } catch (error) {
      console.error("Error mounting viewport:", error);
    }
  }
  postEvent("web_app_setup_back_button", {
    is_visible: false,
  });

  postEvent("web_app_setup_main_button", {
    is_visible: false,
  });

  postEvent("web_app_setup_secondary_button", {
    is_visible: false,
  });

  postEvent("web_app_setup_settings_button", {
    is_visible: false,
  });

  postEvent("web_app_ready");
  postEvent("iframe_ready");
  postEvent("web_app_expand");
  // await initializeViewport();

  if (viewport.mount.isAvailable()) {
    viewport.expand();
  }

  if (viewport.requestFullscreen.isAvailable()) {
    await viewport.requestFullscreen();
  }

  if (
    viewport.mount.isAvailable() &&
    !(viewport.isMounted() || viewport.isMounting())
  ) {
    await viewport.mount();
    await bindViewportCssVars();


  }


  if (miniApp.mountSync.isAvailable() && !miniApp.isMounted()) {
    miniApp.mountSync();

    handleTheme(miniApp.isDark());
    miniApp.isDark.sub(handleTheme);
  }

  if (themeParams.mountSync.isAvailable() && !miniApp.isMounted()) {
    themeParams.mountSync();
    bindThemeParamsCssVars();
  }

  setTimeout(() => {
    console.log(
      "Before persisting:",
      getComputedStyle(document.documentElement).getPropertyValue(
        "--tg-viewport-safe-area-inset-top-SetTimeOut"
      )
    );
    const persistVariables = [
      "tg-viewport-height",
      "tg-viewport-safe-area-inset-top",
      "tg-viewport-content-safe-area-inset-top",
      "tg-viewport-safe-area-inset-bottom",
      "tg-viewport-content-safe-area-inset-bottom",
    ];
    for (const name of persistVariables) {
      (document.querySelector(":root") as HTMLElement).style.setProperty(
        `--${name}`,
        (document.querySelector(":root") as HTMLElement).style.getPropertyValue(`--${name}`),
      );
    }
    console.log(
      "After persisting:",
      getComputedStyle(document.documentElement).getPropertyValue(
        "--tg-viewport-safe-area-inset-top"
      )
    );
  });

  if (isVersionAtLeast("6.1", lp.tgWebAppVersion)) {
    postEvent("web_app_setup_settings_button", {
      is_visible: true,
    });
  }

  if (isVersionAtLeast("6.2", lp.tgWebAppVersion)) {
    postEvent("web_app_setup_closing_behavior", {
      need_confirmation: false,
    });
  }

  if (isVersionAtLeast("7.7", lp.tgWebAppVersion)) {
    postEvent("web_app_setup_swipe_behavior", {
      allow_vertical_swipe: false,
    });



  }
  if (isVersionAtLeast("8.0", lp.tgWebAppVersion)) {
    postEvent("web_app_toggle_orientation_lock", {
      locked: true,
    });

    if (["ios", "android"].includes(lp.tgWebAppPlatform.toLowerCase())) {
      postEvent("web_app_request_fullscreen");
    }
  }
  if (isVersionAtLeast("7.10", lp.tgWebAppVersion)) {
    if (viewport.requestFullscreen.isAvailable()) {
      try {
        await viewport.requestFullscreen();
      } catch (error) {
        console.error("Fullscreen request failed:", error);
      }
    }
  }
};