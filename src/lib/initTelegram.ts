import {
  bindThemeParamsCssVars,
  bindViewportCssVars,
  init,
  isTMA,
  miniApp,
  postEvent,
  themeParams,
  useLaunchParams,
  viewport,
  type LaunchParams
} from '@telegram-apps/sdk-react';

// ۱. فلگ برای جلوگیری از اجرای چندباره منطق در StrictMode
let isInitialized = false;

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
  // تمام منطق postEvent شما برای تم حفظ شده است
  postEvent("web_app_set_header_color", { color: isDark ? "#000000" : "#ffffff" });
  postEvent("web_app_set_background_color", { color: isDark ? "#000000" : "#ffffff" });
  postEvent("web_app_set_bottom_bar_color", { color: isDark ? "#000000" : "#ffffff" });
};

// تابع اصلی که حالا در برابر اجرای چندباره مقاوم است
export const initTelegram = async (lp: LaunchParams) => {
  // ۲. اگر در محیط تلگرام نیستیم یا قبلاً راه‌اندازی شده، هیچ کاری نکن
  if (!isTMA() || isInitialized) {
    return;
  }
  // ۳. فلگ را بلافاصله true می‌کنیم تا اجرای بعدی وارد نشود
  isInitialized = true;

  console.log("Initializing Telegram SDK for the first time...");

  // ۴. تمام کد و منطق اصلی شما دست‌نخورده باقی مانده است
  try {
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
      await viewport.mount();
      bindViewportCssVars();
    }

    postEvent("web_app_setup_back_button", { is_visible: false });
    postEvent("web_app_setup_main_button", { is_visible: false });
    postEvent("web_app_setup_secondary_button", { is_visible: false });
    postEvent("web_app_setup_settings_button", { is_visible: false });
    postEvent("web_app_ready");
    postEvent("iframe_ready");
    postEvent("web_app_expand");

    if (viewport.mount.isAvailable()) {
      viewport.expand();
    }

    // منطق fullscreen شما حفظ شده است
    if (isVersionAtLeast("7.10", lp.tgWebAppVersion)) {
      if (viewport.requestFullscreen.isAvailable()) {
        await viewport.requestFullscreen();
      }
    }

    // منطق setTimeout برای safe area شما حفظ شده است
    setTimeout(() => {
      const persistVariables = [
        "tg-viewport-height",
        "tg-viewport-safe-area-inset-top",
        "tg-viewport-content-safe-area-inset-top",
        "tg-viewport-safe-area-inset-bottom",
        "tg-viewport-content-safe-area-inset-bottom",
      ];
      const root = document.querySelector(":root") as HTMLElement;
      if (!root) return;
      for (const name of persistVariables) {
        root.style.setProperty(`--${name}`, getComputedStyle(root).getPropertyValue(`--${name}`));
      }
    });

    // تمام منطق isVersionAtLeast شما حفظ شده است
    if (isVersionAtLeast("6.1", lp.tgWebAppVersion)) {
      postEvent("web_app_setup_settings_button", { is_visible: true });
    }
    if (isVersionAtLeast("6.2", lp.tgWebAppVersion)) {
      postEvent("web_app_setup_closing_behavior", { need_confirmation: false });
    }
    if (isVersionAtLeast("7.7", lp.tgWebAppVersion)) {
      postEvent("web_app_setup_swipe_behavior", { allow_vertical_swipe: false });
    }
    if (isVersionAtLeast("8.0", lp.tgWebAppVersion)) {
      postEvent("web_app_toggle_orientation_lock", { locked: true });
      if (["ios", "android"].includes(lp.tgWebAppPlatform.toLowerCase())) {
        postEvent("web_app_request_fullscreen");
      }
    }
  } catch (error) {
    console.error("Error during Telegram SDK initialization:", error);
    isInitialized = false; // در صورت خطا، اجازه اجرای مجدد را بده
  }
};