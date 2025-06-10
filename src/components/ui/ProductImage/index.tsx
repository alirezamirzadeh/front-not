import { memo, useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useProductsStore } from "@/store/productsStore";
import { useShallow } from 'zustand/react/shallow';
import { cn } from "@/lib/ui";
import type { Product } from "@/types/Product";
import { Carousel, CarouselContent, CarouselItem,type CarouselApi } from "@/components/ui/Swiper";

export const ProductImage = memo(({ product }: { product: Product }) => {
    const { selectedIndex, setSelectedImageIndex } = useProductsStore(
        useShallow(s => ({
            selectedIndex: s.selectedImageIndices[product.id] ?? (product.id - 1) % product.images.length,
            setSelectedImageIndex: s.setSelectedImageIndex,
        }))
    );

    const [mainImage, setMainImage] = useState(product.images[selectedIndex] || product.images[0]);
    const [selectedSize, setSelectedSize] = useState<string>("M");
    const [api, setApi] = useState<CarouselApi>();
    const initialScrollDone = useRef(false);

    useEffect(() => {
        if (api && !initialScrollDone.current) {
            api.scrollTo(selectedIndex, true);
            initialScrollDone.current = true;
        }
    }, [api, selectedIndex]);

    useEffect(() => {
        if (product.images && product.images[selectedIndex]) {
            setMainImage(product.images[selectedIndex]);
        }
    }, [product.images, selectedIndex]);

    const handleThumbnailClick = useCallback((image: string, index: number) => {
        setMainImage(image);
        setSelectedImageIndex(product.id, index);
        if (api) {
            api.scrollTo(index);
        }
    }, [product.id, setSelectedImageIndex, api]);

    const sizes = ["S", "M", "L", "XL"];
    
    const listVariants = {
        visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
        hidden: {},
    };
    const itemVariants = {
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
        hidden: { opacity: 0, y: 15 },
    };

    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-grow flex flex-col space-y-2 overflow-hidden pt-2"
        >
            <div className="w-full relative px-4 flex-grow min-h-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mainImage}
                        initial={{ opacity: 0.8, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.8, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="w-full h-full rounded-[20px] overflow-hidden"
                    >
                        <picture style={{ viewTransitionName: `product-image-${product.id}` }}>
                            <img src={mainImage} alt={product.name} className="w-full h-full object-cover"/>
                        </picture>
                    </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/20 backdrop-blur-sm p-1.5 rounded-xl">
                    {sizes.map((size) => (
                        <motion.button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className="relative rounded-xl text-xs font-bold w-8 h-8 flex justify-center items-center"
                            animate={{ color: selectedSize === size ? '#000000' : '#FFFFFF' }}
                        >
                            {selectedSize === size && (
                                <motion.div
                                    layoutId="size-selector-background"
                                    className="absolute inset-0 bg-white rounded-lg"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{size}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {product.images.length > 1 && (
                <div className="flex-shrink-0 ml-4 pr-4">
                    <Carousel setApi={setApi} opts={{ align: "start", containScroll: 'keepSnaps' }} className="w-full">
                        <motion.div
                            className="flex"
                            variants={listVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* تغییر ۳: مارجین منفی برای تراز کردن گپ جدید */}
                            <CarouselContent className="-ml-1">
                                {product.images.map((image, idx) => (
                                    // تغییر ۳: پدینگ برای ایجاد گپ 8px
                                    <CarouselItem key={idx} onClick={() => handleThumbnailClick(image, idx)} className="pl-1 basis-auto cursor-pointer">
                                        <motion.div
                                            variants={itemVariants}
                                            className="p-0.5" 
                                        >
                                          
                                            <div 
                                                className={cn(
                                                    // تغییر ۲: طول و عرض عکس به 100px تغییر کرد
                                                    "w-[100px] h-[100px] rounded-xl overflow-hidden border-2 transition-all",
                                                    selectedIndex === idx ? "border-black dark:border-white" : "border-transparent" // ring-transparent to border-transparent
                                                )}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${product.name} thumbnail ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </motion.div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </motion.div>
              
                    </Carousel>
                </div>
            )}
        </motion.div>
    );
});