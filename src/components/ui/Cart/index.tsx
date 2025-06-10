import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/Drawer";
import { CartTrigger } from "../CartTrigger";
import { CartContent } from "../CartContent";

export default function Cart() {
    console.log("Cart container rendered");

    return (
     
        <Drawer>
            <DrawerTrigger>
                <CartTrigger />
            </DrawerTrigger>
            <DrawerContent>
                <CartContent />
            </DrawerContent>
        </Drawer>
    );
}