// src/components/ThemeToggle.tsx

import { useModeAnimation } from 'react-theme-switch-animation'
import Moon from '../../icon/MoonIcon';
import Sun from '../../icon/SunIcon';

export default function ThemeToggle() {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation()

  return (
    <button ref={ref} onClick={toggleSwitchTheme} className='absolute top-3 right-3 p-1.5 flex justify-center items-center rounded-lg bg-black/5 dark:bg-white/15  opacity-80'>
      {isDarkMode ? <Sun />: <Moon />}
    </button>
  );
}
