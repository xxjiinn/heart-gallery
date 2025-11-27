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
    <div className="min-h-screen flex flex-col items-center pt-4 md:pt-[3.4vh] px-6 md:px-[2.85vw] pb-[120px] md:pb-[140px] overflow-hidden">
      {/* Header Bar */}
      <div className="w-full md:w-[calc(100vw-5.7vw)] md:max-w-[1358px] h-[56px] md:h-[72px] bg-[#FFFAF6] rounded-[16px]
                      shadow-[0_10px_15px_-3px_rgba(255,181,216,0.20),0_4px_6px_-4px_rgba(255,181,216,0.20)]
                      flex items-center justify-between px-4 md:px-8 flex-shrink-0 relative">

        {/* Left: Back Button */}
        <button 
          onClick={onBackToMain}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span className="font-semibold text-sm md:text-base">Back</span>
        </button>

        {/* Center Title */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[11px]">
          <Heart className="w-[24px] h-[24px]" color="#FFB5D8" fill="#FFB5D8" strokeWidth={2} />
          <h1 className="text-[#A381FF] font-semibold text-[20px] leading-[24px] w-[160px] text-center">
            아!愛 모먼트 갤러리
          </h1>
          <Heart className="w-[24px] h-[24px]" color="#FFB5D8" fill="#FFB5D8" strokeWidth={2} />
        </div>

        {/* Title과 좌우 균형을 맞추기 위한 빈 칸 */}
        <div className="w-[60px] md:w-[80px]"></div>

      </div>


      {/* Subtitle (페이지1과 동일하게 적용) */}
      <div className="text-center mt-4 md:mt-[20px] mb-4 md:mb-[1vh] flex-shrink-0">
        <div className="w-full md:w-[438px] h-auto md:h-[54px] mx-auto flex flex-col items-center justify-center">
          <p
            className="font-[Pretendard Variable] font-semibold text-[#8C66FF] text-[16px] md:text-[16px] leading-[22px] md:leading-[22px] text-center"
            style={{ letterSpacing: '-0.466px' }}
          >
            "아! 이건 틀림 없이 사랑이다!"
          </p>
          <p
            className="font-[Pretendard Variable] font-semibold text-[#8C66FF] text-[16px] md:text-[16px] leading-[22px] md:leading-[22px] text-center mt-0"
            style={{ letterSpacing: '-0.466px' }}
          >
            ✨ 지나쳤던 일상 속 사랑의 순간을 떠올려보세요 ✨
          </p>
        </div>
      </div>


      {/* ░░ Grid 영역 ░░ */}
      <div className="w-full max-w-7xl mx-auto flex-1 overflow-y-auto px-2 md:px-4 pt-4 md:pt-6 scrollbar-hide">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-1">
            {memories.map((memory, index) => (
              <HeartCard key={memory.id} memory={memory} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* <div className="flex justify-center mt-6 mb-6 md:mb-10 flex-shrink-0">
        <Button
          onClick={onBackToMain}
          className="w-full md:w-[500px] py-3.5 md:py-6 rounded-2xl text-white shadow-lg shadow-[#FFB5D8]/30
                     bg-gradient-to-r from-[#FFB5D8] to-[#FFC9E5]
                     hover:from-[#FFA0C8] hover:to-[#FFB5D8]
                     text-base md:text-lg font-bold transition-all"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          돌아가기
        </Button>
      </div> */}
    </div>
  );
}
