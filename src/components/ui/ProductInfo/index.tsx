import ShareIcon from "@/components/icon/ShareIcon";
import { useCartStore } from "@/store/cartStore";
import type { ProductInfoProps } from "@/types/Product";
import { shareURL } from "@telegram-apps/sdk-react";
import { AnimatePresence, motion } from "motion/react";
import { useShallow } from "zustand/react/shallow";

export const ProductInfo = ({ product }: ProductInfoProps) => {
    const handleShare = () => {
        const productUrl = `https://t.me/NOTFrontContestBot/start?startapp=product_${product.id}`;
        shareURL.ifAvailable(productUrl, `Hi 😍 Check out this amazing product: ${product.name} `);

    };

    const { cartItem } = useCartStore(
        useShallow(state => ({
            cartItem: state.items.find(item => item.id === product.id.toString()),

        }))
    );
    const quantityLeft = product.left - (cartItem?.quantity || 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ x: 0, opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeIn", delay: 0.2, }}
            className="flex dark:text-white flex-col gap-3 px-4  pb-2  flex-shrink-0"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-main text-xl font-bold flex items-center gap-2">
                    {product.category} {product.name}
                </h1>
                <div onClick={handleShare}>
                    <ShareIcon />
                </div>
            </div>

            <p className="text-secondary text-sm pr-12">{product.description}</p>
            <div className="text-xs font-[590] gap-2 flex items-center mb-2">
                <span className="bg-black/8 dark:bg-white/8 rounded-[10px] py-0.5 px-2">
                    {product.price.toLocaleString()}{" "}
                    <span className="opacity-50">${product.currency}</span>
                </span>
                <span className="bg-black/8 w-16 text-center  dark:bg-white/8 rounded-[10px] py-0.5 overflow-hidden  flex ">
                

                <AnimatePresence mode="wait">
                        <motion.span
                            key={quantityLeft}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="flex-1"
                        >
                            {quantityLeft}
                        </motion.span>
                    </AnimatePresence>
                            <span className="opacity-50 pr-2">LEFT</span>

                
                  
                </span>
                <span className="bg-black/8 dark:bg-white/8 rounded-[10px] py-0.5 px-2">
                    {product.tags?.fabric.split(" ")[0]}
                    <span className="opacity-50"> {product.tags?.fabric.split(" ")[1]}</span>
                </span>
            </div>
        </motion.div>
    );
};
