import { X } from 'lucide-react';
import type { HeartMemory } from '../App';

interface HeartModalProps {
  memory: HeartMemory;
  onClose: () => void;
}

export function HeartModal({ memory, onClose }: HeartModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 flex flex-col items-center gap-6">
          {/* Heart Image */}
          <div className="w-full max-w-[280px]">
            <svg className="w-full h-auto aspect-square" viewBox="0 0 24 24">
              <defs>
                <clipPath id={`modalHeartClip-${memory.id}`}>
                  <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                </clipPath>
                <filter id="modalSoftBlur">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" />
                </filter>
              </defs>

              <g clipPath={`url(#modalHeartClip-${memory.id})`}>
                <image
                  href={memory.imageUrl}
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                  preserveAspectRatio="xMidYMid slice"
                />
              </g>

              <path
                d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                fill="none"
                stroke="#FFCCE4"
                strokeWidth="0.5"
                filter="url(#modalSoftBlur)"
              />
            </svg>
          </div>

          {/* Nickname */}
          {memory.nickname && (
            <div className="text-center">
              <p className="text-gray-500 text-sm font-semibold mb-1">닉네임</p>
              <p className="text-gray-800 text-lg font-bold">{memory.nickname}</p>
            </div>
          )}

          {/* Message */}
          <div className="text-center">
            <p className="text-gray-500 text-sm font-semibold mb-1">메시지</p>
            <p className="text-gray-800 text-lg font-medium leading-relaxed break-words px-4">
              {memory.message}
            </p>
          </div>

          {/* Date */}
          <div className="text-center">
            <p className="text-gray-400 text-xs">
              {new Date(memory.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
