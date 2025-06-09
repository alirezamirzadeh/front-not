import CartIcon from "@/components/icon/CartIcon"
import { motion } from "motion/react"
import type { Variants } from "motion/react"


function LoadingMount() {
    const dotVariants: Variants = {
        jump: {
            y: -20,
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            },
        },
    }
    console.log("LoadingMount");


    return (
        <div className="h-screen flex gap-8 flex-col justify-center items-center w-full">
            <motion.div initial={{ opacity: 0.2, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }} className="flex -translate-y-20 flex-col items-center animate-pulse ">
                <CartIcon className="w-24 h-24" />
                <p className="text-main">Not Store</p>
            </motion.div>
            <motion.div
                animate="jump"
                transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
                className="flex justify-center items-center  gap-2.5 w-screen "
            >
                <motion.div className="w-5 h-5 rounded-full bg-black dark:bg-white will-change-transform" variants={dotVariants} />
                <motion.div className="w-5 h-5 rounded-full bg-black dark:bg-white will-change-transform" variants={dotVariants} />
                <motion.div className="w-5 h-5 rounded-full bg-black dark:bg-white will-change-transform" variants={dotVariants} />

            </motion.div>
        </div>
    )
}


export default LoadingMount
