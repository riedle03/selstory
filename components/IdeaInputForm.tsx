
import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface IdeaInputFormProps {
  onSubmit: (idea: string) => void;
  isLoading: boolean;
}

export const IdeaInputForm: React.FC<IdeaInputFormProps> = ({ onSubmit, isLoading }) => {
  const [idea, setIdea] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(idea);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <label htmlFor="story-idea" className="text-lg font-semibold text-slate-700 mb-2">
        스토리 아이디어
      </label>
      <p className="text-slate-500 mb-4 text-sm">학생의 어떤 고민이나 상황에 대한 이야기를 만들고 싶으신가요?</p>
      <textarea
        id="story-idea"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="예: 그림에 놀라운 재능이 있지만, 자신감이 부족해 교내 미술대회에 참가하기를 두려워하는 학생"
        className="flex-grow w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200 min-h-[200px] resize-y"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            생성 중...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5 mr-2" />
            스토리 생성하기
          </>
        )}
      </button>
    </form>
  );
};
