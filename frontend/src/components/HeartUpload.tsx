import { useRef, useState } from 'react';
import { Upload, Heart } from 'lucide-react';
import { Button } from './ui/button';

interface HeartUploadProps {
  onImageUpload: (file: File, previewUrl: string) => void;
  uploadedImage: string | null;
}

export function HeartUpload({ onImageUpload, uploadedImage }: HeartUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = e.target?.result as string;
        onImageUpload(file, previewUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
// 
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          cursor-pointer transition-all duration-300
          ${isDragging ? 'scale-105' : 'scale-100'}
        `}
      >
        {/* Heart Container with SVG Mask */}
        <div className="flex items-center justify-center">
          <svg className="w-[300px] h-[300px] md:w-[320px] md:h-[350px]" viewBox="0 0 24 24">
            <defs>
              <clipPath id="heartClip">
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
              </clipPath>
              {/* 블러 필터 추가 */}
              <filter id="softBlur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" />
              </filter>
            </defs>

            {/* Heart Background with Image or Placeholder */}
            <g clipPath="url(#heartClip)">
              {uploadedImage ? (
                <image
                  href={uploadedImage}
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                  preserveAspectRatio="xMidYMid slice"
                />
              ) : (
                <rect x="0" y="0" width="24" height="24" fill="white" />
              )}
            </g>

            {/* Heart Border with Blur */}
            <path
              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
              fill="none"
              stroke="#FFCCE4"
              strokeWidth="0.5"
              filter="url(#softBlur)"
            />
          </svg>
        </div>
      </div>

      {/* Upload Button */}
      <Button
        onClick={handleClick}
        variant="outline"
        className="mt-1 md:mt-1 rounded-2xl border-2 border-[#FFB5D8] text-[#FFB5D8] bg-white hover:bg-[#FFB5D8]/10 px-8 py-3 md:px-10 md:py-5 text-base md:text-lg"
      >
        <Upload className="w-4 h-4 md:w-6 md:h-6 mr-2" />
        {uploadedImage ? '이미지 다시 선택' : '이미지 업로드'}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
}