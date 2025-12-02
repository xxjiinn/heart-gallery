import { useState, useEffect, useRef } from 'react';
import type { HeartMemory } from '../App';

interface HeartCardProps {
  memory: HeartMemory;
  index: number;
  onClick?: () => void;
}

function HeartCardComponent({ memory, index, onClick }: HeartCardProps) {
  // 데스크탑: 4열 그리드, 모바일: 2열 그리드
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const columns = isMobile ? 2 : 4;

  const columnIndex = index % columns;
  const rowIndex = Math.floor(index / columns);

  const startWithImage = (rowIndex + columnIndex) % 2 === 0;

  const [showImage, setShowImage] = useState(startWithImage);
  const [strokeWidth, setStrokeWidth] = useState(0.3);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // 첫 번째 전환: 4초 후
    timeoutRef.current = setTimeout(() => {
      setShowImage(prev => !prev);

      // 첫 전환 후 5초마다 반복
      intervalRef.current = setInterval(() => {
        setShowImage(prev => !prev);
      }, 5000);
    }, 4000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStrokeWidth(prev => prev === 0.3 ? 1.0 : 0.3);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex items-center justify-center relative"
      style={{
        aspectRatio: '1',
        maxWidth: '500px',
        width: '100%',
      }}
    >
      <style>{`
        @keyframes float-${memory.id} {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      {/* Floating wrapper */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          animation: `float-${memory.id} ${3 + (index % 3)}s ease-in-out infinite`,
          animationDelay: `${(index % 5) * 0.2}s`,
        }}
      >
        {/* SVG container */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <clipPath id={`heart-clip-${memory.id}`}>
              <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
            </clipPath>
            <filter id={`soft-blur-${memory.id}`}>
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" />
            </filter>
          </defs>

          {/* Background when showing text */}
          {!showImage && (
            <rect
              width="24"
              height="24"
              fill="#FFF9FC"
              clipPath={`url(#heart-clip-${memory.id})`}
            />
          )}

          {/* Image */}
          <image
            href={memory.imageUrl}
            width="24"
            height="24"
            preserveAspectRatio="none"
            clipPath={`url(#heart-clip-${memory.id})`}
            style={{
              opacity: showImage ? 1 : 0,
              transition: 'opacity 0.7s ease-in-out',
            }}
          />

          {/* Border */}
          <path
            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
            fill="none"
            stroke="#FFCCE4"
            strokeWidth={strokeWidth}
            filter={`url(#soft-blur-${memory.id})`}
            style={{
              transition: 'stroke-width 1.0s ease-in-out',
            }}
          />

          {/* Clickable heart shape overlay */}
          <path
            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
            fill="transparent"
            className="cursor-pointer"
            style={{ pointerEvents: 'auto' }}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          />
        </svg>

        {/* Text layer as HTML overlay (inside floating wrapper) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '20%' : '25%',
            paddingTop: isMobile ? '10%' : '20%',
            opacity: showImage ? 0 : 1,
            transition: 'opacity 0.7s ease-in-out',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
              fontWeight: 500,
              color: '#1f2937',
              textAlign: 'center',
              lineHeight: '1.4',
              wordBreak: 'keep-all',
              overflowWrap: 'break-word',
              overflow: 'hidden',
              width: '100%',
              fontSize: isMobile ? '0.85rem' : '1.3rem',
            }}
          >
            {memory.nickname && (
              <div style={{ fontWeight: 600, color: '#6b7280', marginBottom: '0.8em', fontSize: '0.85em' }}>
                {memory.nickname}
              </div>
            )}
            <div style={{ whiteSpace: 'pre-wrap' }}>{memory.message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const HeartCard = HeartCardComponent;
