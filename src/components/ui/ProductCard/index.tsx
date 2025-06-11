import { memo, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useShallow } from 'zustand/react/shallow';
import type { Product } from "@/types/Product";
import Carousel from "../Carousel"; 
import { useProductsStore } from "@/store/productsStore";
import TickIcon from "@/components/icon/TickIcon";
import { useCartStore } from "@/store/cartStore";

export const ProductCard = memo(({ product, onClick }: { 
    product: Product; 
    onClick: () => void;
}) => {
    const [direction, setDirection] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);
    
    const handleInteractionStart = useCallback(() => setIsInteracting(true), []);
    const handleInteractionEnd = useCallback(() => {
        setTimeout(() => setIsInteracting(false), 50);
    }, []);

    const {cartItems } = useCartStore((useShallow((s) => ({cartItems: s.items})))) 
    const { selectedIndex, setSelectedImageIndex,animatingProductId, setAnimatingProductId  } = useProductsStore(
        useShallow((state) => ({
            selectedIndex: state.selectedImageIndices[product.id] ?? product.id -1 ,
            setSelectedImageIndex: state.setSelectedImageIndex,
            animatingProductId: state.animatingProductId,
            setAnimatingProductId: state.setAnimatingProductId,
        }))
    );
    const isInCart = cartItems.some(item => item.id === String(product.id));



    const handlePageChange = useCallback((newPage: number, newDirection: number) => {
        setDirection(newDirection);
        setSelectedImageIndex(product.id, newPage);
    }, [product.id, setSelectedImageIndex]);

    const handleClick = () => {
        if (!isInteracting) {
            setAnimatingProductId(product.id);
            onClick();
        }
    };

    const carouselSlides = useMemo(() =>
        product.images.map((_, idx) => (
            <div key={idx} className="w-full h-full" /> 
        )),
        [product.images]
    );

    const renderPrice = () => {
        if (product.left === 0) return <span className="opacity-60">Out of stock</span>;
        return (
            <>

                {product.price.toLocaleString()}
                <span className="opacity-50 ml-1">{product.currency}</span>
                {(product.id === 2 || product.id === 5) && <span className="opacity-80  text-black/50 dark:text-white/50 ml-1 line-through">{(product.price + product.price * (product.id === 2 ? 0.1 : 0.15)).toLocaleString()} </span>}
            </>
        );
    };

    return (
        <div onClick={handleClick} className="cursor-pointer relative flex flex-col group space-y-2">
            <div className="relative aspect-square w-full">
                <motion.img
                    layoutId={`product-image-${product.id}`}
                    src={product.images[selectedIndex]}
                    className="absolute inset-0 w-full h-full object-cover clip-rounded-2xl"
                    style={{ zIndex: product.id === animatingProductId ? 10 : 'auto' }}

                />
                
                <div className="absolute inset-0" onClick={(e) => e.preventDefault()}>
                    <Carousel
                        page={selectedIndex}
                        direction={direction}
                        onPageChange={handlePageChange}
                        onInteractionStart={handleInteractionStart}
                        onInteractionEnd={handleInteractionEnd}
                    >
                        {carouselSlides}
                    </Carousel>
                </div>
            </div>

            {isInCart && (
                <div className="absolute top-2 right-2 z-10 h-[22px] w-[22px] flex justify-center items-center bg-black text-white dark:bg-white dark:text-black rounded-full">
                    <TickIcon className="w-[11px] h-[11px]" />
                </div>
            )}

            {(product.id === 2 || product.id === 5) && (
                <div className="absolute top-0 rounded-tl-2xl left-0 z-10 p-1 bg-black text-white dark:bg-white dark:text-black rounded-br-lg text-sm">
                    {product.id === 2 ? "10%" : "15%"}
                </div>
            )}
            
            <div className="p-1">
                <p className="font-semibold truncate text-sm">{product.name}</p>
                <div>{renderPrice()} </div>
            </div>
        </div>
    );
});