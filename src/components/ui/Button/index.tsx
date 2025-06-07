import { motion, type HTMLMotionProps } from "framer-motion";
import type {  ReactNode } from "react";


// ترکیب با تایپهای اختصاصی Framer Motion
interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  className?: string;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      {...props}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileTap={{ scale: 0.95 }}
      className={`dark:bg-white flex justify-center items-center  dark:text-black bg-black text-white 
                  rounded-xl w-full h-12 font-medium ${className}`}
    >
      {children}
    </motion.button>
  );
}
