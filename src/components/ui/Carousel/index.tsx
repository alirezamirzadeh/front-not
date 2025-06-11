import { memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 1,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

const Carousel = memo(({
  children: slides,
  page,
  direction,
  onPageChange,
  onInteractionStart,
  onInteractionEnd,
  isLaidOut
}: {
  children: React.ReactNode[];
  page: number;
  direction: number;
  onPageChange: (newPage: number, newDirection: number) => void;
  onInteractionStart: () => void;
  onInteractionEnd: () => void;
  isLaidOut?: boolean;
}) => {
  const goToPage = useCallback((newPage: number) => {
    const newDirection = newPage > page ? 1 : -1;
    onPageChange(newPage, newDirection);
  }, [page, onPageChange]);

  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
      <AnimatePresence initial={false} custom={direction} mode={isLaidOut ? undefined : "wait"}>
        {/* انیمیشن تغییر عکس با حرکت و شفافیت */}
        <motion.div
          key={page}
          custom={direction}
          variants={!isLaidOut ? variants : {}}
          transition={!isLaidOut ? {
            type: "tween",
            ease: [0.22, 1, 0.36, 1],
            duration: 0.6,
          } : { duration: 0 }}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={onInteractionStart}
          onDragEnd={(_, { offset, velocity }) => {
            onInteractionEnd();

            const power = swipePower(offset.x, velocity.x);

            // وقتی کشیدن به اندازه کافی باشد، اسلاید تغییر می‌کند.
            if (power < -swipeConfidenceThreshold) {
              const newDirection = 1;
              const newPage = (page + newDirection + slides.length) % slides.length;
              onPageChange(newPage, newDirection);
            } else if (power > swipeConfidenceThreshold) {
              const newDirection = -1;
              const newPage = (page + newDirection + slides.length) % slides.length;
              onPageChange(newPage, newDirection);
            }
          }}
          className="absolute h-full w-full"
        >
          {slides[page]}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-[9px] right-0 left-0 z-10">
        <div className="flex items-center justify-center gap-[4px]">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={(e) => { e.stopPropagation(); if (i !== page) goToPage(i); }}
              className={`transition-all duration-300 cursor-pointer
                bg-white/50 dark:bg-gray-200/50  
                ${page === i
                  ? "w-[20px] h-[4px] rounded-[4px] !bg-white dark:!bg-gray-200"
                  : `rounded-full ${Math.abs(i - page) === 1
                    ? "w-[4px] h-[4px] opacity-50"
                    : Math.abs(i - page) === 2
                      ? "w-[3px] h-[3px] opacity-40"
                      : "w-[2px] h-[2px] opacity-30"
                  }`
                }
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default Carousel;
