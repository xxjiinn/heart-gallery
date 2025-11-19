import { useState, useEffect } from 'react';
import { MainPage } from './components/MainPage';
import { SquarePage } from './components/SquarePage';
import { projectId, publicAnonKey } from './utils/supabase/info';

export interface HeartMemory {
  id: string;
  imageUrl: string;
  message: string;
  createdAt: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'main' | 'square'>('main');
  const [memories, setMemories] = useState<HeartMemory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-c90918de`;

  // Fetch memories on load
  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${serverUrl}/memories`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

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

  const handleSaveMemory = async (imageData: string, message: string) => {
    try {
      const response = await fetch(`${serverUrl}/memories`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData, message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to save memory:', errorData);
        throw new Error(errorData.error || 'Failed to save memory');
      }

      const newMemory = await response.json();
      setMemories((prev) => [newMemory, ...prev]);
      setCurrentPage('square');
    } catch (error) {
      console.error('Error saving memory:', error);
      alert(`Failed to save memory: ${error.message}. Please try again.`);
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