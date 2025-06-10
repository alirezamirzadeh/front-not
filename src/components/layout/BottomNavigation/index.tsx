import { NavLink } from 'react-router'
import NotCoin from '../../icon/NotCoinIcon'

import { cn } from '@/lib/ui';
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import Profile from '@/components/ui/Profile';
import React, { memo } from 'react';

const NavigationItem = React.memo(({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
    <NavLink
        to={to}
        end
        aria-label={label}
        className={({ isActive }) =>
            cn(
                'flex-1 flex flex-col items-center justify-start h-full pt-[7px]',
                'duration-300 cursor-pointer ease-in-out',
                isActive ? 'opacity-100' : 'opacity-50'
            )
        }
    >
        {icon}
        <p className='text-[10px]'>{label}</p>
    </NavLink>
));

const BottomNavigation = memo(() => {

    const isKeyboardOpen = useDetectKeyboardOpen();

    const containerClasses = cn(
        'fixed bottom-0 left-0 right-0 overflow-hidden',
        'bg-white dark:bg-black h-[83px] flex px-4 z-30 ',
        'border-t-[0.33px] dark:border-white/8 border-black/8',
        isKeyboardOpen && 'opacity-0',
    );


    console.log("BottomNavigation");


    return (
        <div
            className={containerClasses}
            style={{ viewTransitionName: 'bottom-nav' }}
        >

            <div className='flex-1 flex items-center'>
                <NavigationItem
                    to="/"
                    icon={<NotCoin className="fill-black text-black w-6 h-6  scale-[157%] dark:fill-white -translate-y-[1px] dark:text-white" />}
                    label="Store"
                />
                <NavigationItem
                    to="/account"
                    icon={
                        <Profile scale={true} />
                    }
                    label={""}

                />

            </div>

        </div>
    );
})
export default BottomNavigation;
