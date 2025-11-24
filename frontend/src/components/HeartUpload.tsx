import { useRef, useState } from 'react';
import { Upload, Heart } from 'lucide-react';
import { Button } from './ui/button';

interface HeartUploadProps {
  onImageUpload: (file: File, previewUrl: string) => void;
  uploadedImage: string | null;
}

export function HeartUpload({ onImageUpload, uploadedImage }: HeartUploadProps) {   // 뒤에 "HeartUploadProps"라는 것을 붙인 이유: 부모로부터 'onImageUpload'와 'uploadedImage'라는 Props를 전달받아야 하므로 그 타입을 명시하여 안정성을 확보한 것.
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {   // 이미지 파일인지 유효성 검사.
      const reader = new FileReader();  
      reader.onload = (e) => {    // FileReader가 파일 데이터를 성공적으로 다 읽었을 때 실행될 함수
        const previewUrl = e.target?.result as string;    // 이벤트 객체(e)의 결과 값(result)을 Base64 문자열로 가져와 previewUrl 변수에 저장. 프론트엔드에서 즉시 미리보기를 보여주기 위한 데이터. 나중에 브라우저는 외부 서버에 요청할 필요 없이 문자열 자체를 메몰 내에서 바로 디코딩하여 이미지로 표시한다.
        // 장점: 사용자가 파일을 선택하는 즉시 이미지를 보여줄 수 있어 서버에 부하를 주지 않는다. => UX 굳.   (실제 서버에 저장되는 것은 Save Memory 버튼 클릭 시점이다.)
        onImageUpload(file, previewUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  // 사용자가 파일 선택 대화 상자에서 파일을 고르고 "열기"를 누르는 순간, 브라우저는 해당 파일의 메타데이터(이름, 크기, 타입 등)와 데이터 접근 권한을 담고 있는 File 객체를 생성한다.
  // 이렇게 사용자가 <input type="file">을 통해 파일을 선택하는 것을 "사용자 디스크에서 파일을 선택하여 웹 브라우저의 메모리로 가져온다"고 한다.
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  /*
  1. e.target -> 이벤트가 발생한 <input> 요소
  2. e.target.files -> 이벤트가 발생한 <input> 요소에서 '사용자가 선택한 파일 목록'
  3. e.target.files?.[0] -> 이벤트가 발생한 <input> 요소에서 사용자가 선택한 파일 목록 중 '첫 번째 파일'
  - '?.'(옵셔널 체이닝)은 files가 없을 경우 에러를 방지한다.
  */
  };

  // 
  
  
  // 사용자 디스크, 즉 파일 선택 상자(ex.finder)를 띄우는 코드.
  const handleClick = () => {
    fileInputRef.current?.click();
    // 1. fileInputRef.current를 통해 숨겨진 <input> DOM 요소에 접근. 
    // 2. click() 메서드를 강제로 호출하여 마치 사용자가 직접 <input type="file">을 클릭한 것처럼 파일 선택 대화 상자를 띄운다.
  };

  return (
    <div className="flex flex-col items-center">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative w-full max-w-md aspect-square cursor-pointer
          transition-all duration-300
          ${isDragging ? 'scale-105' : 'scale-100'}
        `}
      >
        {/* Heart Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Heart Shape with Image or Placeholder */}
          <div
            className={`
              relative z-0
              w-[280px] h-[280px] md:w-[320px] md:h-[320px]
              transition-all duration-300
              ${isDragging ? 'scale-110' : 'scale-100'}
            `}
            style={{
              clipPath: 'path("M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z")',
              transform: 'scale(13.5)',
            }}
          >
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Uploaded memory"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#FFE5F1] to-[#E0D4FF] flex items-center justify-center">
                <div className="text-center" style={{ transform: 'scale(0.074)' }}>
                  <Heart className="w-24 h-24 text-white/60 mx-auto mb-4" />
                  <p className="text-white/60">Drop your photo here</p>
                </div>
              </div>
            )}
          </div>

          {/* Dashed Border Heart */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            viewBox="0 0 24 24"
          >
            <path
              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
              fill="none"
              stroke={isDragging ? '#FFB5D8' : '#E0D4FF'}
              strokeWidth="0.5"
              strokeDasharray="2,2"
              className="transition-colors duration-300"
            />
          </svg>
        </div>
      </div>

      {/* Upload Button */}
      <Button
        onClick={handleClick}
        variant="outline"
        className="mt-6 rounded-2xl border-2 border-[#FFB5D8] text-[#FFB5D8] hover:bg-[#FFB5D8]/10 px-8 py-5"
      >
        <Upload className="w-5 h-5 mr-2" />
        {uploadedImage ? '이미지 다시 선택' : '이미지 업로드'}
      </Button>

      {/* 사용자가 파일 선택 대화 상자에서 파일을 고르고 "열기"를 누르는 순간, 브라우저는 해당 파일의 메타데이터(이름, 크기, 타입 등)와 데이터 접근 권한을 담고 있는 File 객체를 생성한다. */}
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
