import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
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
      reader.onload = (e) => onImageUpload(file, e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Heart Container */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        className={`cursor-pointer transition-all duration-300 ${isDragging ? 'scale-105' : 'scale-100'}`}
      >
        <svg className="w-[220px] h-[220px] md:w-[250px] md:h-[250px]" viewBox="0 0 24 24">
          <defs>
            <clipPath id="heartClip">
              <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
            </clipPath>
            <filter id="softBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" />
            </filter>
          </defs>

          <g clipPath="url(#heartClip)">
            {uploadedImage
              ? <image href={uploadedImage} width="24" height="24" preserveAspectRatio="xMidYMid slice" />
              : <rect width="24" height="24" fill="white" />}
          </g>

          <path
            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
            fill="none"
            stroke="#FFCCE4"
            strokeWidth="0.5"
            filter="url(#softBlur)"
          />
        </svg>
      </div>

      {/* Upload Button */}
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="outline"
        className="mt-2 rounded-2xl border-2 border-[#FFB5D8] text-[#FFB5D8] bg-white hover:bg-[#FFB5D8] hover:text-white px-12 py-3 text-base w-full max-w-[220px]"
      >
        <Upload className="w-5 h-5 mr-2" />
        {uploadedImage ? '이미지 다시 선택' : '이미지 업로드'}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="hidden"
      />
    </div>
  );
}
