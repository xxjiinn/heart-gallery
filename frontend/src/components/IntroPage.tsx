import { Button } from './ui/button';
import { Heart } from 'lucide-react';

interface IntroPageProps {
  onStart: () => void;
}

export function IntroPage({ onStart }: IntroPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center pt-4 px-6 pb-4" style={{ background: 'linear-gradient(to bottom, #FFF8F0 10%, #FFD6E8 70%, #E0D4FF 110%)' }}>
      <div className="w-full flex flex-col items-center">

        {/* AD_Live Logo */}
        <div className="w-full flex justify-center mb-3">
          <h2 className="text-[#FF0048] font-bold text-[18px]" style={{ fontFamily: 'Gotham, sans-serif', fontWeight: 900 }}>
            AD_Live
          </h2>
        </div>

        {/* Header Bar */}
        <div className="w-full h-[56px] bg-[#FFFAF6] rounded-[16px] shadow-[0_10px_15px_-3px_rgba(255,181,216,0.20),0_4px_6px_-4px_rgba(255,181,216,0.20)] flex items-center justify-center flex-shrink-0">
          <div className="flex items-center gap-[11px]">
            <Heart className="w-[20px] h-[20px]" color="#FFB5D8" fill="#FFB5D8" />
            <h1 className="text-[#A381FF] font-semibold text-[17px] leading-[20px] w-[85px] text-center">
              아!愛 모먼트
            </h1>
            <Heart className="w-[20px] h-[20px]" color="#FFB5D8" fill="#FFB5D8" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center mt-12 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg shadow-[#FFB5D8]/20 mb-8 max-w-md">
            <p className="font-[Pretendard Variable] font-medium text-[#1f2937] text-[15px] leading-[24px] text-center whitespace-pre-line" style={{ wordBreak: 'keep-all' }}>
              사랑은 언제나 우리 곁에 있습니다.
              미처 깨닫지 못했던 일상 속 사랑의 순간을 떠올려보세요.
              {'\n\n'}
              "아! 이건 틀림 없이 사랑이다!" 싶은 순간이 있다면 이곳 아!(愛) 모먼트 갤러리에 간직해보세요.
            </p>
          </div>

          {/* Start Button */}
          <Button
            onClick={onStart}
            className="w-[90%] max-w-md py-6 rounded-2xl text-white shadow-lg shadow-[#FFB5D8]/30 transition-all text-base bg-gradient-to-r from-[#FFB5D8] to-[#FFC9E5] hover:from-[#FFA0C8] hover:to-[#FFB5D8]"
          >
            <Heart className="w-5 h-5 mr-2" />
            시작하기
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-auto pb-8 text-center">
          <p className="font-[Pretendard Variable] font-medium text-[#6b7280] text-[14px] leading-[20px]">
            2025-2 중구난방 전시
          </p>
          <p className="font-[Pretendard Variable] font-semibold text-[#FFB5D8] text-[16px] leading-[22px] mt-1">
            愛드립
          </p>
        </div>

      </div>
    </div>
  );
}
