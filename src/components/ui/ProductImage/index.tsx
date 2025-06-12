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
            selectedIndex: s.selectedImageIndices[product.id] ?? product.id - 1,
            setSelectedImageIndex: s.setSelectedImageIndex,
        }))
    );
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalCurrentIndex, setModalCurrentIndex] = useState(selectedIndex);

    const [selectedSize, setSelectedSize] = useState<string>("M");
    const [thumbApi, setThumbApi] = useState<CarouselApi>();
    const [modalApi, setModalApi] = useState<CarouselApi>();

    useEffect(() => {
        if (thumbApi && thumbApi.selectedScrollSnap() !== selectedIndex) {
            thumbApi.scrollTo(selectedIndex);
        }
        if (isModalOpen && modalApi && modalApi.selectedScrollSnap() !== modalCurrentIndex) {
            modalApi.scrollTo(modalCurrentIndex);
        }
    }, [selectedIndex, modalCurrentIndex, thumbApi, modalApi, isModalOpen]);
    
    useEffect(() => {
        if (isModalOpen) {
            setModalCurrentIndex(selectedIndex);
        }
    }, [isModalOpen, selectedIndex]);
    
    useEffect(() => {
        if (!modalApi) return;
        const onModalSelect = () => {
            const newIndex = modalApi.selectedScrollSnap();
            setModalCurrentIndex(newIndex);
        };
        modalApi.on("select", onModalSelect);
        return () => {
            modalApi.off("select", onModalSelect);
        }
    }, [modalApi, setModalCurrentIndex]);

    const handleThumbnailClick = useCallback((index: number) => {
        setSelectedImageIndex(product.id, index);
    }, [product.id, setSelectedImageIndex]);
    
    const handleMainImageSwipe = useCallback((_: any, { offset }: { offset: { x: number, y: number }}) => {
        const swipeThreshold = 50;
        if (offset.x < -swipeThreshold) {
            const nextIndex = selectedIndex === product.images.length - 1 ? 0 : selectedIndex + 1;
            setSelectedImageIndex(product.id, nextIndex);
        } else if (offset.x > swipeThreshold) {
            const prevIndex = selectedIndex === 0 ? product.images.length - 1 : selectedIndex - 1;
            setSelectedImageIndex(product.id, prevIndex);
        }
    }, [selectedIndex, product.id, product.images.length, setSelectedImageIndex]);
    
    const handleCloseModal = () => {
        // First update the main image index to the one currently viewed in the modal
        setSelectedImageIndex(product.id, modalCurrentIndex);
        // Then close the modal
        setIsModalOpen(false);
    };

    const sizes = ["S", "M", "L", "XL"];
    const thumbnailBorderTransition = { type: 'spring', stiffness: 350, damping: 30, mass: 0.8};

    return (
        <>
            <div className="flex-grow flex flex-col space-y-4 overflow-hidden pt-2">
                <div className="relative w-full px-4 flex-grow min-h-0">
                    {!isModalOpen && (
                         <motion.div
                            className="w-full h-full  cursor-pointer"
                            onTap={() => setIsModalOpen(true)}
                            onPanEnd={handleMainImageSwipe}
                         >
                            <AnimatePresence initial={false}>
                                <motion.img
                                    className="pointer-events-none absolute z-10 inset-0 w-[calc(100vw-28px)] ml-4 h-full object-cover rounded-[20px]"
                                    layoutId={`product-image-${product.id}`}
                                    key={selectedIndex}
                                    src={product.images[selectedIndex]}
                                    alt={product.name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, position: 'absolute' }}
                                    transition={{ opacity: { duration: 0.2, ease: 'easeOut' } }}
                                />
                            </AnimatePresence>
                        </motion.div>
                    )}
                    
                    {!isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.3, ease: "easeOut" } }}
                            className="absolute z-20 bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/20 backdrop-blur-sm p-1.5 rounded-xl"
                        >
                            {sizes.map((size) => (
                                <motion.button
                                    key={size}
                                    onClick={(e) => { e.stopPropagation(); setSelectedSize(size) }}
                                    className="relative rounded-xl text-xs font-bold w-8 h-8 flex justify-center items-center"
                                    animate={{ color: selectedSize === size ? '#000000' : '#FFFFFF' }}
                                >
                                    {selectedSize === size && (
                                        <motion.div layoutId="size-selector-background" className="absolute inset-0 bg-white rounded-lg" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                                    )}
                                    <span className="relative z-10">{size}</span>
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </div>
                
                {product.images.length > 1 && (
                     <motion.div 
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex-shrink-0"
                    >
                        <Carousel setApi={setThumbApi} opts={{ align: "start", containScroll: 'keepSnaps' }} className="w-full pl-4">
                            <CarouselContent className="-ml-2">
                                {product.images.map((image, idx) => (
                                    <CarouselItem key={idx} onClick={(e) => { e.stopPropagation(); handleThumbnailClick(idx); }} className="pl-2 basis-auto cursor-pointer">
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

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-md"
                        onClick={handleCloseModal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Carousel
                            setApi={setModalApi}
                            opts={{ align: "center", startIndex: selectedIndex, loop: true }}
                            className="w-full"
                        >
                            <CarouselContent>
                                {product.images.map((image, idx) => (
                                    <CarouselItem key={idx} className="basis-5/6 md:basis-3/4">
                                        <div className="p-1" onClick={(e) => e.stopPropagation()}>
                                            {/* ✅ FIX: The condition now uses modalCurrentIndex to ensure the exit animation targets the visible image */}
                                            {idx === modalCurrentIndex ? (
                                                <motion.img
                                                    layoutId={`product-image-${product.id}`}
                                                    src={image}
                                                    alt={`${product.name} - image ${idx + 1}`}
                                                    className="w-full h-auto max-h-[85vh] object-contain rounded-[20px]"
                                                />
                                            ) : (
                                                <img
                                                    src={image}
                                                    alt={`${product.name} - image ${idx + 1}`}
                                                    className="w-full h-auto max-h-[85vh] object-contain rounded-[20px]"
                                                />
                                            )}
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
});