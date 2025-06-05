import { useParams } from "react-router";
import { useCartStore } from "@/store/cartStore";
import { useProductsStore } from "@/store/productsStore";
import Button from "@/components/ui/Button";
import ShareIcon from "@/components/icon/ShareIcon";
import { useEffect, useState } from "react";
import NotFoundProducts from "@/components/ui/NotFoundProducts";
import { AnimatePresence, motion } from "motion/react";
import TickIcon from "@/components/icon/TickIcon";

export default function ProductPage() {
    const { id } = useParams();
    const products = useProductsStore(state => state.products);
    const loading = useProductsStore(state => state.loading);
    const error = useProductsStore(state => state.error);

    const items = useCartStore(state => state.items);
    const addItem = useCartStore(state => state.addItem);
    const removeItem = useCartStore(state => state.removeItem);
    const updateQuantity = useCartStore(state => state.updateQuantity);

    const product = products.find(p => p.id.toString() === id);

    const [mainImage, setMainImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setMainImage(product.images[0]);
        } else {
            setMainImage(undefined);
        }
    }, [product]);

    if (loading) {
        return (
            <div className="container mx-auto h-screen overflow-y-hidden flex flex-col">
                <motion.div
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 0.8,
                    }}
                    className="flex flex-col gap-3 pt-4 px-4 h-full"
                >
                    <div className="flex justify-between items-center mb-4">
                        <div className="h-6 bg-gray-200 dark:bg-white/5 rounded w-3/4"></div>
                        <div className="h-6 w-6 bg-gray-200 dark:bg-white/5 rounded-full"></div>
                    </div>
                    <div className="h-4 bg-gray-200 dark:bg-white/5 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-white/5 rounded w-1/3 mb-4"></div>

                    <div className="w-full rounded-[20px] overflow-hidden flex-grow bg-gray-200 dark:bg-white/5"></div>

                    <div className="flex space-x-2 no-scrollbar overflow-x-auto pb-2 flex-shrink-0">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <div key={idx} className="w-20 h-20 flex-shrink-0 rounded-2xl bg-gray-200 dark:bg-white/5"></div>
                        ))}
                    </div>

                    <div className="flex gap-2 mt-auto  h-[83px]">
                        <div className="flex-1 h-[50px] bg-gray-200 dark:bg-white/5 rounded-xl"></div>
                        <div className="flex-1 h-[50px] bg-gray-200 dark:bg-white/5 rounded-xl"></div>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div>{error || <NotFoundProducts />}</div>
        );
    }

    const isInCart = items.some(item => item.id === product.id.toString());
    const cartItem = items.find(item => item.id === product.id.toString());

    const handleCartAction = () => {
        if (!isInCart) {
            addItem({
                id: product.id.toString(),
                name: product.name,
                price: product.price,
                image: product.images[0]
            });
        }
    };

    const handleAddCart = () => {
        if (cartItem) {
            updateQuantity(product.id.toString(), cartItem.quantity + 1);
        } else {
            addItem({
                id: product.id.toString(),
                name: product.name,
                price: product.price,
                image: product.images[0]
            });
        }
    };

    const handleRemoveCart = () => {
        if (cartItem && cartItem.quantity > 1) {
            updateQuantity(product.id.toString(), cartItem.quantity - 1);
        } else if (cartItem && cartItem.quantity === 1) {
            removeItem(product.id.toString());
        }
    };

    const handleThumbnailClick = (image: string) => {
        setMainImage(image);
    };

    return (
        <div className="container mx-auto h-screen overflow-y-hidden flex flex-col">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ x: 0, opacity: 1, y: 0 }}

                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.5
                    , ease: "easeInOut"
                }} className="flex flex-col gap-3 pb-2 pt-4 px-4 flex-shrink-0">
                <div className="flex justify-between items-center">
                    <h1 className="text-main text-xl font-bold flex items-center gap-2">{product.category} {product.name} {isInCart && <TickIcon className="w-5 h-5 text-green-500" />}</h1>
                    <ShareIcon />
                </div>

                <p className="text-secondary text-sm pr-12">{product.description}</p>
                <div className="text-xs font-[590] gap-2 flex items-center mb-2">
                    <span className="bg-black/8 dark:bg-white/8 rounded-[10px] py-0.5 px-2">{product.price} &nbsp;
                        <span className="opacity-50">${product.currency}</span>
                    </span>
                    <span className="bg-black/8 dark:bg-white/8 rounded-[10px] py-0.5 px-2">{product.left} &nbsp;
                        <span className="opacity-50">LEFT</span>
                    </span>
                    <span className="bg-black/8 dark:bg-white/8 rounded-[10px] py-0.5 px-2">
                        {product.tags?.fabric.split(" ")[0]}&nbsp;
                        <span className="opacity-50">{product.tags?.fabric.split(" ")[1]}
                        </span>
                    </span>
                </div>
            </motion.div>

            <div className="flex-grow flex flex-col  space-y-2 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mainImage || "placeholder"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full rounded-[20px] px-4 overflow-hidden flex-grow"
                    >
                        {mainImage ? (
                            <img
                                src={mainImage}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-[20px]"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-white/10 rounded-[20px]" />
                        )}
                    </motion.div>
                </AnimatePresence>

                {product.images && product.images.length > 0 && (
                    <div className="flex space-x-2 ml-4 pr-4  no-scrollbar overflow-x-auto pb-2 flex-shrink-0">
                        {product.images.map((image, idx) => (
                            <div
                                key={idx}
                                className={`w-20  h-20 flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer border-2 duration-200 transition-all ease-in ${mainImage === image ? 'border-black dark:border-white' : 'border-transparent'}`}
                                onClick={() => handleThumbnailClick(image)}
                            >
                                <img
                                    src={image}
                                    alt={`${product.name} ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="space-y-6 px-4 flex-shrink-0 mt-auto h-[83px] ">
                <div className="flex gap-2">

                    <Button onClick={handleCartAction} className="flex-1 !text-black dark:!text-white bg-black/8 dark:bg-white/8">

                        {isInCart ? (
                            <motion.div
                                className="flex gap-4 items-center font-[590]"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.button
                                    onClick={handleRemoveCart}
                                    className="text-xl pr-0.5 scale-x-200 font-medium"
                                    whileTap={{ scale: 0.9 }}
                                >-</motion.button>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={cartItem?.quantity}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-xl inline-block"
                                    >{cartItem?.quantity}</motion.span>
                                </AnimatePresence>
                                <motion.button
                                    onClick={handleAddCart}
                                    className="text-2xl -translate-y-0.5 font-medium"
                                    whileTap={{ scale: 0.9 }}
                                >+</motion.button>
                            </motion.div>

                        ) : (
                            <AnimatePresence mode="wait">

                                <motion.div transition={{ delay: 0.1 }} initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >Add to Cart
                                </motion.div>
                            </AnimatePresence>
                        )}

                    </Button>

                    <Button className="flex-1">
                        Buy now
                    </Button>
                </div>
            </div>
        </div>
    );
} 