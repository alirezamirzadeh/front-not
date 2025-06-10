import  { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import LoadingMount from './components/ui/LoadingMount/index.tsx';

const HomePage = lazy(() => import('./pages/HomePage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const MainLayout = lazy(() => import('@/components/layout/MainLayout'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/account', element: <AccountPage /> },
    ],
  },
  { path: '/product/:id', element: <ProductPage /> },
]);

export default function RoutesConfig() {
  return (
    <div className="bg-white   text-black dark:bg-black dark:text-white">
      <Suspense fallback={<LoadingMount />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}
