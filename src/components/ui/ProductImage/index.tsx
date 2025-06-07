import { cn } from "@/lib/ui";
import type { ProductImageProps } from "@/types/Product";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export const ProductImage = ({ mainImage, product, onThumbnailClick }: ProductImageProps) => {
    const [selectedSize, setSelectedSize] = useState<string | null>("M");

    const sizes = ["S", "M", "L", "XL"];

    const containerVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren",
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 5 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24,
            },
        },
        
    };

    return (
        <div className="flex-grow flex flex-col space-y-2 overflow-y-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={mainImage || "placeholder"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full rounded-[20px] relative px-4 overflow-hidden flex-grow"
                >
                    {mainImage ? (
                        <img
                            width="1500"
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-[20px]"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-white/10 rounded-[20px]" />
                    )}
                    <div className="absolute bottom-3 left-7 flex items-center gap-2">
                        {sizes.map((size) => (
                            <motion.div
                                key={size}
                                className={cn(
                                    "rounded-md text-white w-9 h-9 flex justify-center items-center cursor-pointer",
                                    selectedSize === size
                                        ? "bg-black dark:bg-white"
                                        : "bg-black/8 backdrop-invert backdrop-opacity-30"
                                )}
                                onClick={() => setSelectedSize(size)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    scale: selectedSize === size ? 1.1 : 1,
                                    backgroundColor: selectedSize === size
                                        ? "rgba(0, 0, 0, 0.8)"
                                        : "rgba(0, 0, 0, 0.08)"
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                {size}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {product.images && product.images.length > 0 && (
                <motion.div
                    className="flex  snap-x snap-mandatory space-x-2 ml-4 pr-4 !no-scrollbar overflow-x-auto pb-2 flex-shrink-0"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {product.images.map((image, idx) => (
                        <motion.div
                            key={idx}
                            className={cn(
                                "w-20 h-20 flex-shrink-0 !no-scrollbar  rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ease-in",
                                mainImage === image
                                    ? "border-black dark:border-white"
                                    : "border-transparent"
                            )}
                            onClick={() => onThumbnailClick(image)}
                            variants={itemVariants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            layout
                        >
                            <img
                                src={image}
                                alt={`${product.name} ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            )}

        </div>
    );
};
