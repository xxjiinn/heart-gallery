import { X } from 'lucide-react';
import type { HeartMemory } from '../App';

interface HeartModalProps {
  memory: HeartMemory;
  onClose: () => void;
}

export function HeartModal({ memory, onClose }: HeartModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.3) 0%, rgba(221, 160, 221, 0.3) 50%, rgba(173, 216, 230, 0.3) 100%)',
        backdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      <div
        className="relative bg-white rounded-[32px] shadow-2xl max-w-[380px] md:max-w-[520px] w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Close Button - Top Right Corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all hover:bg-white hover:scale-110"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Image Section - Full Width */}
        <div className="relative w-full h-[280px] md:h-[360px] bg-gradient-to-br from-pink-50 to-purple-50 rounded-t-[32px] overflow-hidden">
          <img
            src={memory.imageUrl}
            alt="Memory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="px-6 md:px-10 py-8 md:py-10">
          {/* Nickname Section with Enhanced Design */}
          {memory.nickname && (
            <div className="flex flex-col items-center mb-8">
              <div className="text-xs text-indigo-400 uppercase tracking-widest mb-3 font-semibold">From</div>
              <div className="relative group">
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-indigo-300 to-violet-300 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>

                <div className="relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white px-8 py-3.5 rounded-full shadow-xl">
                  <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-inner">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-bold text-lg md:text-xl tracking-wide drop-shadow-sm">{memory.nickname}</span>
                </div>
              </div>
            </div>
          )}

          {/* Message Card with Enhanced Quote Style */}
          <div className="relative mb-8">
            {/* Decorative quote marks */}
            <div className="absolute -top-4 -left-2 text-pink-300/40 text-7xl leading-none font-serif select-none pointer-events-none">"</div>
            <div className="absolute -bottom-4 -right-2 text-purple-300/40 text-7xl leading-none font-serif rotate-180 select-none pointer-events-none">"</div>

            {/* Message container with glass morphism */}
            <div className="relative backdrop-blur-sm bg-gradient-to-br from-white/80 via-pink-50/50 to-purple-50/50 rounded-3xl p-8 md:p-10 shadow-lg border border-white/60">
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-100/30 to-purple-100/30 opacity-50"></div>

              <p className="relative text-gray-800 text-lg md:text-xl font-medium leading-relaxed text-center whitespace-pre-wrap break-words"
                 style={{
                   textShadow: '0 2px 4px rgba(0,0,0,0.05)',
                   fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                 }}>
                {memory.message}
              </p>
            </div>
          </div>

          {/* Enhanced Decorative Divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-200 to-pink-300 max-w-[80px]"></div>
            <div className="relative">
              <div className="absolute inset-0 bg-pink-400 blur-md opacity-30"></div>
              <svg className="relative w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-200 to-purple-300 max-w-[80px]"></div>
          </div>

          {/* Date Section with Enhanced Design */}
          <div className="flex items-center justify-center gap-3 text-gray-400">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm md:text-base font-medium">
              {new Date(memory.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
