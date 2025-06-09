import React from 'react';
import { Outlet } from 'react-router';
import BottomNavigation from '../BottomNavigation';

const MainLayout = React.memo(() => {
  console.log("MainLayout");

  return (
    <div className=''>
      <Outlet />
      <BottomNavigation />
    </div>
  );
});

export default MainLayout;
