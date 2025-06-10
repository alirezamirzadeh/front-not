import MainLayout from '@/components/layout/MainLayout';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { lazy } from 'react';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { useProductsStore } from './store/productsStore';

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

const productLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) {
    throw new Response("Not Found", { status: 404 });
  }

  await useProductsStore.getState().fetchProducts();

  const products = useProductsStore.getState().products;
  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return { product };
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
  { path: '/product/:id', element: <ProductPage />, loader: productLoader, },
]);



export default function Routes() {
  return (
    <RouterProvider router={router} />

  )
}
