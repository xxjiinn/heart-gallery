import { HeartCard } from './HeartCard';
import { Button } from './ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import type { HeartMemory } from '../App';

interface SquarePageProps {
  memories: HeartMemory[];
  onBackToMain: () => void;
  isLoading?: boolean;
}

export function SquarePage({ memories, onBackToMain, isLoading }: SquarePageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 bg-white/40 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-[#FFB5D8]/20">
            <Button
              onClick={onBackToMain}
              variant="ghost"
              className="text-[#C8B6FF] hover:bg-white/40 rounded-2xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-[#FFB5D8] fill-[#FFB5D8]" />
              <h2 className="text-[#C8B6FF]">Memory Gallery</h2>
            </div>
            
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse text-center">
              <Heart className="w-20 h-20 text-[#FFB5D8] fill-[#FFB5D8] mx-auto mb-4" />
              <p className="text-[#C8B6FF]">Loading memories...</p>
            </div>
          </div>
        ) : memories.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Heart className="w-20 h-20 text-[#FFB5D8]/30 mx-auto mb-4" />
              <p className="text-[#C8B6FF] opacity-60">
                No memories yet. Create your first heart memory!
              </p>
            </div>
          </div>
        ) : (
          /* Grid Layout - Fixed positions */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12">
            {memories.map((memory, index) => (
              <HeartCard key={memory.id} memory={memory} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}