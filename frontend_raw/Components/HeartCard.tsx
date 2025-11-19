import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { HeartMemory } from '../App';

interface HeartCardProps {
  memory: HeartMemory;
  index: number;
}

export function HeartCard({ memory, index }: HeartCardProps) {
  const [showImage, setShowImage] = useState(true);

  // Subtle floating animation
  const floatAnimation = useMemo(() => {
    const floatX = (Math.random() - 0.5) * 20; // -10 to 10px
    const floatY = (Math.random() - 0.5) * 20; // -10 to 10px
    const duration = 8 + Math.random() * 4; // 8-12 seconds
    const rotation = (Math.random() - 0.5) * 5; // -2.5 to 2.5 degrees
    
    return { floatX, floatY, duration, rotation };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowImage((prev) => !prev);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: [0, floatAnimation.floatX, 0],
        y: [0, floatAnimation.floatY, 0],
        rotate: [0, floatAnimation.rotation, 0],
      }}
      transition={{ 
        opacity: { duration: 0.5, delay: index * 0.1 },
        scale: { duration: 0.5, delay: index * 0.1 },
        x: { duration: floatAnimation.duration, repeat: Infinity, ease: "easeInOut", delay: index * 0.1 },
        y: { duration: floatAnimation.duration, repeat: Infinity, ease: "easeInOut", delay: index * 0.1 },
        rotate: { duration: floatAnimation.duration, repeat: Infinity, ease: "easeInOut", delay: index * 0.1 },
      }}
      className="relative w-full aspect-square flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {showImage ? (
          <motion.div
            key="image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center"
          >
            {/* Heart-shaped Image */}
            <div
              className="w-[90%] h-[90%] shadow-xl shadow-[#FFB5D8]/30"
              style={{
                clipPath: 'path("M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z")',
                transform: 'scale(7.5)',
              }}
            >
              <img
                src={memory.imageUrl}
                alt="Heart memory"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center"
          >
            {/* Heart-shaped Text Background */}
            <div
              className="w-[90%] h-[90%] bg-gradient-to-br from-[#FFB5D8] to-[#C8B6FF] shadow-xl shadow-[#C8B6FF]/30 flex items-center justify-center p-8"
              style={{
                clipPath: 'path("M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z")',
                transform: 'scale(7.5)',
              }}
            >
              <p className="text-center text-white leading-relaxed text-xs sm:text-sm" style={{ transform: 'scale(0.133)' }}>
                "{memory.message}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}