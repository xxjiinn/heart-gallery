import { useState, useEffect } from 'react';
import type { HeartMemory } from '../App';

interface HeartCardProps {
  memory: HeartMemory;
  index: number;
}

export function HeartCard({ memory, index }: HeartCardProps) {
  // 홀수 열(0,2,4...)은 이미지부터 시작, 짝수 열(1,3,5...)은 메시지부터 시작
  const columnIndex = index % 4;
  const isOddColumn = columnIndex === 0 || columnIndex === 2;

  const [showImage, setShowImage] = useState(isOddColumn);

  useEffect(() => {
    // 5초마다 이미지/메시지 토글
    const interval = setInterval(() => {
      setShowImage(prev => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
      {/* Heart Container with SVG Mask */}
      <svg className="w-full h-auto aspect-square max-w-[500px]" viewBox="0 0 24 24">
        <defs>
          <clipPath id={`heartClip-${memory.id}`}>
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </clipPath>
          <filter id="softBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" />
          </filter>
        </defs>

        {/* Heart Background with Image or Message */}
        <g clipPath={`url(#heartClip-${memory.id})`}>
          {showImage ? (
            <image
              href={memory.imageUrl}
              x="0"
              y="0"
              width="24"
              height="24"
              preserveAspectRatio="xMidYMid slice"
            />
          ) : (
            <>
              <rect x="0" y="0" width="24" height="24" fill="white" />
              <foreignObject x="4" y="8" width="16" height="7">
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.2em',
                    fontSize: '1.5px',
                    fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
                    fontWeight: '700',
                    color: '#1f2937',
                    textAlign: 'center',
                    lineHeight: '1.3',
                    wordBreak: 'keep-all',
                    overflowWrap: 'break-word',
                    overflow: 'hidden'
                  }}
                >
                  {memory.message}
                </div>
              </foreignObject>
            </>
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
  );
}
