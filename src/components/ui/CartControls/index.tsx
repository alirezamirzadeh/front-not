import { memo, useCallback, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useShallow } from 'zustand/react/shallow';
import { AnimatePresence, motion } from "framer-motion";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { cn } from "@/lib/ui";
import type { Product } from "@/types/Product";

import Button from "../Button";
import NotificationIcon from "@/components/icon/NotificationIcon";
import SuccessPayment from "../SuccessPayment";

export const CartControls = memo(({ product }: { product: Product }) => {
    const { cartItem, addItem, removeItem, updateQuantity } = useCartStore(
        useShallow(state => ({
            cartItem: state.items.find(item => item.id === product.id.toString()),
            addItem: state.addItem,
            removeItem: state.removeItem,
            updateQuantity: state.updateQuantity,
        }))
    );

    const isInCart = !!cartItem;

    const [tonConnectUI] = useTonConnectUI();
    const [showSuccess, setShowSuccess] = useState(false);


    const handleAddToCart = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isInCart) {
            addItem({
                id: product.id.toString(),
                name: product.name,
                price: product.price,
                image: product.images[0],
                category: product.category
            });
        }
    }, [isInCart, addItem, product]);

    const handleAddQuantity = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (cartItem && cartItem.quantity < product.left) {
            updateQuantity(product.id.toString(), cartItem.quantity + 1);
        }
    }, [cartItem, updateQuantity, product]);

    const handleRemoveQuantity = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (cartItem && cartItem.quantity > 1) {
            updateQuantity(product.id.toString(), cartItem.quantity - 1);
        } else if (cartItem) {
            removeItem(product.id.toString());
        }
    }, [cartItem, updateQuantity, removeItem, product.id]);

    const handleBuyNow = useCallback(() => {
        if (tonConnectUI.connected) { 
            setShowSuccess(true);
        } else {
            tonConnectUI.openModal();
        }
    }, [tonConnectUI]);


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2, ease: 'easeOut' } }}
            className="px-4 pt-4 pb-6 flex-shrink-0 mt-auto text-black dark:text-white"
        >
            {showSuccess && <SuccessPayment setShow={setShowSuccess} />}

            <div className="flex gap-2">
                {product.left === 0 ? (
                    <Button disabled className="flex items-center w-full gap-2">
                        <NotificationIcon />
                        Let me know when it's available.
                    </Button>
                ) : (
                    <>
                        <div className="flex-1 relative">
                            <AnimatePresence mode="popLayout">
                                {isInCart ? (
                                    <motion.div
                                        key="quantity-controls"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        className="bg-black/8 dark:bg-white/8 rounded-lg h-full flex justify-center gap-1.5 items-center px-4 font-bold text-xl"
                                    >
                                        <motion.button className="scale-x-200" onClick={handleRemoveQuantity} whileTap={{ scale: 0.9 }}>-</motion.button>
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={cartItem.quantity}
                                                initial={{ y: -10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: 10, opacity: 0 }}
                                                transition={{ duration: 0.15 }}
                                                className="w-8 text-center"
                                            >
                                                {cartItem.quantity}
                                            </motion.span>
                                        </AnimatePresence>
                                        <motion.button
                                            onClick={handleAddQuantity}
                                            disabled={cartItem.quantity >= product.left}
                                            className={cn(cartItem.quantity >= product.left && "opacity-30 cursor-not-allowed", "text-2xl font-medium")}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            +
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="add-to-cart"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <Button onClick={handleAddToCart} className="w-full bg-black/8 dark:!text-white !text-black dark:bg-white/8">Add to Cart</Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <AnimatePresence>

                        <motion.div   initial={{ y: -10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: 10, opacity: 0 }}
                                                transition={{ duration: 0.15 }} className="flex-1">
                            <Button onClick={handleBuyNow} className="w-full">
                                Buy now
                            </Button>
                        </motion.div>
                        </AnimatePresence>

                    </>
                )}
            </div>
        </motion.div>
    );
});