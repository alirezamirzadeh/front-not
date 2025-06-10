import { Outlet, ScrollRestoration } from 'react-router'; 
import BottomNavigation from '../BottomNavigation';
import { memo } from 'motion/react';

const MainLayout = memo(() => {
    console.log("MainLayout rendered");
    return (
        <>
            <main className='safe-area'>
                <Outlet />
            </main>

            <ScrollRestoration getKey={(location) => location.pathname} />
            <BottomNavigation />
        </>
    );
});

export default MainLayout;