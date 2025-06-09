
import GridProducts from "@/components/ui/GridProducts";
import Header from '@/components/layout/Header';
import { motion } from 'framer-motion';

export default function HomePage() {
    console.log("HomePage");

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-y-scroll overscroll-y-contain h-[calc(100vh-20px)]"
        >

            <Header />

             <motion.div
                initial={{ y: -10, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >

                <GridProducts />

            </motion.div>
         </motion.div>
    );
}
