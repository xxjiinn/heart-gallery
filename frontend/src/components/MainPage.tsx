import { useState } from 'react';
import { HeartUpload } from './HeartUpload';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';

interface MainPageProps {
  onSave: (file: File, message: string) => void;
  onViewGallery: () => void;
}

export function MainPage({ onSave, onViewGallery }: MainPageProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const maxChars = 30;

  const handleImageUpload = (file: File, previewUrl: string) => {
    setUploadedFile(file);
    setUploadedImage(previewUrl);
  };

  const handleSave = () => {
    if (uploadedFile && message.trim()) {
      onSave(uploadedFile, message);
      setUploadedFile(null);
      setUploadedImage(null);
      setMessage('');
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setMessage(value);
    }
  };
  
  // 버튼 활성화 여부
  const isSaveDisabled = !uploadedFile || !message.trim();

  // 화면에 렌더링할 UI를 반환.
  return (
    <div className="min-h-screen flex flex-col items-center justify-start md:justify-center pt-4 md:pt-8 px-6 md:px-8 pb-8">
      <div className="w-full max-w-md md:max-w-4xl">
        {/* Header */}
        <div className="text-center mb-3 md:mb-3 md:mt-0">
          <div className="flex items-center justify-center gap-5 mb-3 md:mb-4">
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-[#FFB5D8] fill-[#FFB5D8]" />
            <h1 className="text-[#AC91FF] font-arita font-bold text-xl md:text-2xl">아! 모먼트</h1>
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-[#FFB5D8] fill-[#FFB5D8]" />
          </div>
          <p className="text-[#6634FF] opacity-80 font-arita font-bold md:mt-3 text-base md:text-base">
            사랑이 묻어났던 순간을
          </p>
          <p className="text-[#6634FF] opacity-80 font-arita font-bold text-base md:text-base">
            '아! 모먼트'로 간직해보세요✨
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-3 md:p-5 shadow-lg shadow-[#FFB5D8]/20 mb-2 md:mb-4">
          <HeartUpload
            onImageUpload={handleImageUpload}
            uploadedImage={uploadedImage}
          />

          {/* Message Input */}
          <div className="mt-6 md:mt-5 space-y-1">
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="짧은 설명 문구를 작성해보세요. (30자 이내)"
              className="w-full px-4 py-2.5 md:px-6 md:py-4 rounded-2xl bg-white/80 border-2 border-[#FFE5F1] focus:border-[#FFB5D8] focus:outline-none transition-colors placeholder:text-[#AC91FF] text-sm md:text-base"
            />
            <div className="text-right text-[#C8B6FF] opacity-60 text-xs md:text-sm">
              {message.length} / {maxChars}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-2 md:gap-3">
          <Button
            onClick={handleSave}
            disabled={isSaveDisabled}
            className={`
              w-full md:w-[600px] py-4 md:py-5 rounded-2xl text-white shadow-lg shadow-[#FFB5D8]/30 transition-all text-sm md:text-base
              ${isSaveDisabled
                ? 'bg-gray-300 hover:bg-gray-300/90'
                : 'bg-gradient-to-r from-[#FFB5D8] to-[#FFC9E5] hover:from-[#FFA0C8] hover:to-[#FFB5D8]'
              }
            `}
          >
            <Heart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            순간을 간직하기
          </Button>

          <Button
            onClick={onViewGallery}
            variant="outline"
            className="w-full md:w-[600px] py-4 md:py-5 rounded-2xl border-2 border-[#C8B6FF] text-[#C8B6FF] bg-white hover:bg-[#C8B6FF]/10 text-sm md:text-base"
          >
            갤러리 보기
          </Button>
        </div>
      </div>
    </div>
  );
}