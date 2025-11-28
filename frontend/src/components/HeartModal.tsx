import { X } from 'lucide-react';
import type { HeartMemory } from '../App';

interface HeartModalProps {
  memory: HeartMemory;
  onClose: () => void;
}

export function HeartModal({ memory, onClose }: HeartModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6 md:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-[340px] md:max-w-md w-full max-h-[75vh] md:max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex justify-end p-3 md:p-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 md:px-8 pb-5 md:pb-8 flex flex-col items-center gap-3 md:gap-6">
          {/* Original Image */}
          <div className="w-full max-w-[240px] md:max-w-[320px] max-h-[220px] md:max-h-[400px] flex items-center justify-center">
            <img
              src={memory.imageUrl}
              alt="Memory"
              className="w-auto h-auto max-w-full max-h-[220px] md:max-h-[400px] object-contain rounded-xl md:rounded-2xl shadow-lg"
            />
          </div>

          {/* Nickname */}
          {memory.nickname && (
            <div className="text-center">
              <p className="text-gray-500 text-xs md:text-sm font-semibold mb-1">닉네임</p>
              <p className="text-gray-800 text-base md:text-lg font-bold">{memory.nickname}</p>
            </div>
          )}

          {/* Message */}
          <div className="text-center max-w-full px-2">
            <p className="text-gray-500 text-xs md:text-sm font-semibold mb-1">메시지</p>
            <p className="text-gray-800 text-base md:text-lg font-medium leading-relaxed break-words">
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
