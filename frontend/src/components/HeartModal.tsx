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
        className="relative bg-white rounded-[32px] shadow-2xl max-w-[380px] md:max-w-[520px] w-full"
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
        <div className="relative w-full h-[300px] md:h-[380px] bg-gradient-to-br from-pink-50 to-purple-50 rounded-t-[32px] overflow-hidden">
          <img
            src={memory.imageUrl}
            alt="Memory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="px-5 md:px-8 py-4 md:py-5">
          {/* Nickname Section with Enhanced Design */}
          {memory.nickname && (
            <div className="flex flex-col items-center mb-3">
              <div className="text-xs uppercase tracking-widest mb-1.5 font-semibold text-pink-500">From</div>
              <div className="relative">
                <div className="flex items-center gap-2 px-5 py-2 rounded-2xl shadow-md border-2"
                     style={{
                       background: 'linear-gradient(to right, #FFF0F5, #FFE4E9, #FFD4E0)',
                       borderColor: '#FFB5D8'
                     }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white shadow-sm">
                    <svg className="w-3.5 h-3.5" style={{ color: '#FF69B4' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-bold text-base md:text-lg text-gray-800">{memory.nickname}</span>
                </div>
              </div>
            </div>
          )}

          {/* Message Card with Enhanced Quote Style */}
          <div className="relative mb-3">
            {/* Decorative quote marks */}
            <div className="absolute -top-2 -left-1 text-pink-200/50 text-4xl leading-none font-serif select-none pointer-events-none">"</div>
            <div className="absolute -bottom-2 -right-1 text-purple-200/50 text-4xl leading-none font-serif rotate-180 select-none pointer-events-none">"</div>

            {/* Message container with glass morphism */}
            <div className="relative backdrop-blur-sm bg-gradient-to-br from-white/80 via-pink-50/50 to-purple-50/50 rounded-3xl p-4 md:p-5 shadow-lg border border-pink-100/60">
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-100/30 to-purple-100/30 opacity-50"></div>

              <p className="relative text-gray-800 text-sm md:text-base font-medium leading-relaxed text-center whitespace-pre-wrap break-words"
                 style={{
                   textShadow: '0 2px 4px rgba(0,0,0,0.05)',
                   fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                 }}>
                {memory.message}
              </p>
            </div>
          </div>

          {/* Enhanced Decorative Divider */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-200 to-pink-300 max-w-[50px]"></div>
            <div className="relative">
              <div className="absolute inset-0 bg-pink-400 blur-md opacity-30"></div>
              <svg className="relative w-3.5 h-3.5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-200 to-purple-300 max-w-[50px]"></div>
          </div>

          {/* Date Section with Enhanced Design */}
          <div className="flex items-center justify-center gap-2 text-gray-400 pb-1">
            <div className="w-6 h-6 rounded-lg bg-pink-50 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs font-medium">
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
