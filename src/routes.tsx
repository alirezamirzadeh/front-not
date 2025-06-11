// src/Routes.tsx

import { createBrowserRouter, RouterProvider, Outlet, useLocation, useNavigate, redirect } from 'react-router';
import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { useProductsStore } from './store/productsStore';
import LoadingMount from './components/ui/LoadingMount';

const HomePage = lazy(() => import('./pages/HomePage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const MainLayout = lazy(() => import('./components/layout/MainLayout'));

const rootLoader = async () => {
    try {
        console.log("Root Loader IS EXECUTING!"); // لاگ جدید برای تست
        await useProductsStore.getState().fetchProducts();
        const params = retrieveLaunchParams();
        const startParam = params.tgWebAppStartParam;
        
        if (startParam && startParam.startsWith("product_")) {
            const productId = parseInt(startParam.split("_")[1], 10);
            console.log(555555555,productId,startParam.split("_")[1]);
            
            if (!isNaN(productId)) {
                useProductsStore.getState().setProductToShowById(productId);
            }
        }
    } catch (error) {
        console.error("Error in rootLoader:", error);
    }
    return null;
};

const RootLayout = () => {
    const location = useLocation();
    return (
        <LayoutGroup>
            <AnimatePresence>
                <div key={location.pathname} className="absolute inset-0">
                    <Suspense fallback={<LoadingMount />}>
                        <Outlet />
                    </Suspense>
                </div>
            </AnimatePresence>
        </LayoutGroup>
    );
};

// === ساختار جدید و پایدار router ===
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />, // RootLayout والد همه چیز است
        // loader را بهب خود مسیر ریشه متصل می‌کنیم
        loader: rootLoader,
        children: [
            {
                // MainLayout دیگر loader ندارد
                element: <MainLayout />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                    },
                    {
                        path: "account",
                        element: <AccountPage />,
                    },
                ]
            },

            {
                path: "product/:id",
                element: <HomePage />, // در حالت رفرش، HomePage را نشان بده تا مودال باز شود
            },
        ],
    },
]);

export default function Routes() {
    return <RouterProvider router={router} />;
}