
import GridProducts from "@/components/ui/GridProducts";
import Header from '@/components/layout/Header';
import { motion } from 'framer-motion';
import BottomNavigation from "@/components/layout/BottomNavigation";
import { viewport } from "@telegram-apps/sdk-react";

export default function HomePage() {
    console.log("HomePage");
   
    return (
        
            <motion.div

                className=" overflow-y-scroll overscroll-y-contain h-[calc(100vh-10px)] "
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
                </motion.div>
        

    );
}
