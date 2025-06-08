import useLottieAnimation from "@/hooks/useLottieAnimation";
import { AnimatePresence, motion } from "motion/react";

export default function NotFoundProducts() {
    const containerRef = useLottieAnimation("/chicken.tgs")
    return (
        <AnimatePresence>
            <motion.div className="  w-full h-screen fixed -z-10   flex justify-center items-center gap-2 flex-col bottom-8"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}>
                <div ref={containerRef} className="w-24 "></div>
                <p className="text-main">Not Found</p>
                <p className="opacity-50 text-secondary">This style doesn’t exist</p>
            </motion.div>
        </AnimatePresence>
    )
}
