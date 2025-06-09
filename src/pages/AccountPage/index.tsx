import { motion } from 'framer-motion';
import { useEffect } from 'react';

import { backButton } from '@telegram-apps/sdk-react';
import { useNavigate } from 'react-router';
import Profile from '@/components/ui/Profile';

import HistoryBox from '@/components/ui/HistoryBox';

export default function AccountPage() {

  const navigate = useNavigate();

  useEffect(() => {
    backButton.show();
    const off = backButton.onClick(() => navigate("/"));
    return () => {
      off();
      backButton.hide();
    };
  }, [navigate]);



  console.log("AccountPage");

  return (
    <motion.div
      className="px-4 relative overflow-y-scroll overscroll-y-contain h-[calc(100vh-20px)] w-screen min-h-screen flex flex-col"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="sticky top-0 pt-20 bg-white dark:bg-black z-10">
        <Profile />
        <h2 className="mt-6 mb-4 text-xl font-semibold">History</h2>
      </div>
      <HistoryBox />

    </motion.div>
  );
}
