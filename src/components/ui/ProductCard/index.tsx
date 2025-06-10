import { memo, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useShallow } from 'zustand/react/shallow';
import type { Product } from "@/types/Product";

import Carousel from "../Carousel";
import { useViewTransition } from "@/hooks/useViewTransition";
import { useProductsStore } from "@/store/productsStore";
// import { useCartStore } from "@/store/cartStore";

export const ProductCard = memo(({ product, positionInGrid }: { product: Product; positionInGrid: 'left' | 'right' }) => {
    const navigateWithTransition = useViewTransition();
    const [isInteracting, setIsInteracting] = useState(false);
    const [direction, setDirection] = useState(0);

    const { selectedIndex, setSelectedImageIndex } = useProductsStore(
        useShallow((state) => ({
            // ۱. مقداردهی اولیه ایندکس بر اساس ID محصول، اگر در store وجود نداشت
            // این تضمین می‌کند که هر کارت با تصویر منحصر به فرد خودش شروع شود
            selectedIndex: state.selectedImageIndices[product.id] ?? (product.id - 1) % product.images.length,
            setSelectedImageIndex: state.setSelectedImageIndex,
        }))
    );
    // ... (بقیه هوک‌ها و توابع بدون تغییر) ...
    // const isInCart = useCartStore((state) => state.items.some((item) => item.id === String(product.id)));

    const handlePageChange = useCallback((newPage: number, newDirection: number) => {
        setSelectedImageIndex(product.id, newPage);
        setDirection(newDirection);
    }, [product.id, setSelectedImageIndex]);

    const handleClick = useCallback(() => {
        navigateWithTransition(`/product/${product.id}`);
    }, [navigateWithTransition, product.id]);

    const handleInteractionStart = useCallback(() => setIsInteracting(true), []);
    const handleInteractionEnd = useCallback(() => setIsInteracting(false), []);

    const carouselSlides = useMemo(() => (
        product.images.length > 0
            ? product.images.map((url, idx) => (
                <div key={idx} className="w-full h-full bg-gray-200 dark:bg-white/10">
                    <img className="w-full h-full object-cover" src={url} alt={`${product.name} ${idx + 1}`} loading="lazy" />
                </div>
            ))
            : [<div key="placeholder" className="w-full aspect-square bg-gray-200 dark:bg-white/10" />]
    ), [product.images, product.name]);

    const renderPrice = () => {
        if (product.left === 0) return <span className="opacity-60">Out of stock</span>;
        return (
            <>

                {product.price.toLocaleString()}
                <span className="opacity-50 ml-1"> {product.currency}</span>
                {(product.id === 2 || product.id === 5) && <span className="opacity-80  text-black/50 dark:text-white/50 ml-1 line-through">{(product.price + product.price * (product.id === 2 ? 0.1 : 0.15)).toLocaleString()} </span>}
            </>
        );
    };

    const cardVariants = useMemo(() => {
        const shouldGoUnder = positionInGrid === 'right' && direction === -1;
        return {
            rest: { scale: 1, zIndex: 1, boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' },
            hover: {
                scale: 1.08,
                zIndex: shouldGoUnder ? 5 : 10,
                boxShadow: '0px 15px 30px rgba(0,0,0,0.2)'
            },
        }
    }, [positionInGrid, direction]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={handleClick}
            onHoverStart={handleInteractionStart}
            onHoverEnd={handleInteractionEnd}
            className="cursor-pointer relative flex flex-col"
        >
            <motion.div
                animate={isInteracting ? "hover" : "rest"}
                className="relative rounded-2xl"
                variants={cardVariants}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                {/* ... (بقیه JSX بدون تغییر) ... */}
                <Carousel
                    page={selectedIndex}
                    direction={direction}
                    onPageChange={handlePageChange}
                    onInteractionStart={handleInteractionStart}
                    onInteractionEnd={handleInteractionEnd}
                >
                    {carouselSlides}
                </Carousel>
            </motion.div>
            <div className="p-2 pt-3">
                <p className="font-semibold truncate text-gray-800 dark:text-gray-200">{product.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex">{renderPrice()}</p>
            </div>
        </motion.div>
    );
});