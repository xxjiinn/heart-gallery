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
    const [isSaving, setIsSaving] = useState(false);                  // 저장 중.
  const [showSuccessModal, setShowSuccessModal] = useState(false);    // 저장 성공.

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Fetch memories on load
  // useEffect의 의존성 배열(두번째 인자)이 빈 배열([]) 이므로, 이 훅은 처음 화면에 마운트(Mount)될 때 (페이지에 처음 나타날 때) 오직 1회만 실행된다. 
  // 즉, setMemories 호출로 인해 App 컴포넌트가 재렌더링되더라도, fetchMemories()는 다시 호출되지 않는다.
  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/memories`);
      // response = 서버로부터 받을 HTTP 응답의 본문(Body).
      // fetch 함수 안에 설정 객체({})를 2번째 인수로 받지 않았으므로 GET 요청이다.

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch memories:', errorText);
        throw new Error('Failed to fetch memories');
      }

      const data = await response.json();   // 서버로부터 받은 JSON 응답 본문을 Javascript 객체로 변환한다.
      setMemories(data);    // 단순한 변수 대입이 아니라, React 시스템에 "데이터가 바뀌었으니 화면을 다시 그려라"는 신호를 보내는 것이다.
    } catch (error) {
      console.error('Error fetching memories:', error);
      setMemories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMemory = async (file: File, message: string) => {
    try {
      // 로딩 시작
      setIsSaving(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('message', message);

      const response = await fetch(`${apiUrl}/upload`, {
        method: 'POST',   // fetch 함수 안에 설정 객체({})를 2번째 인수로 받았으므로 GET 요청이 아닌 POST이다.
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

      // 로딩 끝
      setIsSaving(false);

      // 성공 모달 표시
      setShowSuccessModal(true);

      // 1.5초 후 갤러리로 이동
      setTimeout(() => {
        setShowSuccessModal(false);
        setCurrentPage('square');
      }, 1500);
    } catch (error) {
      setIsSaving(false);
      console.error('Error saving memory:', error);
      alert(`Failed to save memory: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
  };

  return (
    <div className={`min-h-screen ${currentPage === 'main' ? 'overflow-hidden md:overflow-auto' : 'overflow-auto'}`} style={{ background: 'linear-gradient(to bottom, #FFF8F0 0%, #FFD6E8 50%, #EDD9F5 100%)', backgroundAttachment: 'fixed' }}>
      {currentPage === 'main' ? (
        <MainPage onSave={handleSaveMemory} onViewGallery={() => setCurrentPage('square')} />
          // MainPage로 보낼 때 onSave 함수와 onViewGallery 함수를 '호출'하는게 아니라, 일단 '정의'만 해서 보내줌. 
          // 그리고 나중에 MainPage 내에서 각 함수를 호출하면 그때 여기로 다시 와서 값을 반환함.
          // 예를 들어, currentPage가 main이면 일단 onSave와 onViewGallery 함수를 MainPage로 보냄. 만약 사용자가 'View Gallery' 버튼을 눌러서 MainPage에서 onViewGallery를 호출하면 여기로 와서 그제서야 
          // 익명 함수인 () => setCurrentPage('square')를 호출함으로써 setCurrentPage를 square로 변경함.
      ) : (
        <SquarePage
          memories={memories}
          onBackToMain={() => setCurrentPage('main')}
          isLoading={isLoading}
        />
      )}

      {/* Loading Modal */}
      {isSaving && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 border-4 border-[#C8B6FF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-arita font-bold text-[#C8B6FF]">저장 중...</h2>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-[#C8B6FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-arita font-bold text-[#C8B6FF]">저장되었습니다!</h2>
          </div>
        </div>
      )}
    </div>
  );
}