import SearchIcon from '@/components/icon/SearchIcon';
import { motion } from 'framer-motion';
import SearchOverlay from '../SearchOverlay';
import { useState } from 'react';
import { useProductsStore } from '@/store/productsStore';
import { useShallow } from 'zustand/react/shallow';

export default function Search() {
    const [isSearching, setIsSearching] = useState(false);
    const {  setSearchText, filters } = useProductsStore(
        useShallow((s) => ({
            setSearchText: s.setSearchText,
            filters: s.filters,
        }))
    );
    console.log("Search");

    return (
        <>
            <motion.button
                onClick={() => setIsSearching(true)}
                whileTap={{ scale: 0.95 }}
                className="p-1.5"
            >
                <SearchIcon className="w-[28px] h-[28px]" />

            </motion.button>
            <SearchOverlay isOpen={isSearching}
                onClose={() => {
                    setIsSearching(false);
                    setSearchText("");
                }}
                onChange={setSearchText}
                value={filters.searchText} />

        </>
    )
}
