import { memo, useCallback, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useShallow } from 'zustand/react/shallow';
import { AnimatePresence, motion } from "framer-motion";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import { cn } from "@/lib/ui";
import type { Product } from "@/types/Product";

import Button from "../Button";
import NotificationIcon from "@/components/icon/NotificationIcon";
import SuccessPayment from "../SuccessPayment";

// کامپوننت را با memo بهینه می‌کنیم
export const CartControls = memo(({ product }: { product: Product }) => {
    // ۱. اتصال بهینه به cartStore
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

    // ۲. تمام توابع با useCallback بهینه شده‌اند تا از رندرهای غیرضروری جلوگیری شود
    const handleAddToCart = useCallback((e: React.MouseEvent) => {
        e.stopPropagation(); // جلوگیری از کلیک روی کارت اصلی
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

    const handleBuyNow = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (tonConnectUI.account) {
            setShowSuccess(true);
        }
        // اگر کاربر متصل نباشد، دکمه TonConnectUI به صورت خودکار مودال را باز می‌کند
    }, [tonConnectUI.account]);

    return (
        <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="px-4 pt-4 pb-6 flex-shrink-0 mt-auto"
        >
            {showSuccess && <SuccessPayment setShow={setShowSuccess} />}
            
            <div className="flex gap-2">
                {product.left === 0 ? (
                    <Button disabled className="flex items-center w-full gap-2">
                        <NotificationIcon />
                        Out of Stock
                    </Button>
                ) : (
                    <>
                        {/* دکمه Add to Cart / کنترلر تعداد */}
                        <div className="flex-1 relative">
                            <AnimatePresence mode="popLayout">
                                {isInCart ? (
                                    <motion.div
                                        key="quantity-controls"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        className="bg-black/8 dark:bg-white/8 rounded-lg h-full flex justify-between items-center px-4 font-bold text-xl"
                                    >
                                        <motion.button onClick={handleRemoveQuantity} whileTap={{ scale: 0.9 }}>-</motion.button>
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
                                            className={cn(cartItem.quantity >= product.left && "opacity-30 cursor-not-allowed")}
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
                                        <Button onClick={handleAddToCart} className="w-full">Add to Cart</Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* دکمه Buy Now */}
                        <div className="flex-1 relative">
                            <Button onClick={handleBuyNow} className="w-full">
                                Buy now
                            </Button>
                            {/* دکمه نامرئی TonConnect که روی دکمه Buy Now قرار می‌گیرد */}
                            {!tonConnectUI.account && (
                                <div className="absolute inset-0 opacity-0 cursor-pointer">
                                    <TonConnectButton />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
});