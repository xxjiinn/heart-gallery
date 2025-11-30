import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IntroPageProps {
  onStart: () => void;
}

export function IntroPage({ onStart }: IntroPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 px-6 pb-4" style={{ background: 'linear-gradient(to bottom, #FFF8F0 10%, #FFD6E8 70%, #E0D4FF 110%)' }}>
      <div className="w-full flex flex-col items-center">

        {/* AD_Live Logo */}
        <div className="w-full flex justify-center mb-3">
          <h2
            className="text-[#FF0048] font-bold text-[18px] cursor-pointer hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'Gotham, sans-serif', fontWeight: 900 }}
            onClick={() => navigate('/')}
          >
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
        <div className="flex-1 flex flex-col items-center justify-center mt-16 mb-8">
          <div
            className="rounded-3xl p-10 py-12 mb-8 max-w-md"
            style={{
              backgroundColor: '#FFF9FB',
              boxShadow: '0 3.28px 4.92px -3.28px rgba(255, 181, 216, 0.2), 0 8.19px 12.29px -2.46px rgba(255, 181, 216, 0.2)'
            }}
          >
            <p className="font-[Pretendard Variable] font-medium text-[#1f2937] text-[13px] leading-[24px] text-center whitespace-pre-line" style={{ wordBreak: 'keep-all' }}>
              {'사랑은 언제나 우리 곁에 있습니다.\n미처 깨닫지 못했던 일상 속 사랑의 순간을 떠올려보세요.\n\n"아! 이건 틀림 없이 사랑이다!" 싶은 순간이 있다면\n이곳 아!(愛) 모먼트 갤러리에 간직해보세요.'}
            </p>
          </div>

          {/* Start Button */}
          <Button
            onClick={onStart}
            className="w-[90%] max-w-md py-6 rounded-2xl text-white shadow-lg shadow-[#FFB5D8]/30 transition-all text-base bg-[#FF56A6] hover:bg-[#FF3D95]"
          >
            <Heart className="w-5 h-5 mr-2" />
            시작하기
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-auto pb-12 text-center">
          <p className="font-[Pretendard Variable] font-medium text-[#6b7280] text-[14px] leading-[20px]">
            2025-2 중구난방 전시
          </p>
          <p className="font-[Pretendard Variable] font-semibold text-[#FF56A6] text-[16px] leading-[22px] mt-1">
            愛드립
          </p>
        </div>

      </div>
    </div>
  );
}
