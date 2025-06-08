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
                    {items.length > 0 ? (
                        <AnimatePresence>
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className=" text-lg font-bold bg-black text-white
                        dark:bg-white dark:text-black ml-1 rounded-full w-[23px] h-[23px] flex items-center justify-center">
                                {items.length}
                            </motion.span>
                        </AnimatePresence>

                    ) : <AnimatePresence>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <CartIcon className="fill-black text-black w-[28px] h-[28px] dark:fill-white dark:text-white" />
                        </motion.div>

                    </AnimatePresence>
                    }
                </div>
            </DrawerTrigger>
            <DrawerContent >
                <DrawerHeader className="flex-none">
                    <DrawerClose>
                        <CloseButton className="top-4 right-[14px] w-[28px] h-[28px]" ClassNameIcon="opacity-20 w-[10px] h-[10px]" />
                    </DrawerClose>
                    <div className="w-full flex gap-2 flex-col">
                        {items.length === 0 ? (
                            <div className="w-full flex  h-[200px] gap-2 flex-col justify-center items-center py-8">
                                <DrawerTitle>Cart's cold</DrawerTitle>
                                <DrawerDescription>No items yet</DrawerDescription>
                            </div>
                        ) : (
                            <div className="flex  flex-col max-h-[340px] ">
                                <p className="text-[20px] font-[590] w-full text-center mb-4 -translate-y-2">Cart</p>
                                <div className="overflow-y-auto h-full flex-1 mb-20" >
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between pb-2 gap-3 w-full relative">
                                            <img src={item.image} className="w-[60px] h-[60px] object-cover rounded-xl flex-shrink-0" width={60} height={60} />
                                            <div className="absolute bottom-2 text-[10px] text-white bg-black/50 backdrop-invert backdrop-opacity-5 left-0 rounded-tr-md  rounded-bl-xl
                                         px-1.5 py-0.5">{item.quantity }x</div>
                                            <div className="font-[590] text-left flex-1 min-w-0">
                                                <p className="text-xs opacity-50">{item.category }</p>
                                                <h3 className="text-[17px] truncate">{item.name}</h3>
                                            </div>
                                            <p className="text-secondary whitespace-nowrap flex-shrink-0">{(item.price * item.quantity).toLocaleString()}&nbsp;TON</p>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="flex items-center gap-2 justify-center bg-black/8 dark:bg-white/8 aspect-square h-[28px] w-[28px] rounded-lg flex-shrink-0">
                                                <span className="scale-x-[250%] scale-y-125 opacity-25 font-semibold">-</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        )}
                    </div>
                </DrawerHeader>
                <DrawerFooter>

                    <Button>{items.length > 0 ? `Buy for ${total.toLocaleString()} NOT` : <DrawerClose className="w-full  h-full">
                        OK </DrawerClose>
                    }</Button>

                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
