import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import BottomNavigation from '../BottomNavigation';
// import BottomNavigation from '../BottomNavigation';

const MainLayout = React.memo(() => {
    console.log("MainLayout");
    return (
        <>
            <main className='safe-area '>
                <Outlet />
            </main>

            <ScrollRestoration
                getKey={(location, _) => location.pathname} />
            <BottomNavigation />


        </>
    );
});

export default MainLayout;
