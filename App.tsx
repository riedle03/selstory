
import React, { useState, useCallback } from 'react';
import { IdeaInputForm } from './components/IdeaInputForm';
import { StoryDisplay } from './components/StoryDisplay';
import { generateStoryStream } from './services/geminiService';

function App() {
  const [story, setStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateStory = useCallback(async (idea: string) => {
    if (!idea.trim()) {
      setError('아이디어를 입력해주세요.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setStory('');

    try {
      await generateStoryStream(idea, (chunk) => {
        setStory((prevStory) => prevStory + chunk);
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
      setError(`스토리 생성에 실패했습니다: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600">사회정서 성장 스토리 생성기</h1>
          <p className="text-slate-600 mt-1">아이디어를 입력하면 AI가 사회정서(SEL) 5가지 역량을 담은 성장 스토리를 만들어 드립니다.</p>
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <IdeaInputForm onSubmit={handleGenerateStory} isLoading={isLoading} />
          </div>

          <div className="mt-8 lg:mt-0">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                <strong className="font-bold">오류: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <StoryDisplay story={story} isLoading={isLoading} />
          </div>

        </div>
      </main>
      <footer className="text-center py-6 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} SEL Story Generator. All rights reserved.</p>
          <p className="mt-1">Made by 이대형</p>
      </footer>
    </div>
  );
}

export default App;
