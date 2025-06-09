import { BrowserRouter, Route, Routes } from 'react-router';
import MainLayout from './components/layout/MainLayout.tsx';
import { Suspense, lazy } from 'react';
import LoadingMount from './components/ui/LoadingMount/index.tsx';
import { AnimatePresence } from 'motion/react';

const HomePage = lazy(() => import('./pages/HomePage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));

export default function RoutesConfig() {
    console.log("RoutesConfig");

    return (
        <div className='bg-white text-black dark:bg-black dark:text-white'>
            <AnimatePresence mode="wait">
                <BrowserRouter>
                    <Suspense fallback={<LoadingMount />}>
                        <Routes>
                            <Route path="/" element={<MainLayout />}>
                                <Route index element={<HomePage />} />
                                <Route path="/account" element={<AccountPage />} />
                                <Route path="/product/:id" element={<ProductPage />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </AnimatePresence>
        </div>
    );
}
