// src/pages/ProductPage.tsx

import { createPortal } from "react-dom";
import { motion } from 'framer-motion';
import { useEffect } from "react";
import type { Product } from "@/types/Product";
import { ProductInfo } from "@/components/ui/ProductInfo";
import { ProductImage } from "@/components/ui/ProductImage";
import { CartControls } from "@/components/ui/CartControls";
import useBackButton from "@/hooks/useBackButton";

export default function ProductPage({ product }: { product: Product, onClose: () => void }) {
    useBackButton();

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;

        };
    }, []);

    const content = (
        <div 
            className="fixed   !z-[99]  bg-white dark:bg-black flex items-center justify-center "
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
            
                className=" h-screen w-screen  safe-area-top flex flex-col"
            >
                <ProductInfo product={product} />
                <div className="flex-grow flex flex-col overflow-hidden">
                    <ProductImage product={product} />
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.4 } }}
                    className="mt-auto"
                >
                    <CartControls product={product} />
                </motion.div>
            </motion.div>
        </div>
    );

    return createPortal(content, document.body);
}