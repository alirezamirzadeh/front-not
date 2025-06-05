import CartIcon from "@/components/icon/CartIcon";
import Button from "@/components/ui/Button";
import CloseButton from "@/components/ui/CloseButton";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/Drawer";
import { useCartStore } from "@/store/cartStore";
import { AnimatePresence, motion } from "motion/react";

export default function Cart() {
    const { items, removeItem, updateQuantity } = useCartStore();
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <Drawer>
            <DrawerTrigger>
                <div className="relative">
                    {items.length > 0 ? (
                        <AnimatePresence>
                            <motion.span initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className=" text-lg font-bold bg-black text-white
                        dark:bg-white dark:text-black ml-1 rounded-full w-[23px] h-[23px] flex items-center justify-center">
                                {items.length}
                            </motion.span>
                        </AnimatePresence>

                    ) : <AnimatePresence>
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                            <CartIcon className="fill-black text-black w-[28px] h-[28px] dark:fill-white dark:text-white" />
                        </motion.div>

                    </AnimatePresence>
                    }
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerClose>
                        <CloseButton className="top-4 right-[14px] w-[28px] h-[28px]" ClassNameIcon="opacity-20 w-[10px] h-[10px]" />
                    </DrawerClose>
                    <div className="w-full h-full flex gap-2 flex-col">
                        {items.length === 0 ? (
                            <div className="w-full h-full flex gap-2 flex-col justify-center 
                                 items-center">
                                <DrawerTitle>Cart’s cold</DrawerTitle>
                                <DrawerDescription>No items yet</DrawerDescription>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-2 border-b">
                                        <div className="flex-1">
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-sm opacity-70">${item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-2 py-1 border rounded"
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 py-1 border rounded"
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="ml-2 text-red-500"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-4 text-right">
                                    <p className="font-bold">Total: ${total}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </DrawerHeader>
                <DrawerFooter>

                    <Button>{items.length > 0 ? `Buy for ${total} NOT` : "OK"}</Button>

                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
