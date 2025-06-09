// components/Profile.tsx
import { motion } from 'framer-motion';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { useRef } from 'react';
import profile from '/images/profile.png';
import { cn } from '@/lib/ui';

type Props = { scale?: number };

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
      className="flex flex-col items-center gap-4 py-6"
    >
      <div className="relative">
        <div
          ref={skeletonRef}
          className={cn(
            scale && `scale-[${scale}%]`,
            'absolute inset-0 w-24 h-24 rounded-full bg-gray-200 dark:bg-white/10  transition-opacity duration-300'
          )}
        />
        <img
          ref={imgRef}
          src={user.photo_url ?? profile}
          alt="profile"
          loading="lazy"
          decoding="async"
          onLoad={handleLoaded}
          className={cn(
            scale && `scale-[${scale}%]`,
            'w-24 h-24 rounded-full object-cover opacity-0 transition-opacity duration-300'
          )}
        />
      </div>

      <h2
        className={cn(
          scale && '-translate-y-[39px] scale-90',
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
