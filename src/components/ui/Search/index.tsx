import { useEffect, useRef } from "react";
import SearchIcon from "@/components/icon/SearchIcon";
import { AnimatePresence, motion } from 'framer-motion';
import CloseButton from "@/components/ui/CloseButton";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: (value: string) => void;
  value: string;
}

export default function SearchOverlay({
  isOpen,
  onClose,
  onChange,
  value,
}: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-90%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 400}}
          className="fixed top-0 items-center  left-0 right-0 z-50  flex dark:bg-black bg-white px-4 border-b border-white dark:border-black gap-3 "
        >
          <div className="flex items-center space-x-4 flex-1 h-[60px] ">
            <div className="flex-1 flex relative">
              <SearchIcon className="absolute top-[10px] opacity-30 left-3 w-[22px] h-[22px]" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
                  w-full pl-11 bg-black/5  
                  dark:bg-white/5 dark:text-white 
                  dark:placeholder-white/30 placeholder-black/50
                  rounded-[10px] px-3 py-2 
                  focus:outline-none 
                "
              />
              <AnimatePresence>
                {value && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => onChange("")}
                  >
                    <CloseButton
                      className="top-[13px] dark:!bg-white/20 !bg-black/25 right-[14px] w-[16px] h-[16px]"
                      ClassNameIcon="dark:!opacity:90 text-white dark:text-black w-[7px] h-[7px]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <motion.button
            onClick={onClose}
            className="dark:text-white text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
