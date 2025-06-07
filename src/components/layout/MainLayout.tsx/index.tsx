import { Outlet } from 'react-router'
import BottomNavigation from '../BottomNavigation'


export default function MainLayout() {

    return (
        <>
            <Outlet />
            <BottomNavigation />
        </>
    )
}
