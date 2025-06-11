// src/Routes.tsx

import { createBrowserRouter, RouterProvider, Outlet, useLocation,  } from 'react-router';
import { lazy, Suspense } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { useProductsStore } from './store/productsStore';
import LoadingMount from './components/ui/LoadingMount';

const HomePage = lazy(() => import('./pages/HomePage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const MainLayout = lazy(() => import('./components/layout/MainLayout'));

const rootLoader = async () => {
    try {
        console.log("Root Loader IS EXECUTING!"); 
        await useProductsStore.getState().fetchProducts();
        const params = retrieveLaunchParams();
        const startParam = params.tgWebAppStartParam;
        
        if (startParam && startParam.startsWith("product_")) {
            const productId = parseInt(startParam.split("_")[1], 10);
            
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

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />, 
        loader: rootLoader,
        children: [
            {
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
                element: <HomePage />, 
            },
        ],
    },
]);

export default function Routes() {
    return <RouterProvider router={router} />;
}