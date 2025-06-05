import { BrowserRouter, Route, Routes } from 'react-router'
import AccountPage from './pages/AccountPage'
import HomePage from './pages/HomePage'
import MainLayout from './components/layout/MainLayout.tsx'
import ProductPage from './pages/ProductPage/index.tsx'


export default function RoutesConfig() {
    return (

        <BrowserRouter>
            <Routes>

                <Route path="/" element={<MainLayout />} >
                    <Route index element={<HomePage />} ></Route>
                    <Route path="/account" element={<AccountPage />} ></Route>
                </Route>

                <Route path="/product/:id" element={<ProductPage />} />

            </Routes>
        </BrowserRouter>
    )
}
