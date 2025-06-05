import { type ReactNode } from 'react'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`dark:bg-white dark:text-black bg-black text-white flex justify-center items-center  text-[17px] rounded-xl w-full h-[50px] font-[590] ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
