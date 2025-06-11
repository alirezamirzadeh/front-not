// src/components/logic/GlobalBackButtonHandler.tsx

import { useEffect } from "react";
import { backButton, miniApp } from "@telegram-apps/sdk-react";
import { useLocation, useNavigate } from "react-router";

import type { Product } from "@/types/Product";

export const GlobalBackButtonHandler = ({setSelectedProduct,product}: {setSelectedProduct: () =>void, product: Product}) => {
    const navigate = useNavigate();
    const location = useLocation();
    


    useEffect(() => {
        backButton.mount();

        const handleBackClick = () => {
            if (product) {
                setSelectedProduct();
            }
            else if (location.pathname !== '/') {
                navigate(-1);
            }
            else {
                miniApp.close();
            }
        };
        
        if (product || location.pathname !== '/') {
            backButton.show();
        } else {
            backButton.hide();
        }

        const off = backButton.onClick(handleBackClick);
        return () => {
            off();
            backButton.unmount();
        };

    }, [location.pathname,product, setSelectedProduct, navigate]);
    
    return null;
};