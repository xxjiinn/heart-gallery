import type { HeartMemory } from '../App';

interface HeartCardProps {
  memory: HeartMemory;
  index: number;
}

export function HeartCard({ memory }: HeartCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-pink-200 hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="w-full aspect-square bg-gray-100">
        <img
          src={memory.imageUrl}
          alt="Memory"
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Image failed to load:', memory.imageUrl);
            e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23ddd" width="100" height="100"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999">No Image</text></svg>';
          }}
        />
      </div>

      {/* Message and Info */}
      <div className="p-4 bg-gradient-to-b from-pink-50 to-white">
        <p className="text-gray-800 font-medium text-sm mb-2 break-words">
          {memory.message || 'No message'}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>ID: {memory.id}</span>
          <span>{new Date(memory.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}