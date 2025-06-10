import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { cn } from '@/lib/ui';

type Props = { scale?: boolean };

export default function Profile({ scale }: Props) {
    const { tgWebAppData } = useLaunchParams();
    const user = tgWebAppData?.user;
    
    // ۱. استفاده از state برای مدیریت لود شدن تصویر
    const [isLoaded, setIsLoaded] = useState(false);

    if (!user) return <ProfileSkeleton scale={scale} />;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={cn(scale ? "gap-[1.5px]" : "gap-4 py-6", "flex flex-col items-center")}
        >
            <div className={cn(scale ? `w-6 h-6` : "w-24 h-24", "relative")}>
                {/* ۲. انیمیشن زیبا برای اسکلت و تصویر با AnimatePresence */}
                <AnimatePresence>
                    {!isLoaded && (
                        <motion.div
                            key="skeleton"
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 rounded-full bg-gray-200 dark:bg-white/10"
                        />
                    )}
                </AnimatePresence>
                <motion.img
                    src={user.photo_url || ''} // اطمینان از اینکه src هرگز undefined نیست
                    alt={user.first_name || 'Profile'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    onLoad={() => setIsLoaded(true)}
                    className={cn(scale ? `w-6 h-6` : "w-24 h-24", "rounded-full object-cover")}
                />
            </div>
            <h2 className={cn(scale ? "text-[10px] font-medium" : 'text-xl font-semibold')}>
                {user.first_name}
            </h2>
        </motion.div>
    );
}

function ProfileSkeleton({ scale }: { scale?: boolean }) {
    return (
        <div className={cn(scale ? "gap-[1.5px]" : "gap-4 py-6", "flex flex-col items-center animate-pulse")}>
            <div className={cn(scale ? `w-6 h-6` : "w-24 h-24", "rounded-full bg-gray-200 dark:bg-white/10")} />
            <div className={cn(scale ? "hidden" : "w-32 h-6", "rounded bg-gray-200 dark:bg-white/10")} />
        </div>
    );
}