import { Outlet, useNavigate } from 'react-router'
import BottomNavigation from '../BottomNavigation'
import { useEffect } from 'react';
import { useLaunchParams, useRawInitData, useRawLaunchParams } from '@telegram-apps/sdk-react';

export default function MainLayout() {
    const params = useLaunchParams()
    const startParam = params.tgWebAppStartParam
    const navigate = useNavigate()


    useEffect(() => {
        console.log("1111111",startParam);
        console.log("222222222",params);
        console.log("333333",params.tgWebAppData?.start_param);
        console.log(useRawLaunchParams() );
                console.log(useRawInitData());
                  

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
