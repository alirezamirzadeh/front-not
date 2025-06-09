// components/Profile.tsx
import { motion } from 'framer-motion';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { useRef } from 'react';
import { cn } from '@/lib/ui';

type Props = { scale?: boolean };

export default function Profile({ scale }: Props) {
  const { tgWebAppData } = useLaunchParams();
  const user = tgWebAppData?.user;

  const imgRef = useRef<HTMLImageElement>(null);
  const skeletonRef = useRef<HTMLDivElement>(null);

  if (!user) return <ProfileSkeleton />;

  const handleLoaded = () => {
    imgRef.current?.classList.add('opacity-100');
    skeletonRef.current?.classList.add('opacity-0');
  };

  console.log("profile");
  

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(scale ? "gap-[1.5px]" : "gap-4 py-6", "flex flex-col items-center ")}
    >
      <div className="relative">
        <div
          ref={skeletonRef}
          className={cn(
            scale ? `w-6 h-6` : "w-24 h-24",!user.photo_url && "animate-pulse",
            'absolute inset-0  rounded-full bg-gray-200 dark:bg-white/10  transition-opacity duration-300'
          )}
        />
        <img
          ref={imgRef}
          src={user.photo_url}
          alt="profile"
          loading="lazy"
          decoding="async"
          onLoad={handleLoaded}
          className={cn(
            scale ? `w-6 h-6` : "w-24 h-24",!user.photo_url && "animate-pulse",
            ' rounded-full object-cover opacity-0 transition-opacity duration-300'
          )}
        />
      </div>

      <h2
        className={cn(
            scale ? "text-[10px] font-medium" :
          'text-xl font-semibold'
        )}
      >
        {user.first_name}
      </h2>
    </motion.div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
      <div className="w-32 h-6 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
    </div>
  );
}
