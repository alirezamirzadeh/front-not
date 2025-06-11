import { motion } from 'framer-motion';

import Profile from '@/components/ui/Profile';

import HistoryBox from '@/components/ui/HistoryBox';

export default function AccountPage() {




  console.log("AccountPage");

  return (
      <motion.div
      className="px-4 safe-area    relative overflow-y-scroll overscroll-y-contain h-[calc(100vh-20px)] w-screen min-h-screen flex flex-col"

    >
      <div className="sticky top-0  bg-white dark:bg-black z-10">
        <Profile />
        <h2 className="mt-6 mb-4 text-xl font-semibold">History</h2>
      </div>
      <HistoryBox />
    </motion.div>


  );
}
