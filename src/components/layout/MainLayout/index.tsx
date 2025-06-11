import { Outlet, useLocation } from 'react-router';
import BottomNavigation from '../BottomNavigation';
import { memo } from 'react';
import { GlobalBackButtonHandler } from '@/hooks/GlobalBackButtonHandler';

const MainLayout = memo(() => {
    const location = useLocation();
    const showBottomNav = ['/', '/account'].includes(location.pathname);

    return (
        <div>
            <main className='safe-area '>
                <Outlet />
            </main>
            {showBottomNav && <BottomNavigation />}
            <GlobalBackButtonHandler />

        </div>
    );
});

export default MainLayout;