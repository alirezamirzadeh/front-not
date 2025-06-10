import MainLayout from '@/components/layout/MainLayout';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { lazy } from 'react';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router';

const HomePage = lazy(() => import('./pages/HomePage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));

const rootLoader = async () => {
  console.log("Root Loader Executing...");
  const params = retrieveLaunchParams();
  const startParam = params.startParam as string;

  if (startParam && startParam.startsWith("product_")) {
    const productId = startParam.split("_")[1];
    if (productId) {
      console.log(`Redirecting to /product/${productId}`);
      return redirect(`/product/${productId}`);
    }
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    loader: rootLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/account', element: <AccountPage /> },
    ],
  },
  { path: '/product/:id', element: <ProductPage /> },
]);



export default function Routes() {
  return (
    <RouterProvider router={router} />

  )
}
