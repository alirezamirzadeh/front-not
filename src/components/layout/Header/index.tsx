import { motion } from 'framer-motion';
import SearchIcon from "@/components/icon/SearchIcon";
import Cart from "@/components/ui/Cart";
import FilterProducts from "@/components/ui/FilterProducts";

interface HeaderProps {
    setIsSearching: (value: boolean) => void;
}

export default function Header({ setIsSearching }: HeaderProps) {
    console.log("Header");
    
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="sticky top-0 z-40 flex flex-col justify-end bg-white dark:bg-black border-b border-white h-[140px] dark:border-black"
        >
            <div className="flex items-center justify-between px-4 py-3">
                <h1 className="text-main">Not Store</h1>
                <div className="flex  items-center">
                    <FilterProducts />
                    <motion.button
                        onClick={() => setIsSearching(true)}
                        whileTap={{ scale: 0.95 }}
                        className="p-1.5"
                    >
                        <SearchIcon className="w-[28px] h-[28px]" />
                    </motion.button>
                    <Cart />
                </div>
            </div>
        </motion.header>
    )
}
