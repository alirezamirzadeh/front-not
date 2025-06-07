import { motion, AnimatePresence } from 'framer-motion';
import { useHistoryStore } from '@/store/historyStore';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import profile from '/images/profile.png'
import { useState } from 'react';

const ProfileSkeleton = () => {
    return (
        <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
            <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-6 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                <div className="w-24 h-4 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
            </div>
            <div className="flex gap-8 mt-2">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-6 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                    <div className="w-20 h-4 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-6 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                    <div className="w-20 h-4 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
};

export default function Profile() {
    const launchParams = useLaunchParams();
    const user = launchParams.tgWebAppData?.user;
    const { history } = useHistoryStore();
    const totalSpent = history.reduce((sum, item) => sum + item.total, 0);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    if (!history.length) return <ProfileSkeleton />;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', staggerChildren: 0.1 }}
            className="flex flex-col items-center gap-4 py-6"
        >
            <motion.div className="relative" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <AnimatePresence mode="wait">
                    {!isImageLoaded && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-24 h-24 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse absolute inset-0"
                        />
                    )}
                </AnimatePresence>
                <motion.img
                    src={user?.photo_url ?? profile}
                    alt="profile"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isImageLoaded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-24 h-24 rounded-full object-cover"
                    onLoad={() => setIsImageLoaded(true)}
                />

            </motion.div>

            <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
            >
                <motion.h2
                    className="text-xl font-semibold"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    {user?.first_name ?? ""}
                </motion.h2>
                
            </motion.div>

            <motion.div
                className="flex gap-8 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                <motion.div
                    className="flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <span className="text-2xl font-bold opacity-85">{history.length.toLocaleString()}</span>
                    <span className="text-sm opacity-50">Transactions</span>
                </motion.div>
                <motion.div
                    className="flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <span className="text-2xl font-bold opacity-85">{totalSpent.toLocaleString()}</span>
                    <span className="text-sm opacity-50">Total Spent</span>
                </motion.div>
            </motion.div>
        </motion.div>
    );
} 