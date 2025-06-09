import { Outlet, useNavigate, useLocation } from 'react-router'
import BottomNavigation from '../BottomNavigation'
import { useLaunchParams } from '@telegram-apps/sdk-react'
import { useEffect } from 'react'


export default function MainLayout() {
    const params = useLaunchParams()
    const startParam = params.tgWebAppStartParam
    const navigate = useNavigate()
    const location = useLocation()
    const isProductPage = location.pathname.startsWith('/product/')

    useEffect(() => {
        if (startParam) {
            const productId = startParam.split("_")[1];
            if (productId) {
                navigate("/product/" + productId);
            }
        }
    }, [startParam, navigate])
    console.log("MainLayout");
    
    return (
        <div className=''>
            <Outlet />
            {!isProductPage && <BottomNavigation />}
        </div>
    )
}
