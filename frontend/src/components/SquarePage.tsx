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
  console.log('SquarePage - memories:', memories);
  console.log('SquarePage - isLoading:', isLoading);

  return (
    <div className="min-h-screen pb-8 md:pb-0 flex flex-col">
      {/* Header - 고정 (모바일 + 데스크탑) */}
      <div className="pt-8 px-6 md:px-8 fixed top-0 left-0 right-0 z-20 bg-transparent pointer-events-none">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4 mt-4">
            <div className="flex items-center justify-center gap-3 md:gap-5 mb-5 md:mb-8">
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-[#FFB5D8] fill-[#FFB5D8]" />
              <h1 className="text-[#AC91FF] font-arita font-bold text-xl md:text-2xl">아! 모먼트</h1>
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-[#FFB5D8] fill-[#FFB5D8]" />
            </div>
            <p className="text-[#6634FF] opacity-80 font-arita font-bold mt-6 md:mt-10 text-base md:text-lg">
              🫶 누군가의 사랑이 담긴 순간을 함께 느껴보세요 🫶
            </p>
            {/* <p className="text-[#6634FF] opacity-80 font-arita font-bold text-base md:text-lg">
              '아! 모먼트'로 간직해보세요✨
            </p> */}
          </div>
        </div>
      </div>

      {/* Grid Container - 스크롤 영역 */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-[200px] pb-32 md:pt-[240px] flex-1 overflow-y-auto">
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
          /* Grid Layout - 모바일: 2열, 데스크탑: 4열 */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-1">
            {memories.map((memory, index) => (
              <HeartCard key={memory.id} memory={memory} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* 돌아가기 버튼 - 하단 고정 (모바일 + 데스크탑) */}
      <div className="flex justify-center fixed bottom-0 left-0 right-0 py-6 md:py-24 z-20 bg-transparent">
        <Button
          onClick={onBackToMain}
          className="bg-gradient-to-r from-[#FFB5D8] to-[#FFC9E5] hover:from-[#FFA0C8] hover:to-[#FFB5D8] text-white px-8 py-4 md:px-12 md:py-6 rounded-2xl text-base md:text-lg font-arita font-bold shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          돌아가기
        </Button>
      </div>
    </div>
  );
}