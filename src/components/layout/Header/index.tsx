import SearchIcon from "@/components/icon/SearchIcon";
import Cart from "@/components/ui/Cart";

export default function Header({ setIsSearching }: { setIsSearching: (state: boolean) => void }) {
    return (
        <div className="px-4 pt-4 flex justify-between items-center">
            <p className="text-main">Not Store</p>
            <div className="flex gap-2 items-center">
                <button onClick={() => setIsSearching(true)}>
                    <SearchIcon className="fill-black text-black w-[28px] h-[28px] dark:fill-white dark:text-white" />
                </button>
                <Cart />
            </div>
        </div>
    )
}
