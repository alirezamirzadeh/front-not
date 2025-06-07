import { motion } from "motion/react";


export const LoadingSkeletonSingleProduct = () => (
    <div className="container mx-auto h-screen overflow-y-hidden flex flex-col">
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.8,
            }}
            className="flex flex-col gap-3 pt-4 px-4 h-full"
        >
            <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-200 dark:bg-white/5 rounded w-3/4"></div>
                <div className="h-6 w-6 bg-gray-200 dark:bg-white/5 rounded-full"></div>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-white/5 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-white/5 rounded w-1/3 mb-4"></div>

            <div className="w-full rounded-[20px] overflow-hidden flex-grow bg-gray-200 dark:bg-white/5"></div>

            <div className="flex space-x-2 no-scrollbar overflow-x-auto pb-2 flex-shrink-0">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="w-20 h-20 flex-shrink-0 rounded-2xl bg-gray-200 dark:bg-white/5"></div>
                ))}
            </div>

            <div className="flex gap-2 mt-auto h-[83px]">
                <div className="flex-1 h-[50px] bg-gray-200 dark:bg-white/5 rounded-xl"></div>
                <div className="flex-1 h-[50px] bg-gray-200 dark:bg-white/5 rounded-xl"></div>
            </div>
        </motion.div>
    </div>
);