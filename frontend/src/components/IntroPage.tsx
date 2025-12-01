import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IntroPageProps {
  onStart: () => void;
}//

export function IntroPage({ onStart }: IntroPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center pt-4 md:pt-[3.4vh] px-6 md:px-[2.85vw] pb-4 md:pb-[3vh]" style={{ background: 'linear-gradient(to bottom, #FFF8F0 10%, #FFD6E8 70%, #E0D4FF 110%)' }}>
      <div className="w-full flex flex-col items-center">

        {/* Header Bar */}
        <div className="w-full md:w-[calc(100vw-5.7vw)] md:max-w-[1358px] h-[56px] md:h-[72px] bg-[#FFFAF6] rounded-[16px] shadow-[0_10px_15px_-3px_rgba(255,181,216,0.20),0_4px_6px_-4px_rgba(255,181,216,0.20)] flex items-center justify-center flex-shrink-0">
          <div className="flex items-center gap-[11px]">
            <Heart className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" color="#FFB5D8" fill="#FFB5D8" />
            <h1 className="text-[#A381FF] font-semibold text-[17px] md:text-[20px] leading-[20px] md:leading-[24px] w-[85px] md:w-[100px] text-center">
              아!愛 모먼트
            </h1>
            <Heart className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" color="#FFB5D8" fill="#FFB5D8" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center mt-16 md:mt-20 mb-10">
          <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-10 md:p-16 py-24 md:py-32 mb-12 md:mb-16 w-full max-w-md md:max-w-2xl shadow-lg shadow-[#FFB5D8]/20 border border-[#FFE5F1]/40">
            <p className="font-[Pretendard Variable] font-medium text-[#1f2937] text-[16px] md:text-[18px] leading-[26px] md:leading-[32px] text-center whitespace-pre-line" style={{ wordBreak: 'keep-all' }}>
              {'사랑은 언제나 우리 곁에 있습니다.\n미처 깨닫지 못했던 일상 속 사랑의 순간을 떠올려보세요.\n\n'}
              <span className="text-[#A381FF] font-semibold text-[19px] md:text-[22px]">"아! 이건 틀림 없이 사랑이다!"</span>
              {'\n싶은 순간이 있다면\n이곳 아!(愛) 모먼트 갤러리에 간직해보세요.'}
            </p>
          </div>

          {/* Start Button */}
          <Button
            onClick={onStart}
            className="w-[90%] md:w-[500px] py-7 md:py-6 rounded-2xl text-white shadow-lg shadow-[#FFB5D8]/30 transition-all text-base bg-[#FF7DBF] hover:bg-[#FF56A6]"
          >
            <Heart className="w-5 h-5 mr-2" />
            시작하기
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-4 pb-12 md:pb-12 left-0 right-0 text-center">
          <p className="font-[Pretendard Variable] font-semibold text-[#6b7280] text-[13px] leading-[18px]">
            AD_Live
          </p>
          <p className="font-[Pretendard Variable] font-medium text-[#6b7280] text-[12px] md:text-[13px] leading-[16px] md:leading-[18px] mt-1 md:mt-0.5">
            2025-2 중구난방 전시: 愛드립
          </p>
        </div>

      </div>
    </div>
  );
}
