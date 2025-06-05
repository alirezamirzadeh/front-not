import { NavLink } from 'react-router'
import profile from '/images/profile.png'
import NotCoin from '../../icon/NotCoinIcon'
import Button from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/ui';

export default function BottomNavigation() {
    const { items } = useCartStore();
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className={cn(total > 0 ? "border-t-0 shadow-xs" : " border-t-[0.33px]  dark:border-white/8 border-black/8", 'fixed bottom-0 left-0 right-0  overflow-hidden bg-white dark:bg-black  h-[83px] flex px-4')}>
            {total > 0 ? <Button className='mt-2'>{`Buy for ${total} NOT`}</Button> :
                <><NavLink to="/" end className={({ isActive }) =>
                    `flex-1  flex flex-col items-center justify-start 
            duration-300 cursor-pointer   ease-in-out h-full pt-[7px] ${isActive ? "opacity-100" : "opacity-50"
                    }`
                }>
                    <NotCoin className="fill-black text-black w-[28px] h-[28px] dark:fill-white dark:text-white" />
                    <p className='text-[10px]'>Store</p>
                </NavLink>
                    <NavLink
                        to="/account"
                        end
                        className={({ isActive }) =>
                            `flex-1  flex  cursor-pointer  flex-col items-center justify-start h-full pt-[7px] duration-300 ease-in-out ${isActive ? "opacity-100" : "opacity-50"
                            }`
                        }
                    >
                        <img src={profile} alt="profile" className='rounded-full ' width={24} height={24} />        <p className="text-[10px]">Alex</p>
                    </NavLink>
                </>
            }
        </div>
    )
}
