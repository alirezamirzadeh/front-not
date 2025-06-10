
import GridProducts from "@/components/ui/GridProducts";
import Header from '@/components/layout/Header';
import { motion } from 'framer-motion';
import { useEffect } from "react";
import { useProductsStore } from "@/store/productsStore";
import { useShallow } from "zustand/react/shallow";
import FooterButton from "@/components/ui/FooterButton";


export default function HomePage() {
    console.log("HomePage");
    const {

        fetchProducts } = useProductsStore(
            useShallow((s) => ({
                fetchProducts: s.fetchProducts,
            }))
        );
    useEffect(() => {
        fetchProducts();
    }, []);

    return (

        <motion.div

            className=" overflow-y-scroll overscroll-y-contain h-[calc(100vh-10px)]  "
        >

            <Header />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut", staggerChildren: 0.3 }}
            >

                <GridProducts />

            </motion.div>
            <FooterButton />

        </motion.div>

    );
}
