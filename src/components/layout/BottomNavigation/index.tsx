import { NavLink } from 'react-router'
import NotCoin from '../../icon/NotCoinIcon'
import Button from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/ui';
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import Profile from '@/components/ui/Profile';

const NavigationItem = ({ to, icon, label }: {
    to: string;
    icon: React.ReactNode;
    label: string;
}) => (
    <NavLink
        to={to}
        end
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
);

export default function BottomNavigation({ isProductPage }: { isProductPage: boolean }) {
    const { items } = useCartStore();
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const isKeyboardOpen = useDetectKeyboardOpen();

    const containerClasses = cn(
        'fixed bottom-0 left-0 right-0 overflow-hidden',
        'bg-white dark:bg-black h-[83px] flex px-4 z-[9999] ',
        total > 0 ? 'border-t-0 shadow-xs' : 'border-t-[0.33px] dark:border-white/8 border-black/8',
        isKeyboardOpen ? 'opacity-0' : 'opacity-100',
        isProductPage ? "opacity-0" : 'opacity-100'
    );

    return (
        <div
            className={containerClasses}
            style={{ viewTransitionName: 'bottom-nav' }}
        >
            {total > 0 ? (
                <Button className='mt-2'>
                    {`Buy for ${total.toLocaleString()} NOT`}
                </Button>
            ) : (
                <div className='flex-1 flex items-center'>
                    <NavigationItem
                        to="/"
                        icon={<NotCoin className="fill-black text-black w-[20px] h-[20px] scale-[180%] mt-[px] dark:fill-white -translate-y-[2px] dark:text-white" />}
                        label="Store"
                    />
                    <NavigationItem
                        to="/account"
                        icon={ (<div className='-translate-y-[76px] scale-[47%]'>
                        <Profile scale={50} />
                    </div>)}
                        label={""}

                    />
         
                </div>
            )}
        </div>
    );
}
