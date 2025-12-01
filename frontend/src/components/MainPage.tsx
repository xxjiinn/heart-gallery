import { useState } from 'react';
import { HeartUpload } from './HeartUpload';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';

interface MainPageProps {
  onSave: (croppedFile: File, fullFile: File, nickname: string, message: string) => void;
  onViewGallery: () => void;
}

export function MainPage({ onSave, onViewGallery }: MainPageProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fullImageFile, setFullImageFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const maxNicknameChars = 10;
  const maxMessageChars = 30;

  const handleImageUpload = (croppedFile: File, croppedPreviewUrl: string, fullFile: File) => {
    setUploadedFile(croppedFile);
    setFullImageFile(fullFile);
    setUploadedImage(croppedPreviewUrl);
  };

  const handleSave = () => {
    if (uploadedFile && fullImageFile && message.trim()) {
      onSave(uploadedFile, fullImageFile, nickname, message);
      setUploadedFile(null);
      setFullImageFile(null);
      setUploadedImage(null);
      setNickname('');
      setMessage('');
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxNicknameChars) {
      setNickname(value);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxMessageChars) {
      setMessage(value);
    }
  };

  const isSaveDisabled = !uploadedFile || !fullImageFile || !nickname.trim() || !message.trim();

  return (
    <div className="min-h-screen flex flex-col items-center pt-4 md:pt-[3.4vh] px-6 md:px-[2.85vw] pb-4 md:pb-[3vh]">
      <div className="w-full flex flex-col items-center">

        {/* Header Bar */}
        <div
          className="w-full md:w-[calc(100vw-5.7vw)] md:max-w-[1358px] h-[56px] md:h-[72px] bg-[#FFFAF6] rounded-[16px] shadow-[0_10px_15px_-3px_rgba(255,181,216,0.20),0_4px_6px_-4px_rgba(255,181,216,0.20)] flex items-center justify-center flex-shrink-0 cursor-pointer"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          <div className="flex items-center gap-[11px]">
            <Heart className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" color="#FFB5D8" fill="#FFB5D8" />
            <h1 className="text-[#A381FF] font-semibold text-[17px] md:text-[20px] leading-[20px] md:leading-[24px] w-[85px] md:w-[100px] text-center">
              아!愛 모먼트
            </h1>
            <Heart className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" color="#FFB5D8" fill="#FFB5D8" />
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-center mt-5 md:mt-[4.5vh] mb-4 md:mb-[1vh] flex-shrink-0">
          <div className="w-full md:w-[438px] h-auto md:h-[54px] mx-auto flex flex-col items-center justify-center">
            <p className="font-[Pretendard Variable] font-semibold text-[#8C66FF] opacity-70 md:opacity-100 text-[15px] md:text-[16px] leading-[20px] md:leading-[22px] text-center" style={{ letterSpacing: '-0.466px' }}>
              "아! 이건 틀림 없이 사랑이다!"
            </p>
            <p className="font-[Pretendard Variable] font-semibold text-[#8C66FF] opacity-70 md:opacity-100 text-[15px] md:text-[16px] leading-[20px] md:leading-[22px] text-center mt-0" style={{ letterSpacing: '-0.466px' }}>
              ✨ 지나쳤던 일상 속 사랑의 순간을 떠올려보세요 ✨
            </p>
          </div>
        </div>


        {/* Content Container */}
        <div className="w-full max-w-md md:max-w-[900px] mx-auto px-0 flex flex-col">

          {/* Upload Area */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-3 md:p-4 shadow-lg shadow-[#FFB5D8]/20 mb-2 md:mb-3 flex-shrink-0 flex flex-col items-center">
            
            <HeartUpload
              onImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
            />

            {/* Nickname */}
            <div className="mt-5 md:mt-7 space-y-1 w-full flex flex-col items-center">
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="닉네임을 입력해주세요 (10자 이내)"
                className="w-full md:w-[600px] px-4 py-2 md:px-4 md:py-3 rounded-2xl bg-white/80 border-2 border-[#FFE5F1] focus:border-[#FFB5D8] placeholder:text-[#AC91FF] text-sm md:text-base mx-auto"
              />
            </div>

            {/* Message */}
            <div className="mt-2 md:mt-2 space-y-1 w-full flex flex-col items-center">
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="짧은 설명 문구를 작성해보세요 (30자 이내)"
                className="w-full md:w-[600px] px-4 py-3 md:px-4 md:py-4 md:pt-4 md:pb-6 rounded-2xl bg-white/80 border-2 border-[#FFE5F1] focus:border-[#FFB5D8] placeholder:text-[#AC91FF] text-sm md:text-base mx-auto"
              />
              <div className="w-full md:w-[600px] mx-auto text-right text-[#C8B6FF] opacity-60 text-xs md:text-sm">
                {message.length} / {maxMessageChars}
              </div>
            </div>

          </div>


          {/* Actions (네모박스 밖) */}
          <div className="flex flex-col items-center gap-2 md:gap-2.5 mt-4 pb-6 md:pb-8">

            <Button
              onClick={handleSave}
              disabled={isSaveDisabled}
              className={`
                w-[90%] md:w-[500px] py-6 md:py-6 rounded-2xl text-white shadow-lg shadow-[#FFB5D8]/30 transition-all text-base md:text-base
                ${isSaveDisabled ? 'bg-gray-300 hover:bg-gray-300/90' : 'bg-[#FF7DBF] hover:bg-[#FF56A6]'}
              `}
            >
              <Heart className="w-5 h-5 md:w-5 md:h-5 mr-2" />
               순간을 간직하기
            </Button>

            <Button
              onClick={onViewGallery}
              variant="outline"
              className="w-[90%] md:w-[500px] py-6 md:py-6 rounded-2xl border-2 border-[#C8B6FF] text-[#C8B6FF] bg-white hover:bg-[#C8B6FF]/10 text-base md:text-base"
            >
              갤러리 보기
            </Button>

          </div>

          {/* Footer */}
          <div className="flex flex-col items-center mt-4 md:mt-4 pb-32 md:pb-12 text-center">
            <p className="font-[Pretendard Variable] font-semibold text-[#6b7280] text-[13px] leading-[18px]">
              AD_Live
            </p>
            <p className="font-[Pretendard Variable] font-medium text-[#6b7280] text-[12px] leading-[16px] mt-1">
              2025-2 중구난방 전시: 愛드립
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
