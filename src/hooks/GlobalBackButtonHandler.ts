// src/components/logic/GlobalBackButtonHandler.tsx

import { useEffect } from "react";
import { backButton, miniApp } from "@telegram-apps/sdk-react";
import { useLocation, useNavigate } from "react-router";

import { useProductsStore } from "@/store/productsStore";
import { useShallow } from "zustand/react/shallow";

export const GlobalBackButtonHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const {
  
        setSelectedProduct,
        selectedProduct
    } = useProductsStore(useShallow((s) => ({

        setSelectedProduct: s.setSelectedProduct,
        selectedProduct:s.selectedProduct
    })));

    useEffect(() => {
        backButton.mount();

        const handleBackClick = () => {
            if (selectedProduct) {
                setSelectedProduct(null);
            }
            else if (location.pathname !== '/') {
                setSelectedProduct(null);
                navigate(-1);
            }
            else {
                miniApp.close();
            }
        };
        
        if (selectedProduct || location.pathname !== '/') {
            backButton.show();
        } else {
            backButton.hide();
        }

        const off = backButton.onClick(handleBackClick);
        return () => {
            off();
            backButton.unmount();
        };

    }, [location.pathname,selectedProduct, setSelectedProduct, navigate]);
    
    return null;
};