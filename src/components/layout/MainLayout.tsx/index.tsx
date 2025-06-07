import { Outlet, useNavigate } from 'react-router'
import BottomNavigation from '../BottomNavigation'
import { useEffect } from 'react';

export default function MainLayout() {
    const params = new URLSearchParams(window.location.search);
    const startParam = params.get('product');
    const navigate = useNavigate()

    useEffect(() => {
        if (startParam) {
            navigate("/product/" + startParam)
        }
    }, [])
    return (
        <>
            <Outlet />
            <BottomNavigation />
        </>
    )
}
