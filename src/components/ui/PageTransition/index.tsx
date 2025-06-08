import { motion } from "motion/react";
import type { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.3
            }}
        >
            {children}
        </motion.div>
    );
}; 