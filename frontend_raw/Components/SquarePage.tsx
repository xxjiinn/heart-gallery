import { HeartCard } from './HeartCard';
import { Button } from './ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import type { HeartMemory } from '../App';

interface SquarePageProps {
  memories: HeartMemory[];
  onBackToMain: () => void;
  isLoading?: boolean;
}

export function SquarePage({ memories, onBackToMain, isLoading }: SquarePageProps) {
  return (
    <div className="min-h-screen">
      {/* Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-30 flex justify-center px-4 md:px-8 pt-4">
        <div className="w-full max-w-[1358px] h-[56px] md:h-[72px] bg-[#FFFAF6] rounded-[16px] 
                        shadow-[0_10px_15px_-3px_rgba(255,181,216,0.20),0_4px_6px_-4px_rgba(255,181,216,0.20)]
                        flex items-center justify-between px-4 md:px-8 relative">

          {/* Back Button */}
          <button 
            onClick={onBackToMain}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors z-20"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-[#88878A] font-semibold text-sm md:text-base">Back</span>
          </button>

          {/* Center Title */}
          <div className="flex items-center gap-[11px] absolute left-1/2 -translate-x-1/2 z-10">
            <Heart className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" color="#FFB5D8" fill="#FFB5D8" />
            <h1 className="text-[#A381FF] font-semibold text-[20px] leading-[24px]">
              아!愛 모먼트
            </h1>
            <Heart className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" color="#FFB5D8" fill="#FFB5D8" />
          </div>

          {/* 오른쪽 여백 (Back 버튼과 균형용) */}
          <div className="w-[60px] md:w-[80px]"></div>

        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-[120px] md:pt-[150px] pb-20">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse text-center">
              <Heart className="w-20 h-20 text-[#FFB5D8] fill-[#FFB5D8] mx-auto mb-4" />
              <p className="text-[#C8B6FF]">Loading memories...</p>
            </div>
          </div>
        ) : memories.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Heart className="w-20 h-20 text-[#FFB5D8]/30 mx-auto mb-4" />
              <p className="text-[#C8B6FF] opacity-60">
                No memories yet. Create your first heart memory!
              </p>
            </div>
          </div>
        ) : (
          /* Grid Layout - Fixed positions */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12">
            {memories.map((memory, index) => (
              <HeartCard key={memory.id} memory={memory} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}