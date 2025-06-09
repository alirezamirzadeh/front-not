import { motion } from 'framer-motion';
import Cart from "@/components/ui/Cart";
import FilterProducts from "@/components/ui/FilterProducts";
import Search from '@/components/ui/Search';



export default function Header() {
    console.log("Header");
    
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="sticky top-0 z-40  bg-white dark:bg-black border-b border-white  dark:border-black"
        >
            <div className="flex items-center justify-between px-4 py-3">
                <h1 className="text-main">Not Store</h1>
                <div className="flex  items-center">
                    <FilterProducts />
                    <Search />
      
                    <Cart />
                </div>
            </div>
        </motion.header>
    )
}
