import ShareIcon from "@/components/icon/ShareIcon";
import type { ProductInfoProps } from "@/types/Product";
import { shareURL } from "@telegram-apps/sdk-react";  // وارد کردن API تلگرام
import { motion } from "motion/react";

export const ProductInfo = ({ product }: ProductInfoProps) => {
    const handleShare = () => {
        const productUrl = `https://t.me/NOTFrontContestBot/start?product=${product.id}`;
        shareURL.ifAvailable(productUrl, `Check out this amazing product: ${product.name}`);
        console.log(productUrl);
        
      };
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ x: 0, opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col gap-3 pb-2 px-4 flex-shrink-0"
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
                <span className="bg-black/8 dark:bg-white/8 rounded-[10px] py-0.5 px-2">
                    {product.left} <span className="opacity-50">LEFT</span>
                </span>
                <span className="bg-black/8 dark:bg-white/8 rounded-[10px] py-0.5 px-2">
                    {product.tags?.fabric.split(" ")[0]}
                    <span className="opacity-50"> {product.tags?.fabric.split(" ")[1]}</span>
                </span>
            </div>
        </motion.div>
    );
};
