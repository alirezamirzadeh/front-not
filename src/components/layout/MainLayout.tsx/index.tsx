import { Outlet, useNavigate } from 'react-router'
import BottomNavigation from '../BottomNavigation'
import { useEffect } from 'react';
import { useLaunchParams } from '@telegram-apps/sdk-react';

export default function MainLayout() {
    const params = useLaunchParams()
    const startParam = params.tgWebAppStartParam
    const navigate = useNavigate()

    useEffect(() => {
        if (startParam) {
            navigate("/product/" + startParam.split("_"[1]))
        }
    }, [])
    return (
        <>
            <Outlet />
            <BottomNavigation />
        </>
    )
}
