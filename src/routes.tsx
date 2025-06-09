import { Route, Routes } from 'react-router';
import { Suspense, lazy } from 'react';
import LoadingMount from './components/ui/LoadingMount/index.tsx';

const HomePage = lazy(() => import('./pages/HomePage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const MainLayout = lazy(() => import('@/components/layout/MainLayout'));

export default function RoutesConfig() {
    console.log("RoutesConfig");

    return (
        <div className='bg-white text-black dark:bg-black dark:text-white'>
            <Suspense fallback={<LoadingMount />}>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="/account" element={<AccountPage />} />
                    </Route>
                    <Route path="/product/:id" element={<ProductPage />} />

                </Routes>
            </Suspense>
        </div>
    );
}
