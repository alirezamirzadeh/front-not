import TickIcon from "@/components/icon/TickIcon";
import type { ProductCardProps } from "@/types/Product";
import { motion } from "motion/react";
import Carousel from "../Carousel";
import { memo } from "react";
import { useViewTransition } from "@/hooks/useViewTransition";
import { useProductsStore } from "@/store/productsStore";

export const ProductCard = memo(({ product, isInCart, onImageLoad, isImageLoaded }: ProductCardProps) => {
    const navigateWithTransition = useViewTransition();
    const getSelectedImageIndex = useProductsStore(state => state.getSelectedImageIndex);
    const setSelectedImageIndex = useProductsStore(state => state.setSelectedImageIndex);
    const selectedIndex = getSelectedImageIndex(product.id);

    const handleClick = () => {
        navigateWithTransition(`/product/${product.id}`);
    };

    const handleSlideChange = (index: number) => {
        setSelectedImageIndex(product.id, index);
    };

    const renderPrice = () => {
        if (product.left === 0) return <span className="opacity-60">Out of stock</span>;
        return (
            <>
                {product.price.toLocaleString()}&nbsp;
                <span className="opacity-50"> {product.currency}</span>
                {(product.id === 2 || product.id === 5) && <span className="opacity-80  text-black/50 dark:text-white/50 ml-1 line-through">{(product.price + product.price * (product.id === 2 ? 0.1 : 0.15)).toLocaleString()} </span>}
            </>
        );
    };

    return (
        <motion.div
            onClick={handleClick}
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg overflow-hidden cursor-pointer relative"
        >
            {isInCart && (
                <div className="absolute top-2 right-2 z-10 h-[22px] w-[22px] flex justify-center items-center bg-black text-white dark:bg-white dark:text-black rounded-full">
                    <TickIcon className="w-[11px] h-[11px]" />
                </div>
            )}

            {(product.id === 2 || product.id === 5) && (
                <div className="absolute top-0 left-0 z-10 p-1 bg-black text-white dark:bg-white dark:text-black rounded-br-lg text-sm">
                    {product.id === 2 ? "10%" : "15%"}
                </div>
            )}
            <Carousel
                id={Number(product.id)}
                startIndex={selectedIndex}
                onSlideChange={handleSlideChange}
            >
                {product.images.length > 0 ? (
                    product.images.map((url, idx) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            key={idx}
                            className="relative rounded-2xl aspect-square"
                        >
                            {!isImageLoaded && (
                                <div className="absolute inset-0 rounded-2xl bg-gray-200 dark:bg-white/10 animate-pulse" />
                            )}
                            <div
                                className="w-full h-full rounded-2xl overflow-hidden"
                               
                            >
                                <picture  style={{
                                    viewTransitionName: `product-image-${product.id}`
                                }}>
                                <img
                                    className={`rounded-2xl !aspect-square object-cover ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    width="1500"
                                    src={url}
                                    alt={`${product.name} ${idx + 1}`}
                                    onLoad={() => onImageLoad(product.id)}
                                    loading="lazy"
                                />
                                </picture>
                            </div>
                        </motion.div>
                    ))
                ) : [
                    <div
                        key="placeholder"
                        className="rounded-2xl aspect-square bg-gray-200 dark:bg-white/10"
                    />
                ]}
            </Carousel>

            <div className="p-2">
                <p className="text-[17px] font-[590] truncate">
                    {product.name}
                </p>
                <p className="text-sm font-normal flex">
                    {renderPrice()}
                </p>
            </div>
        </motion.div>
    );
});