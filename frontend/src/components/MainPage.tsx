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
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4 md:p-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-4 md:mb-2">
          <div className="flex items-center justify-center gap-2 mb-5">
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-[#FFB5D8] fill-[#FFB5D8]" />
            <h1 className="text-[#C8B6FF] font-arita font-bold text-xl md:text-2xl">아! 모먼트</h1>
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-[#FFB5D8] fill-[#FFB5D8]" />
          </div>
          <p className="text-[#B8A0D5] opacity-80 font-arita text-sm md:text-base">
            사랑이 묻어났던 순간을
          </p>
          <p className="text-[#B8A0D5] opacity-80 font-arita text-sm md:text-base">
            '아!모먼트'로 간직해보세요✨
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-3 md:p-10 shadow-lg shadow-[#FFB5D8]/20 mb-3 md:mb-6">
          <HeartUpload
            onImageUpload={handleImageUpload}
            uploadedImage={uploadedImage}
          />

          {/* Message Input */}
          <div className="mt-8 md:mt-12 space-y-1">
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
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <Button
            onClick={handleSave}
            disabled={isSaveDisabled}
            className={`
              flex-1 py-4 md:py-6 rounded-2xl text-white shadow-lg shadow-[#FFB5D8]/30 transition-all text-sm md:text-base
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
            className="py-4 md:py-6 rounded-2xl border-2 border-[#C8B6FF] text-[#C8B6FF] bg-white hover:bg-[#C8B6FF]/10 text-sm md:text-base"
          >
            갤러리 보기
          </Button>
        </div>
      </div>
    </div>
  );
}