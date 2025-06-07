import profile from '/images/profile.png'
import { useLaunchParams } from "@telegram-apps/sdk-react";


export default function Profile() {
    const launchParams = useLaunchParams();
    const user = launchParams.tgWebAppData?.user;

    return (
        <div className='flex flex-col w-full items-center mt-10  gap-2 '>
            <img src={user?.photo_url ?? profile}
                className='rounded-full' alt="profile" width={120} height={120} />
            <h1 className='text-[26px] font-[590]'>{user?.first_name ?? "Alex"}</h1>
        </div>
    )
}
