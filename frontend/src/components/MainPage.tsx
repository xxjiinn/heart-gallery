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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl">
        {/* Header (생략) */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Heart className="w-8 h-8 text-[#FFB5D8] fill-[#FFB5D8]" />
            <h1 className="text-[#C8B6FF] font-arita font-bold text-2xl">아! 모먼트</h1>
            <Heart className="w-8 h-8 text-[#FFB5D8] fill-[#FFB5D8]" />
          </div>
          <p className="text-[#B8A0D5] opacity-80 font-arita">
            사랑이 묻어났던 순간을
          </p>
          <p className="text-[#B8A0D5] opacity-80 font-arita">
            '아!모먼트'로 간직해보세요✨
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg shadow-[#FFB5D8]/20 mb-6">
          <HeartUpload
            onImageUpload={handleImageUpload}
            uploadedImage={uploadedImage}
          />

          {/* Message Input */}
          <div className="mt-8 space-y-2">
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="짧은 설명 문구를 작성해보세요. (30자 이내)"
              className="w-full px-6 py-4 rounded-2xl bg-white/80 border-2 border-[#FFE5F1] focus:border-[#FFB5D8] focus:outline-none transition-colors placeholder:text-[#C8B6FF]/50"
            />
            <div className="text-right text-[#C8B6FF] opacity-60">
              {message.length} / {maxChars}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleSave}
            disabled={isSaveDisabled}
            // 버튼 색상 로직 수정: 이미지 선택 여부에 따라 배경색 변경
            className={`
              flex-1 py-6 rounded-2xl text-white shadow-lg shadow-[#FFB5D8]/30 transition-all
              ${isSaveDisabled 
                ? 'bg-gray-300 hover:bg-gray-300/90' // 비활성화 (회색)
                : 'bg-gradient-to-r from-[#FFB5D8] to-[#FFC9E5] hover:from-[#FFA0C8] hover:to-[#FFB5D8]' // 활성화 (핑크색)
              }
            `}
          >
            <Heart className="w-5 h-5 mr-2" />
            순간을 간직하기 {/* 텍스트 변경 */}
          </Button>
          
          <Button
            onClick={onViewGallery}
            variant="outline"
            className="py-6 rounded-2xl border-2 border-[#C8B6FF] text-[#C8B6FF] hover:bg-[#C8B6FF]/10"
          >
            갤러리 보기 {/* 텍스트 변경 */}
          </Button>
        </div>
      </div>
    </div>
  );
}