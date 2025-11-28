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

  const compressImage = async (file: File): Promise<{ file: File; previewUrl: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Canvas 생성
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
          }

          // 최대 크기 설정 (800x800)
          const maxSize = 800;
          let width = img.width;
          let height = img.height;

          // 비율 유지하며 리사이징
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // 이미지 그리기
          ctx.drawImage(img, 0, 0, width, height);

          // JPEG로 압축 (품질 85%)
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name.replace(/\.\w+$/, '.jpg'), {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                const previewUrl = URL.createObjectURL(blob);
                resolve({ file: compressedFile, previewUrl });
              } else {
                reject(new Error('Compression failed'));
              }
            },
            'image/jpeg',
            0.85
          );
        };
        img.onerror = () => reject(new Error('Image load failed'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('File read failed'));
      reader.readAsDataURL(file);
    });
  };

  const handleFile = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      try {
        const { file: compressedFile, previewUrl } = await compressImage(file);
        onImageUpload(compressedFile, previewUrl);
      } catch (error) {
        console.error('Image compression error:', error);
        // 압축 실패 시 원본 사용
        const reader = new FileReader();
        reader.onload = (e) => onImageUpload(file, e.target?.result as string);
        reader.readAsDataURL(file);
      }
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
