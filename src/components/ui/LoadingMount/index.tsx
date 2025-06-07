import { useLaunchParams } from "@telegram-apps/sdk-react"
import { motion } from "motion/react"
import type { Variants } from "motion/react"
import { useEffect } from "react"
import { useNavigate } from "react-router"

function LoadingMount() {
    const dotVariants: Variants = {
        jump: {
            y: -30,
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            },
        },
    }

    const params = useLaunchParams()
    const startParam = params.tgWebAppStartParam
    const navigate = useNavigate()

    useEffect(() => {
        if (startParam) {
            navigate("/product/" + startParam.split("_")[1])
        }
    }, [])

    return (
        <motion.div
            animate="jump"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="flex justify-center items-center gap-2.5 w-screen h-screen"
        >
            <motion.div className="w-5 h-5 rounded-full bg-black dark:bg-white will-change-transform" variants={dotVariants} />
            <motion.div className="w-5 h-5 rounded-full bg-black dark:bg-white will-change-transform" variants={dotVariants} />
            <motion.div className="w-5 h-5 rounded-full bg-black dark:bg-white will-change-transform" variants={dotVariants} />
            &nbsp;
        </motion.div>
    )
}


export default LoadingMount
