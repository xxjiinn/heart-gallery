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
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
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
          {/* Original Image */}
          <div className="w-full max-w-[320px] max-h-[400px] flex items-center justify-center">
            <img
              src={memory.imageUrl}
              alt="Memory"
              className="w-full h-auto max-h-[400px] object-contain rounded-2xl shadow-lg"
            />
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
