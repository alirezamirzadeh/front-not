import React, { useState, useEffect } from "react"
import type { TouchEvent } from "react"

export default function Carousel({
    children: slides,
    autoSlide = false,
    autoSlideInterval = 3000,
}: {
    children: React.ReactNode[];
    autoSlide?: boolean;
    autoSlideInterval?: number;
}) {
    const [curr, setCurr] = useState(Math.floor(slides.length / 2))
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)

    const prev = () =>
        setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
    const next = () =>
        setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

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
        <div className="overflow-hidden relative w-full ">
            <div
                className="flex transition-transform ease-out duration-500 w-full"
                style={{ transform: `translateX(-${curr * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {React.Children.map(slides, (slide) => (
                    <div className="w-full flex-shrink-0">
                        {slide}
                    </div>
                ))}
            </div>

            <div className="absolute bottom-[9px] right-0 left-0 ">
                <div className="flex items-center justify-center gap-[3px]">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`
              transition-all bg-white dark:bg-gray-200
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