import FilterIcon from "@/components/icon/FilterIcon";
import Button from "@/components/ui/Button";
import CloseButton from "@/components/ui/CloseButton";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/Drawer";
import { useProductsStore } from "@/store/productsStore";
import { MultiRangeSlider } from "../MultiRangeSlider";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/ui";
import { useShallow } from 'zustand/react/shallow';

export default function FilterProducts() {
    const drawerRef = useRef<HTMLButtonElement>(null);

    const {
        products,
        tempFilters,
        setTempPriceRange,
        toggleTempCategory,
        getMaxPrice,
        applyFilters,
        resetTempFilters,
        isFiltering } = useProductsStore(
            useShallow((s) => ({
                products: s.products,
                tempFilters: s.tempFilters,
                setTempPriceRange: s.setTempPriceRange,
                getMaxPrice: s.getMaxPrice,
                toggleTempCategory: s.toggleTempCategory,
                applyFilters: s.applyFilters,
                resetTempFilters: s.resetTempFilters,
                isFiltering: s.isFiltering,
            }))
        );


    const categories = useMemo(() => {
        return [...new Set(products.map(product => product.category))];
    }, [products]);
    const maxPrice = getMaxPrice()

    useEffect(() => {
        resetTempFilters()
    }, [])

    const handleApplyFilters = useCallback(async () => {
        await applyFilters();
        drawerRef.current?.click();
    }, [applyFilters]);
    console.log("FilterProducts");

    return (
        <Drawer>
            <DrawerTrigger>
                <FilterIcon />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="flex-none">
                    <DrawerClose ref={drawerRef}>
                        <CloseButton className="top-4 right-[14px] w-[28px] h-[28px]" ClassNameIcon="opacity-20 w-[10px] h-[10px]" />
                    </DrawerClose>
                    <div className="w-full flex gap-2 flex-col mt-5">
                        <div className="flex flex-col">
                            <p className="text-left text-secondary mb-2">Category</p>
                            <div className="flex gap-2">
                                {categories.map(category => (
                                    <motion.div
                                        key={category}
                                        onClick={() => toggleTempCategory(category)}
                                        className={cn(tempFilters.categories.includes(category) ? "bg-black text-white dark:bg-white dark:text-black" : " bg-black/8 dark:bg-white/8", "flex-1 rounded-lg p-2 cursor-pointer ")}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {category}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-left text-secondary mb-3 mt-4">Price</p>
                            <MultiRangeSlider
                                value={tempFilters.priceRange}
                                onValueChange={setTempPriceRange}
                                min={0}
                                max={maxPrice}
                                step={10} 
                          />
                        </div>
                        <p className="text-left">{tempFilters.priceRange[0]}<span className="opacity-50 mx-1"> NOT</span>-&nbsp;{tempFilters.priceRange[1]}<span className="opacity-50 mx-1"> NOT</span></p>
                    </div>
                </DrawerHeader>
                <DrawerFooter>
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full"
                        >
                            <Button
                                onClick={handleApplyFilters}
                                disabled={isFiltering}
                                className="relative"
                            >
                                <AnimatePresence mode="wait">
                                    {isFiltering ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 flex items-center justify-center"
                                        >
                                            <motion.div
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="text"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >

                                            Apply Filter
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </motion.div>
                    </AnimatePresence>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
