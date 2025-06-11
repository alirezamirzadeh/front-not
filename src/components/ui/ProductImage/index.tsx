import { memo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProductsStore } from "@/store/productsStore";
import { useShallow } from 'zustand/react/shallow';
import type { Product } from "@/types/Product";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/Swiper";


const listVariants = {
    visible: {
        transition: {
            delayChildren: 0.1, 
            staggerChildren: 0.11, 
        },
    },
    hidden: {},
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
};


export const ProductImage = memo(({ product }: { product: Product }) => {
    const { selectedIndex, setSelectedImageIndex } = useProductsStore(
        useShallow(s => ({
            selectedIndex: s.selectedImageIndices[product.id] ?? product.id -1,
            setSelectedImageIndex: s.setSelectedImageIndex,

        }))
    );

    const [selectedSize, setSelectedSize] = useState<string>("M");
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        if (api && api.selectedScrollSnap() !== selectedIndex) {
            api.scrollTo(selectedIndex, true);
        }
    }, [api, selectedIndex]);

    const handleThumbnailClick = useCallback((index: number) => {
        setSelectedImageIndex(product.id, index);
    }, [product.id, setSelectedImageIndex]);

    const sizes = ["S", "M", "L", "XL"];

    const thumbnailBorderTransition = { type: 'spring', stiffness: 350, damping: 30, mass: 0.8};


    return (
        <div className="flex-grow flex flex-col space-y-4 overflow-hidden pt-2">
            <div className="relative w-full px-4 flex-grow min-h-0">
                <AnimatePresence initial={false}>
                    <motion.img
                        layoutId={`product-image-${product.id}`}
                        key={product.images[selectedIndex]}
                        src={product.images[selectedIndex]}
                        alt={product.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, position: 'absolute' }}
                        transition={{ opacity: { duration: 0.3, ease: 'easeOut' } }}
                        className="absolute z-[999] mx-auto inset-0 w-[calc(100vw-32px)] h-full object-cover rounded-[20px]"
                        
                    />
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.3, ease: "easeOut" } }}
                    className="absolute z-[999999] bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/20 backdrop-blur-sm p-1.5 rounded-xl"
                >
                     {sizes.map((size) => (
                        <motion.button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className="relative rounded-xl text-xs font-bold w-8 h-8 flex justify-center items-center"
                            animate={{ color: selectedSize === size ? '#000000' : '#FFFFFF' }}
                        >
                            {selectedSize === size && (
                                <motion.div layoutId="size-selector-background" className="absolute  inset-0 bg-white rounded-lg" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                            )}
                            <span className="relative z-10">{size}</span>
                        </motion.button>
                    ))}
                </motion.div>
            </div>

            {product.images.length > 1 && (
                <motion.div 
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-shrink-0"
                >
                    <Carousel setApi={setApi} opts={{ align: "start", containScroll: 'keepSnaps' }} className="w-full pl-4">
                        <CarouselContent className="-ml-2">
                            {product.images.map((image, idx) => (
                                <CarouselItem key={idx} onClick={() => handleThumbnailClick(idx)} className="pl-2 basis-auto cursor-pointer">
                               
                                    <motion.div variants={itemVariants} className="relative w-[100px] h-[100px]">
                                        <img src={image} alt={`thumb ${idx}`} className="w-full h-full object-cover rounded-xl" />
                                        <AnimatePresence>
                                            {selectedIndex === idx && (
                                                <motion.div
                                                    layoutId="thumbnail-border"
                                                    className="absolute inset-0 border-2 border-black dark:border-white rounded-xl pointer-events-none"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={thumbnailBorderTransition}
                                                />
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </motion.div>
            )}
        </div>
    );
});