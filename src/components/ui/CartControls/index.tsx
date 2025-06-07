import type { CartControlsProps } from "@/types/cart";
import Button from "../Button";
import NotificationIcon from "@/components/icon/NotificationIcon";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/ui";

export const CartControls = ({
    product,
    isInCart,
    cartItem,
    onAddToCart,
    onAddQuantity,
    onRemoveQuantity,
}: CartControlsProps) => (
    <div className="space-y-6 px-4 flex-shrink-0 mt-auto h-[83px]">
        <div className="flex gap-2">
            {product.left === 0 ? (
                <Button className="flex items-center w-full gap-2">
                    <NotificationIcon />
                    Let me know your availability
                </Button>
            ) : (
                <>
                    <Button onClick={onAddToCart} className="flex-1 !text-black dark:!text-white bg-black/8 dark:bg-white/8 ">
                        {isInCart ? (
                            <motion.div
                                className="flex gap-4 items-center font-[590]"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.button
                                    onClick={onRemoveQuantity}
                                    className="text-xl pr-0.5 scale-x-200 font-medium"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    -
                                </motion.button>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={cartItem?.quantity}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-xl inline-block"
                                    >
                                        {cartItem?.quantity}
                                    </motion.span>
                                </AnimatePresence>
                                <motion.button
                                    onClick={onAddQuantity}
                                    className={cn(
                                        cartItem && cartItem.quantity >= product.left
                                            ? "opacity-30 pointer-events-none"
                                            : "",
                                        "text-2xl -translate-y-0.5 font-medium"
                                    )}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    +
                                </motion.button>
                            </motion.div>
                        ) : (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    transition={{ delay: 0.1 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    Add to Cart
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </Button>

                    <Button className="flex-1">Buy now</Button>
                </>
            )}
        </div>
    </div>
);
