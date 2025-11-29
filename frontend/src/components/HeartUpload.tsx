import { useRef, useState } from 'react';
import { Upload, X, Check, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from './ui/button';

interface HeartUploadProps {
  onImageUpload: (croppedFile: File, croppedPreviewUrl: string, fullFile: File) => void;
  uploadedImage: string | null;
}

export function HeartUpload({ onImageUpload, uploadedImage }: HeartUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string>('');
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [originalImageSize, setOriginalImageSize] = useState({ width: 0, height: 0 });
  const [initialPinchDistance, setInitialPinchDistance] = useState<number | null>(null);
  const [initialScale, setInitialScale] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropCanvasRef = useRef<HTMLCanvasElement>(null);
  const tempImageRef = useRef<HTMLImageElement>(null);

  const compressImage = async (file: File): Promise<{ file: File; previewUrl: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
          }

          const maxSize = 1200;
          let width = img.width;
          let height = img.height;

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
          ctx.drawImage(img, 0, 0, width, height);

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
            0.92
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
      setOriginalFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setTempImageSrc(reader.result as string);
        setShowCropModal(true);
        setImagePosition({ x: 0, y: 0 });
        setImageScale(1);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setOriginalImageSize({ width: img.naturalWidth, height: img.naturalHeight });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDraggingImage(true);
    setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingImage) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDraggingImage(false);
  };

  const getPinchDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // 핀치 줌 시작
      const distance = getPinchDistance(e.touches);
      setInitialPinchDistance(distance);
      setInitialScale(imageScale);
      setIsDraggingImage(false);
    } else if (e.touches.length === 1) {
      // 드래그 시작
      const touch = e.touches[0];
      setIsDraggingImage(true);
      setDragStart({ x: touch.clientX - imagePosition.x, y: touch.clientY - imagePosition.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance !== null) {
      // 핀치 줌
      e.preventDefault();
      const currentDistance = getPinchDistance(e.touches);
      const scale = (currentDistance / initialPinchDistance) * initialScale;
      setImageScale(Math.min(Math.max(scale, 0.5), 3));
    } else if (isDraggingImage && e.touches.length === 1) {
      // 드래그
      const touch = e.touches[0];
      setImagePosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDraggingImage(false);
    setInitialPinchDistance(null);
  };

  const handleZoomIn = () => {
    setImageScale((prev) => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setImageScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleCropComplete = async () => {
    if (!tempImageRef.current || !cropCanvasRef.current || !originalFile) return;

    try {
      const canvas = cropCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      const heartSize = 600;
      canvas.width = heartSize;
      canvas.height = heartSize;

      const displayedImg = tempImageRef.current;
      const containerElement = displayedImg.parentElement?.parentElement;
      if (!containerElement) throw new Error('Container not found');

      const containerRect = containerElement.getBoundingClientRect();

      // 하트 클립 패스 적용
      const heartPath = new Path2D('M300,533.75L263.75,500.75C135,377 50,306.75 50,212.5C50,135.25 110.5,75 187.5,75C231,75 272.75,95.25 300,127C327.25,95.25 369,75 412.5,75C489.5,75 550,135.25 550,212.5C550,306.75 465,377 336.25,500.75L300,533.75Z');
      ctx.save();
      ctx.clip(heartPath);

      // 원본 이미지를 로드하여 크롭
      const img = new Image();
      img.onload = () => {
        // 컨테이너 크기
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        // 이미지가 컨테이너 중심에서 얼마나 이동했는지
        const offsetX = imagePosition.x;
        const offsetY = imagePosition.y;

        // Canvas에 그릴 때의 스케일
        const canvasScale = heartSize / containerWidth;

        // 이미지 중심을 컨테이너 중심에 맞춤
        const drawX = (containerWidth / 2 - (displayedImg.width * imageScale) / 2 + offsetX) * canvasScale;
        const drawY = (containerHeight / 2 - (displayedImg.height * imageScale) / 2 + offsetY) * canvasScale;
        const drawWidth = displayedImg.width * imageScale * canvasScale;
        const drawHeight = displayedImg.height * imageScale * canvasScale;

        ctx.drawImage(
          img,
          drawX,
          drawY,
          drawWidth,
          drawHeight
        );

        ctx.restore();

        canvas.toBlob(
          async (blob) => {
            if (blob) {
              const croppedFile = new File([blob], 'cropped.jpg', {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });

              const { file: compressedCroppedFile, previewUrl } = await compressImage(croppedFile);
              const { file: compressedFullFile } = await compressImage(originalFile);

              onImageUpload(compressedCroppedFile, previewUrl, compressedFullFile);
              setShowCropModal(false);
              setTempImageSrc('');
            }
          },
          'image/jpeg',
          0.92
        );
      };
      img.src = tempImageSrc;
    } catch (error) {
      console.error('Crop error:', error);
    }
  };

  const handleCropCancel = () => {
    setShowCropModal(false);
    setTempImageSrc('');
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

      {/* Crop Modal */}
      {showCropModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={handleCropCancel}
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCropCancel}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white hover:scale-110"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Title */}
            <div className="p-6 pb-4">
              <h3 className="text-lg font-semibold text-center text-[#A381FF]">
                하트에 보일 영역을 조정하세요
              </h3>
              <p className="text-sm text-center text-gray-500 mt-2">
                이미지를 드래그하거나 확대/축소하세요
              </p>
            </div>

            {/* Heart Preview Container */}
            <div className="px-6 pb-4">
              <div
                className="relative w-full aspect-square bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ touchAction: 'none' }}
              >
                {/* Image Layer */}
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-move"
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  style={{
                    transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale})`,
                    transition: isDraggingImage ? 'none' : 'transform 0.1s',
                  }}
                >
                  <img
                    ref={tempImageRef}
                    src={tempImageSrc}
                    alt="Preview"
                    onLoad={handleImageLoad}
                    className="max-w-full max-h-full object-contain select-none pointer-events-none"
                    draggable={false}
                  />
                </div>

                {/* Heart Overlay */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <mask id="heartMask">
                      <rect width="24" height="24" fill="white" />
                      <path
                        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                        fill="black"
                      />
                    </mask>
                  </defs>

                  {/* Darkened area outside heart */}
                  <rect width="24" height="24" fill="black" opacity="0.5" mask="url(#heartMask)" />

                  {/* Heart border */}
                  <path
                    d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                    fill="none"
                    stroke="#FFB5D8"
                    strokeWidth="0.6"
                  />
                </svg>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="px-6 pb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleZoomOut}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <ZoomOut className="w-5 h-5 text-gray-700" />
                </button>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={imageScale}
                  onChange={(e) => setImageScale(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <button
                  onClick={handleZoomIn}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 p-6 pt-2 border-t border-gray-200">
              <Button
                onClick={handleCropCancel}
                variant="outline"
                className="flex-1 rounded-2xl border-2 border-gray-300 text-gray-600"
              >
                취소
              </Button>
              <Button
                onClick={handleCropComplete}
                className="flex-1 rounded-2xl bg-gradient-to-r from-[#FFB5D8] to-[#FFC9E5] text-white"
              >
                <Check className="w-5 h-5 mr-2" />
                확인
              </Button>
            </div>
          </div>

          {/* Hidden canvas for cropping */}
          <canvas ref={cropCanvasRef} style={{ display: 'none' }} />
        </div>
      )}
    </div>
  );
}
