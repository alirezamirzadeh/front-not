import { BrowserRouter, Route, Routes } from 'react-router'

import MainLayout from './components/layout/MainLayout.tsx'
import { Suspense, lazy } from 'react';
import LoadingMount from './components/ui/LoadingMount/index.tsx';
const HomePage = lazy(() => import('./pages/HomePage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));

export default function RoutesConfig() {
    return (
        <div className='bg-white text-black dark:bg-black dark:text-white'>
            <Suspense fallback={<LoadingMount />}>
                <BrowserRouter>
                    <Routes>

                        <Route path="/" element={<MainLayout />} >
                            <Route index element={<HomePage />} ></Route>
                            <Route path="/account" element={<AccountPage />} ></Route>
                        </Route>

                        <Route path="/product/:id" element={<ProductPage />} />

                    </Routes>
                </BrowserRouter>
            </Suspense>
        </div>
    )
}
