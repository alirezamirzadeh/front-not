import CartIcon from "@/components/icon/CartIcon";
import Button from "@/components/ui/Button";
import CloseButton from "@/components/ui/CloseButton";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/Drawer";
import { useCartStore } from "@/store/cartStore";
import { AnimatePresence, motion } from "motion/react";

export default function Cart() {
    const { items, removeItem } = useCartStore();
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <Drawer>
            <DrawerTrigger>
                <div className="relative">
                    <AnimatePresence mode="wait">
                        {items.length > 0 ? (
                            <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="text-lg font-bold bg-black text-white dark:bg-white dark:text-black ml-1 rounded-full w-[23px] h-[23px] flex items-center justify-center">
                                {items.length}
                            </motion.span>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <CartIcon className="fill-black text-black w-[28px] h-[28px] dark:fill-white dark:text-white" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <AnimatePresence mode="wait">
                    <DrawerHeader className="flex-none">
                        <DrawerClose>
                            <CloseButton className="top-4 right-[14px] w-[28px] h-[28px]" ClassNameIcon="opacity-20 w-[10px] h-[10px]" />
                        </DrawerClose>
                        <div className="w-full flex gap-2 flex-col">
                            <AnimatePresence mode="wait">
                                {items.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 25,
                                            delay: 0.2
                                        }}
                                        className="w-full flex h-[200px] gap-2 flex-col justify-center items-center py-8"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <DrawerTitle>Cart's cold</DrawerTitle>
                                            <DrawerDescription>No items yet</DrawerDescription>
                                        </motion.div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col max-h-[340px]"
                                    >
                                        <motion.p
                                            initial={{ y: -10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="text-[20px] font-[590] w-full text-center mb-4 -translate-y-2"
                                        >
                                            Cart
                                        </motion.p>
                                        <div className="overflow-y-auto overflow-x-hidden h-full flex-1 mb-20">
                                            <AnimatePresence mode="popLayout">
                                                {items.map((item, index) => (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{
                                                            opacity: 0,
                                                            x: 20,
                                                            transition: {
                                                                duration: 0.2,
                                                                ease: "easeInOut"
                                                            }
                                                        }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 25,
                                                            delay: index * 0.05
                                                        }}
                                                        key={item.id}
                                                        className="flex overflow-hidden items-center justify-between pb-2 gap-3 w-full relative"
                                                    >
                                                        <motion.img
                                                            whileHover={{ scale: 1.05 }}
                                                            transition={{ type: "spring", stiffness: 400 }}
                                                            src={item.image}
                                                            className="w-[60px] h-[60px] object-cover rounded-xl flex-shrink-0"
                                                            width={60}
                                                            height={60}
                                                        />
                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: 0.2 }}
                                                            className="absolute bottom-2 text-[10px] text-white bg-black/50 backdrop-invert backdrop-opacity-5 left-0 rounded-tr-md rounded-bl-xl px-1.5 py-0.5"
                                                        >
                                                            {item.quantity}x
                                                        </motion.div>
                                                        <div className="font-[590] text-left flex-1 min-w-0">
                                                            <p className="text-xs opacity-50">{item.category}</p>
                                                            <h3 className="text-[17px] truncate">{item.name}</h3>
                                                        </div>
                                                        <p className="text-secondary whitespace-nowrap flex-shrink-0">
                                                            {(item.price * item.quantity).toLocaleString()}&nbsp;TON
                                                        </p>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => removeItem(item.id)}
                                                            className="flex items-center gap-2 justify-center bg-black/8 dark:bg-white/8 aspect-square h-[28px] w-[28px] rounded-lg flex-shrink-0"
                                                        >
                                                            <span className="scale-x-[250%] scale-y-125 opacity-25 font-semibold">-</span>
                                                        </motion.button>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </DrawerHeader>
                    <DrawerFooter>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Button>
                                {items.length > 0 ? (
                                    `Buy for ${total.toLocaleString()} NOT`
                                ) : (
                                    <DrawerClose className="w-full h-full">
                                        OK
                                    </DrawerClose>
                                )}
                            </Button>
                        </motion.div>
                    </DrawerFooter>
                </AnimatePresence>
            </DrawerContent>
        </Drawer>
    );
}
