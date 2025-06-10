import { AnimatePresence, motion } from "motion/react";

export default function SkeletonProducts() {
    return (
        <AnimatePresence>
            <div className="grid grid-cols-2 gap-4 px-4  mb-16">
                {Array.from({ length: 6 }).map((_, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 0.8,
                            delay: idx * 0.1,
                        }}
                        className="space-y-2 "
                    >
                        <div className="rounded-2xl aspect-square bg-gray-200 dark:bg-white/10 animate-pulse" />

                        <div className="h-5 w-3/4 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                        <div className="h-4 w-1/2 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                    </motion.div>
                ))}
            </div>
        </AnimatePresence>
    )
}
