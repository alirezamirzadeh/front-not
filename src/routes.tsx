import { BrowserRouter, Route, Routes } from 'react-router'
import MainLayout from './components/layout/MainLayout.tsx'
import { Suspense, lazy } from 'react';
import LoadingMount from './components/ui/LoadingMount/index.tsx';
import { AnimatePresence } from 'motion/react';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));

export default function RoutesConfig() {
    return (
        <div className='bg-white text-black dark:bg-black dark:text-white'>
            <AnimatePresence mode="wait">
                <BrowserRouter>
                    <Suspense fallback={<LoadingMount />}>

                        <Routes>
                            <Route path="/" element={<MainLayout />}>
                                <Route index element={
                                    <Suspense fallback={<LoadingMount />}>
                                        <HomePage />
                                    </Suspense>
                                } />
                                <Route path="/account" element={
                                    <Suspense fallback={<LoadingMount />}>
                                        <AccountPage />
                                    </Suspense>
                                } />
                                <Route path="/product/:id" element={
                                    <Suspense fallback={<LoadingMount />}>
                                        <ProductPage />
                                    </Suspense>
                                } />
                            </Route>
                        </Routes>
                    </Suspense>

                </BrowserRouter>
            </AnimatePresence>
        </div>
    )
}
