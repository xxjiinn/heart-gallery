import { useState, useEffect } from 'react';
import type { HeartMemory } from '../App';

interface HeartCardProps {
  memory: HeartMemory;
  index: number;
  onClick?: () => void;
}

export function HeartCard({ memory, index, onClick }: HeartCardProps) {

  // 데스크탑: 4열 그리드, 모바일: 2열 그리드
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const columns = isMobile ? 2 : 4;

  const columnIndex = index % columns;
  const rowIndex = Math.floor(index / columns);

  const startWithImage = (rowIndex + columnIndex) % 2 === 0;

  const [showImage, setShowImage] = useState(startWithImage);
  const [strokeWidth, setStrokeWidth] = useState(0.3);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);

  useEffect(() => {
    const preloadImg = new Image();
    preloadImg.src = memory.imageUrl;
    preloadImg.loading = 'eager';
    preloadImg.onload = () => {
      // 이미지 로드 완료 후 약간의 지연을 주고 애니메이션 시작
      setTimeout(() => setIsLoaded(true), index * 50); // 각 카드마다 50ms 차이
    };
  }, [memory.imageUrl, index]);

  useEffect(() => {
    // 첫 번째 전환: 3초 후
    const firstTimeout = setTimeout(() => {
      // 0.3초 전에 다음 상태를 준비
      setIsPreparing(true);
      setTimeout(() => {
        setShowImage(prev => !prev);
        setIsPreparing(false);
      }, 500);

      // 첫 전환 후 5초마다 반복
      const interval = setInterval(() => {
        setIsPreparing(true);
        setTimeout(() => {
          setShowImage(prev => !prev);
          setIsPreparing(false);
        }, 500);
      }, 5000);

      // cleanup을 위해 interval ID를 저장
      return () => clearInterval(interval);
    }, 3000);

    return () => {
      clearTimeout(firstTimeout);
    };
  }, []);

  useEffect(() => {
    // 이미지가 로드된 후에만 strokeWidth 애니메이션 시작
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setStrokeWidth(prev => prev === 0.3 ? 1.0 : 0.3);
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoaded]);

  return (
    <div className="flex items-center justify-center">
      <style>{`
        @keyframes float-${memory.id} {
          0%, 100% {
            transform: translateY(0px) translateZ(0);
          }
          50% {
            transform: translateY(-10px) translateZ(0);
          }
        }
      `}</style>
      <svg
        className="w-full h-auto aspect-square max-w-[500px]"
        viewBox="0 0 24 24"
        style={{
          backfaceVisibility: 'hidden',
          animation: isLoaded ? `float-${memory.id} ${3 + (index % 3)}s ease-in-out infinite` : 'none',
          animationDelay: `${(index % 5) * 0.2}s`,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in',
          willChange: 'transform, opacity',
        }}
      >
        <defs>
          <clipPath id={`heartClip-${memory.id}`}>
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </clipPath>

          <filter id="softBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" />
          </filter>
        </defs>

        <g clipPath={`url(#heartClip-${memory.id})`} onClick={onClick} style={{ cursor: 'pointer' }}>

          {!showImage && (
            <rect x="0" y="0" width="24" height="24" fill="white" />
          )}
          {/* 이미지 (페이드 트랜지션 적용)*/}
          <image
            href={memory.imageUrl}
            x="0"
            y="0"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid slice"
            style={{
              opacity: showImage ? 1 : 0,
              transition: 'opacity 0.7s ease-in-out',
              willChange: 'opacity',
              imageRendering: 'optimizeSpeed',
            }}
          />

          {/* 닉네임 + 메시지 (페이드 트랜지션 적용)*/}
          <foreignObject
            x="3"
            y="6"
            width="18"
            height="11"
            style={{
              opacity: showImage ? 0 : (isPreparing && showImage ? 0.01 : 1),
              transition: 'opacity 0.7s ease-in-out',
              pointerEvents: 'none',
              willChange: 'opacity',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.3em',
                fontSize: '1.8px',
                fontFamily:
                  '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
                fontWeight: 700,
                color: '#1f2937',
                textAlign: 'center',
                lineHeight: '1.5',
                wordBreak: 'keep-all',
                overflowWrap: 'break-word',
                overflow: 'hidden',
                gap: '0.6em',
                WebkitFontSmoothing: 'antialiased',
                transform: 'translateZ(0)',
              }}
            >
              {memory.nickname && (
                <div style={{ fontSize: '1.5px', fontWeight: 600, color: '#6b7280', lineHeight: '1.4' }}>
                  {memory.nickname}
                </div>
              )}
              <div style={{ lineHeight: '1.5' }}>{memory.message}</div>
            </div>
          </foreignObject>
        </g>

        {/* Border */}
        <path
          d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
          fill="none"
          stroke="#FFCCE4"
          strokeWidth={strokeWidth}
          filter="url(#softBlur)"
          style={{
            transition: 'stroke-width 1.0s ease-in-out',
          }}
        />
      </svg>
    </div>
  );
}
