import { AnimatePresence, motion } from "motion/react";
import Carousel from "@/components/ui/Carousel";
import type { Product } from "@/types/Product";
import { useNavigate } from "react-router";
import { useCartStore } from "@/store/cartStore";
import TickIcon from "@/components/icon/TickIcon";

export default function GridProducts({ products }: { products: Product[] }) {
    const navigate = useNavigate();
    const { items: cartItems } = useCartStore();

    const handleProductClick = (product: Product) => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="grid grid-cols-2 gap-4 px-4 mt-5 mb-20">
            <AnimatePresence>
                {products.map((product) => {
                    const isInCart = cartItems.some(item => item.id === String(product.id));
                    return (
                        <motion.div
                            onClick={() => handleProductClick(product)}
                            key={product.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-lg overflow-hidden cursor-pointer relative"
                        >
                            {isInCart && (
                                <div className="absolute top-2 right-2 z-10 p-1 bg-black text-white dark:bg-white dark:text-black rounded-full">
                                    <TickIcon className="w-[14px] h-[14px]" />
                                </div>
                            )}
                            <Carousel>
                                {product.images.length > 0
                                    ? product.images.map((url, idx) => (
                                        <img
                                            key={idx}
                                            className="rounded-2xl aspect-square object-cover"
                                            src={url}
                                            alt={`${product.name} ${idx + 1}`}
                                        />
                                    ))
                                    :
                                    [
                                        <div
                                            key="placeholder"
                                            className="rounded-2xl aspect-square bg-gray-200 dark:bg-white/10"
                                        />,
                                    ]}
                            </Carousel>

                            <div className="p-2">
                                <p className="text-[17px] font-[590] truncate">
                                    {product.category} {product.name}
                                </p>
                                <p className="text-sm font-normal">
                                    {product.price}{" "}
                                    <span className="opacity-50">{product.currency}</span>
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
