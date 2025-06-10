import React, { useState, useEffect } from "react"
import type { TouchEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Carousel({
    children: slides,
    autoSlide = false,
    autoSlideInterval = 3000,
    id,
    startIndex = 0,
    onSlideChange
}: {
    children: React.ReactNode[];
    autoSlide?: boolean;
    autoSlideInterval?: number;
    id: number;
    startIndex?: number;
    onSlideChange?: (index: number) => void;
}) {
    const [curr, setCurr] = useState(startIndex ||id -1)

    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)

    const prev = () => {
        const newIndex = curr === 0 ? slides.length - 1 : curr - 1;
        setCurr(newIndex);
        onSlideChange?.(newIndex);
    }

    const next = () => {
        const newIndex = curr === slides.length - 1 ? 0 : curr + 1;
        setCurr(newIndex);
        onSlideChange?.(newIndex);
    }

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [])

    const handleTouchStart = (e: TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > 50
        const isRightSwipe = distance < -50

        if (isLeftSwipe) {
            next()
        }
        if (isRightSwipe) {
            prev()
        }

        setTouchStart(null)
        setTouchEnd(null)
    }
    

    return (
        <div className="overflow-hidden relative w-full rounded-2xl">
            <div className="relative w-full h-full  ">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={curr}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0.8, scale: 0.95, x: (touchStart && touchEnd) ? (touchStart - touchEnd > 0 ? -50 : 50) : 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {slides[curr]}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute bottom-[9px] right-0 left-0">
                <div className="flex items-center  justify-center gap-[4px]">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`
                                transition-all bg-white/5 dark:bg-gray-200
                                ${curr === i
                                    ? "w-[20px] h-[4px] rounded-[4px]"
                                    : `rounded-full ${Math.abs(i - curr) === 1
                                        ? "w-[4px] h-[4px] opacity-20"
                                        : Math.abs(i - curr) === 2
                                            ? "w-[3px] h-[3px] opacity-25"
                                            : "w-[2px] h-[2px] opacity-20"
                                    }`
                                }
                            `}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}