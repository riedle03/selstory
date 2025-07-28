
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LoadingSpinner } from './LoadingSpinner';

interface StoryDisplayProps {
  story: string;
  isLoading: boolean;
}

const StoryStep: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 transition-all duration-300 hover:shadow-xl hover:border-indigo-300">
    <h3 className="text-lg font-bold text-indigo-700 mb-3">
      {/* Remove markdown characters for clean display in h3 tag */}
      {title.replace(/\*|:/g, '')}
    </h3>
    <div className="prose prose-slate max-w-none prose-p:my-2 prose-p:leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  </div>
);

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, isLoading }) => {
  // Show large spinner only before the first chunk arrives
  if (isLoading && !story) {
    return (
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-lg border border-slate-200 min-h-[400px]">
        <LoadingSpinner />
        <p className="mt-4 text-slate-600 font-medium">AI가 멋진 이야기를 만들고 있어요...</p>
      </div>
    );
  }

  // Show initial placeholder when there is no story and not loading
  if (!story && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-lg border border-slate-200 min-h-[400px]">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
        <h2 className="mt-4 text-xl font-semibold text-slate-700">생성된 스토리가 여기에 표시됩니다.</h2>
        <p className="mt-2 text-slate-500 text-center">왼쪽 양식에 아이디어를 입력하고 '스토리 생성하기' 버튼을 눌러주세요.</p>
      </div>
    );
  }
  
  // Split the story by the numbered/bolded titles. This lookahead regex splits *before* the pattern.
  const storyParts = story.split(/(?=\d+\.\s+\*\*)/).filter(part => part.trim() !== '');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">생성된 이야기</h2>
      {storyParts.map((part, index) => {
        const lines = part.trim().split('\n');
        const title = lines.shift() || ''; // The first line is the title, e.g., "1. **...**:"
        const content = lines.join('\n').trim();

        // Don't render empty content, which can happen mid-stream
        if (!title) return null;

        return (
          <StoryStep key={index} title={title} content={content} />
        );
      })}
       {/* Show a small loading indicator at the bottom while streaming */}
       {isLoading && story && (
         <div className="flex items-center justify-center p-4">
          <div className="w-6 h-6 border-2 border-t-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="ml-3 text-slate-500">이야기를 이어가는 중...</p>
         </div>
       )}
    </div>
  );
};
