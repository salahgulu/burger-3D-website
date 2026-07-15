import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate a beautifully smooth loading progress over 2.5 seconds
    const duration = 2500;
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 400); // Wait slightly after reaching 100%
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0807] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-orange-600/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Brand Logo Text */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="overflow-hidden mb-8">
          <motion.h1 
            className="text-5xl md:text-7xl font-black tracking-[0.2em] text-white"
            style={{ fontFamily: 'var(--font-display)' }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            BLAZE<span className="text-orange-500">.</span>
          </motion.h1>
        </div>

        {/* Loading Bar Container */}
        <div className="w-64 md:w-96 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
          {/* Active Loading Bar */}
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
            style={{ width: `${progress}%` }}
            layout
          />
        </div>

        {/* Loading Text */}
        <div className="mt-4 flex justify-between w-64 md:w-96 text-xs font-semibold tracking-widest text-neutral-500 uppercase">
          <span>Igniting</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
