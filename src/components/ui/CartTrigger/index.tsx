import { useCartStore } from "@/store/cartStore";
import { AnimatePresence, motion } from "framer-motion"; // استفاده از framer-motion برای سادگی
import CartIcon from "@/components/icon/CartIcon";

export const CartTrigger = () => {
    const itemsCount = useCartStore(state => state.items.length);
    console.log("CartTrigger rendered");

    return (
        <div className="relative p-1.5">
            <AnimatePresence mode="wait">
                {itemsCount > 0 ? (
                    <motion.span
                        key="count"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="text-lg font-extrabold bg-black text-white dark:bg-white dark:text-black absolute  translate-y-[2.5px] translate-x-[2px] rounded-full w-6 h-6 flex items-center justify-center "
                    >
                        {itemsCount}
                    </motion.span>
                ) : null}
            </AnimatePresence>
            <CartIcon className="fill-black text-black w-7 h-7 dark:fill-white dark:text-white" />
        </div>
    );
};