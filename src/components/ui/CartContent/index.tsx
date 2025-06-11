import { useCartStore } from "@/store/cartStore";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import CloseButton from "@/components/ui/CloseButton";
import { DrawerClose, DrawerFooter, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/Drawer";
import { cn } from "@/lib/ui";

export const CartContent = () => {
    const { items, removeItem } = useCartStore();
    const total = useMemo(() => items.reduce((sum, item) => sum + (item.price * item.quantity), 0), [items]);

    console.log("CartContent rendered");

    return (
        <>
           
            <DrawerHeader className={cn(items.length > 2  && " h-[380px]" , "flex-none flex flex-col duration-300 ease-out")}>
                <DrawerClose>
                    <DrawerClose>
                        <CloseButton className="top-4 right-[14px] w-[28px] h-[28px]" ClassNameIcon="opacity-20 w-[10px] h-[10px]" />

                    </DrawerClose>
                </DrawerClose>

                <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-[20px] font-[590] w-full text-center -translate-y-2"
                >
                    {items.length !== 0 && "Cart"}
                </motion.p>

                <div className="overflow-y-auto overflow-x-hidden flex-1 mb-4">
                    <AnimatePresence>
                        {items.length === 0 ? (
                            <motion.div
                                key="empty-cart"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: 0.2 }}
                                className="flex h-full  flex-col items-center justify-center gap-2 text-center"
                            >
                                <DrawerTitle>Cart's cold</DrawerTitle>
                                <DrawerDescription>No items yet</DrawerDescription>
                            </motion.div>
                        ) : (

                            <motion.div
                                variants={{
                                    visible: { transition: { staggerChildren: 0.07 } }
                                }}
                                initial="hidden"
                                animate="visible"
                            >
                                {items.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            visible: { opacity: 1, x: 0 },
                                        }}
                                        exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                                        className="flex items-center justify-between pb-3 gap-3 w-full"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="relative flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    className="w-[60px] h-[60px] object-cover rounded-xl"
                                                    width={60}
                                                    height={60}
                                                    alt={item.name}
                                                />
                                                <div className="absolute -bottom-1 -right-1 text-xs text-white bg-black/70 rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                                                    {item.quantity}x
                                                </div>
                                            </div>
                                            <div className="font-[590] text-left flex-1 min-w-0">
                                                <p className="text-xs opacity-50">{item.category}</p>
                                                <h3 className="text-[17px] truncate">{item.name}</h3>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <p className="text-secondary whitespace-nowrap">
                                                {(item.price * item.quantity).toLocaleString()} NOT
                                            </p>
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => removeItem(item.id)}
                                                className="flex items-center justify-center bg-black/5 dark:bg-white/5 aspect-square h-8 w-8 rounded-lg"
                                                aria-label={`Remove ${item.name}`}
                                            >
                                                <span className="text-xl font-semibold opacity-40 scale-x-200  leading-none mb-0.5">-</span>
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DrawerHeader>
            <DrawerFooter>
            <AnimatePresence mode="wait">
                    {items.length > 0 ? (
                        <motion.div
                            key="checkout-button"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <Button>
                                {`Checkout for ${total.toLocaleString()} NOT`}
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="ok-button"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <Button>
                                <DrawerClose className="w-full h-full">OK</DrawerClose>
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DrawerFooter>
        </>
    );
};