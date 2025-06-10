import { useLoaderData } from "react-router";
import { motion } from 'framer-motion';
import type { Product } from "@/types/Product";

import { ProductInfo } from "@/components/ui/ProductInfo";
import { ProductImage } from "@/components/ui/ProductImage";
import { CartControls } from "@/components/ui/CartControls";
import useBackButton from "@/hooks/useBackButton";

// انیمیشن برای ورود آبشاری کامپوننت‌ها
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    },
};

export default function ProductPage() {
    // ۱. دریافت داده‌های آماده و معتبر از loader
    const { product } = useLoaderData() as { product: Product };
    useBackButton();

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="container safe-area mx-auto h-screen overflow-y-hidden flex flex-col"
        >
            {/* ۲. هر کامپوننت فقط پراپ‌های لازم را می‌گیرد */}
            <ProductInfo product={product} />
            <ProductImage product={product} />
            <CartControls product={product} />
        </motion.div>
    );
}