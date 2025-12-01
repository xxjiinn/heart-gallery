import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { IntroPage } from './components/IntroPage';
import { MainPage } from './components/MainPage';
import { SquarePage } from './components/SquarePage';

export interface HeartMemory {
  id: number;
  imageUrl: string;
  fullImageUrl?: string;
  nickname: string;
  message: string;
  createdAt: string;
}

export default function App() {
  const navigate = useNavigate();
  const [memories, setMemories] = useState<HeartMemory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);                  // 저장 중.
  const [showSuccessModal, setShowSuccessModal] = useState(false);    // 저장 성공.
  const [isMobile, setIsMobile] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // GA4 초기화 및 사용자 ID 설정
  useEffect(() => {
    ReactGA.initialize('G-RYJR69VJXD');

    // 고유 사용자 ID 생성 및 저장
    let userId = localStorage.getItem('user_id');
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem('user_id', userId);
    }
    ReactGA.set({ userId });
  }, []);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch memories on load
  // useEffect의 의존성 배열(두번째 인자)이 빈 배열([]) 이므로, 이 훅은 처음 화면에 마운트(Mount)될 때 (페이지에 처음 나타날 때) 오직 1회만 실행된다.
  // 즉, setMemories 호출로 인해 App 컴포넌트가 재렌더링되더라도, fetchMemories()는 다시 호출되지 않는다.
  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  const fetchMemories = useCallback(async () => {
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

      // 모든 이미지 즉시 프리로드 (스크롤 시 즉시 표시되도록)
      data.forEach((memory: HeartMemory) => {
        const img = new Image();
        img.src = memory.imageUrl;
      });
    } catch (error) {
      console.error('Error fetching memories:', error);
      setMemories([]);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  // WebSocket으로 받은 새 카드를 처리 (중복 방지 포함)
  const handleNewCard = useCallback((newCard: HeartMemory) => {
    setMemories((prev) => {
      // 이미 존재하는 카드인지 체크 (카드의 id로 판단)
      const exists = prev.some(memory => memory.id === newCard.id);
      if (exists) {
        console.log('Card already exists, skipping:', newCard.id);
        return prev; // 상태 변경 없음
      }
      console.log('Adding new card from WebSocket:', newCard.id);
      return [newCard, ...prev]; // 새 카드 추가
    });
  }, []);

  const handleSaveMemory = async (croppedFile: File, fullFile: File, nickname: string, message: string) => {
    try {
      // 로딩 시작
      setIsSaving(true);

      const formData = new FormData();
      formData.append('file', croppedFile);
      formData.append('fullFile', fullFile);
      formData.append('nickname', nickname);
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

      // GA4 이벤트 전송 (user_id 포함)
      const userId = localStorage.getItem('user_id');
      ReactGA.event('card_created', {
        event_category: 'engagement',
        event_label: 'memory_saved',
        user_id: userId
      });

      // 성공 모달 표시
      setShowSuccessModal(true);

      // 1.5초 후 갤러리로 이동
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/gallery');
      }, 1500);
    } catch (error) {
      setIsSaving(false);
      console.error('Error saving memory:', error);
      alert(`Failed to save memory: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen fixed inset-0 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #FFF8F0 10%, #FFD6E8 70%, #E0D4FF 110%)' }}>
      <div className="h-full overflow-y-auto">
        <Routes>
          <Route
            path="/"
            element={<IntroPage onStart={() => navigate('/upload')} />}
          />
          <Route
            path="/upload"
            element={<MainPage onSave={handleSaveMemory} onViewGallery={() => navigate('/gallery')} />}
            // MainPage로 보낼 때 onSave 함수와 onViewGallery 함수를 '호출'하는게 아니라, 일단 '정의'만 해서 보내줌.
            // 그리고 나중에 MainPage 내에서 각 함수를 호출하면 그때 여기로 다시 와서 값을 반환함.
            // 예를 들어, currentPage가 main이면 일단 onSave와 onViewGallery 함수를 MainPage로 보냄. 만약 사용자가 'View Gallery' 버튼을 눌러서 MainPage에서 onViewGallery를 호출하면 여기로 와서
            // 익명 함수인 () => setCurrentPage('square')를 호출함으로써 setCurrentPage를 square로 변경함.
          />
          <Route
            path="/gallery"
            element={
              <SquarePage
                memories={memories}
                onBackToMain={() => navigate('/upload')}
                isLoading={isLoading}
                onNewCard={handleNewCard}
                onRefresh={fetchMemories}
              />
            }
          />
        </Routes>
      </div>

      {/* Loading Modal */}
      {isSaving && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-[240px] md:max-w-[340px] w-full text-center shadow-2xl">
            <div className="w-16 h-16 border-4 border-[#C8B6FF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-[#9747FF]">저장 중...</h2>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-[240px] md:max-w-[340px] w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-[#9747FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#9747FF]">저장되었습니다!</h2>
          </div>
        </div>
      )}
    </div>
  );
}