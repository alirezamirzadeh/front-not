import { Outlet, useNavigate } from 'react-router'
import BottomNavigation from '../BottomNavigation'
import { useLaunchParams } from '@telegram-apps/sdk-react'
import { useEffect } from 'react'


export default function MainLayout() {
    const params = useLaunchParams()
    const startParam = params.tgWebAppStartParam
    const navigate = useNavigate()

    useEffect(() => {
        if (startParam) {
            navigate("/product/" + startParam.split("_")[1])
        }
    }, [])

    return (
        <div className=''>
            <Outlet />
            <BottomNavigation />
        </div>
    )
}
