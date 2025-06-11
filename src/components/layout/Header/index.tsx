import Cart from "@/components/ui/Cart";
import FilterProducts from "@/components/ui/FilterProducts";
import Search from '@/components/ui/Search';
import { memo } from "react";



const Header = memo(() => {
    console.log("Header");
    
    return (
        <header

            className="sticky  safe-area-top z-40 home  bg-white dark:bg-black border-b border-white  dark:border-black"
        >
            <div className="flex items-center justify-between px-4 py-3">
                <h1 className="text-main">Not Store</h1>
                <div className="flex  items-center">
                    <FilterProducts />
                    <Search />
      
                    <Cart />
                </div>
            </div>
        </header>
    )
})
export default Header;
