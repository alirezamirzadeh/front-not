// src/Routes.tsx

import { createBrowserRouter, RouterProvider, Outlet, useLocation, redirect } from 'react-router';
import { lazy, Suspense } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

import LoadingMount from './components/ui/LoadingMount';

const HomePage = lazy(() => import('./pages/HomePage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const MainLayout = lazy(() => import('./components/layout/MainLayout'));

const rootLoader = async () => {
    const params = retrieveLaunchParams();
    const startParam = params.startParam as string;
    if (startParam?.startsWith("product_")) {
        return redirect(`/product/${startParam.split("_")[1]}`);
    }
    return null;
};



const RootLayout = () => {
    const location = useLocation();
    return (
        <LayoutGroup>
            <AnimatePresence >
                <Suspense fallback={<LoadingMount />}>
                    <div key={location.key} className="absolute inset-0">
                        <Outlet />
                    </div>
                </Suspense>
            </AnimatePresence>
        </LayoutGroup>
    );
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                element: <MainLayout />,
                loader: rootLoader,
                children: [
                    { index: true, element: <HomePage /> },
                    { path: 'account', element: <AccountPage /> },
                ],
            },
          
        ]
    }
]);

export default function Routes() {
    return <RouterProvider router={router} />;
}