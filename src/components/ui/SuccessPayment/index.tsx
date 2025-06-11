import useLottieAnimation from "@/hooks/useLottieAnimation";
import Button from "../Button";
import { AnimatePresence, motion } from "motion/react";

export default function SuccessPayment({ setShow }: { setShow: (show: boolean) => void }) {
    const containerRef = useLottieAnimation("/boom.tgs")
    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="absolute !z-[9999999]  bg-black/15 backdrop-blur-sm top-0  left-0 overflow-hidden w-screen h-screen flex flex-col items-center  justify-center px-4 gap-6 text-white">
                    <div className="w-64 h-64 -translate-y-12" ref={containerRef}></div>
                    <div className="flex flex-col gap-2 text-center">
                        <p className="text-main">You Got It!</p>
                        <p className="text-secondary">Your purchase is on the way</p>
                    </div>
                    <Button onClick={() => setShow(false)} className="bg-white  !text-black">Awesome</Button>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
