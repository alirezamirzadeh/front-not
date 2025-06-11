import Cart from "@/components/ui/Cart";
import FilterProducts from "@/components/ui/FilterProducts";
import Search from '@/components/ui/Search';
import { memo } from "react";



const Header = memo(() => {
    console.log("Header");
    
    return (
        <header

            className="fixed safe-area left-0 right-0 top-0 w-full   z-[50] home  bg-white dark:bg-black  border-white  dark:border-black"
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
