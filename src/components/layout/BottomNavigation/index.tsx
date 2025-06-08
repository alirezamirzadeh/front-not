import { NavLink } from 'react-router'
import profile from '/images/profile.png'
import NotCoin from '../../icon/NotCoinIcon'
import Button from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/ui';
import { useLaunchParams } from "@telegram-apps/sdk-react";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
export default function BottomNavigation() {
    const { items } = useCartStore();
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const launchParams = useLaunchParams();
    const user = launchParams.tgWebAppData?.user;
    const isKeyboardOpen = useDetectKeyboardOpen();
    
    return (
        <div className={cn(total > 0 ? "border-t-0 shadow-xs" : " border-t-[0.33px]  dark:border-white/8 border-black/8",isKeyboardOpen ?"opacity-0" : "opacity-100", 'fixed -bottom-[1px] left-0 right-0  overflow-hidden bg-white dark:bg-black  h-[83px] flex px-4 z-50')}>
            {total > 0 ? <Button className='mt-2'>{`Buy for ${total.toLocaleString()} NOT`}</Button> :
                <>
                    <NavLink to="/" end className={({ isActive }) =>
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
                            `flex-1  flex  cursor-pointer bg  flex-col items-center justify-start h-full pt-[7px] duration-300  ease-in-out ${isActive ? "opacity-100" : "opacity-50"
                            }`
                        }
                    >
                        <img src={user?.photo_url ?? profile} alt="" className='rounded-full ' width={24} height={24} />        <p className="text-[10px]">{user?.first_name ?? "Profile"}</p>
                    </NavLink>
                </>
            }
        </div>
    )
}
