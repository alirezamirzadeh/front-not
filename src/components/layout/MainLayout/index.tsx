// src/components/layout/MainLayout.tsx
// این کد صحیح است و نیازی به تغییر ندارد

import { Outlet, useLocation } from 'react-router';
import BottomNavigation from '../BottomNavigation';
import { memo } from 'react';

const MainLayout = memo(() => {
    const location = useLocation();
    const showBottomNav = ['/', '/account'].includes(location.pathname);

    return (
        <div>
            <main className='safe-area '>
                <Outlet />
            </main>
            {/* اطمینان حاصل کنید که ScrollRestoration اینجا نیست */}
            {showBottomNav && <BottomNavigation />}
        </div>
    );
});

export default MainLayout;