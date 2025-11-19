import { useState, useEffect } from 'react';
import { MainPage } from './components/MainPage';
import { SquarePage } from './components/SquarePage';

export interface HeartMemory {
  id: number;
  imageUrl: string;
  message: string;
  createdAt: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'main' | 'square'>('main');
  const [memories, setMemories] = useState<HeartMemory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Fetch memories on load
  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/memories`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch memories:', errorText);
        throw new Error('Failed to fetch memories');
      }

      const data = await response.json();
      setMemories(data);
    } catch (error) {
      console.error('Error fetching memories:', error);
      // Fallback to empty array if server is not ready
      setMemories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMemory = async (file: File, message: string) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('message', message);

      const response = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to save memory:', errorData);
        throw new Error(errorData.message || 'Failed to save memory');
      }

      const result = await response.json();
      console.log('Upload response:', result);
      const newMemory = result.data;
      console.log('New memory:', newMemory);
      setMemories((prev) => {
        const updated = [newMemory, ...prev];
        console.log('Updated memories:', updated);
        return updated;
      });
      setCurrentPage('square');
    } catch (error) {
      console.error('Error saving memory:', error);
      alert(`Failed to save memory: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFE5F1] to-[#E0D4FF]">
      {currentPage === 'main' ? (
        <MainPage onSave={handleSaveMemory} onViewGallery={() => setCurrentPage('square')} />
      ) : (
        <SquarePage 
          memories={memories} 
          onBackToMain={() => setCurrentPage('main')}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}