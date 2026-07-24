'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { nanum } from '../../layout';
import { checkReplyAuth, submitSatisfaction } from '@/app/actions';
import { Letter } from '@/lib/store';
import { ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';

export default function LetterPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pw = searchParams.get('pw');
  
  const [letter, setLetter] = useState<Letter | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);

  useEffect(() => {
    if (!pw) {
      router.push('/check');
      return;
    }
    const loadLetter = async () => {
      const res = await checkReplyAuth(params.id, pw);
      if (res.success && res.letter) {
        setLetter(res.letter);
      } else {
        alert('잘못된 접근입니다.');
        router.push('/check');
      }
      setLoading(false);
    };
    loadLetter();
  }, [params.id, pw, router]);

  const handleSatisfaction = async (value: 'GOOD' | 'BAD') => {
    if (isEvaluating) return;
    setIsEvaluating(true);
    await submitSatisfaction(params.id, value);
    setLetter((prev) => prev ? { ...prev, satisfaction: value } : null);
    setIsEvaluating(false);
    alert('소중한 의견 감사합니다!');
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-yellow-200" size={48} /></div>;
  }

  if (!letter) return null;

  return (
    <div className="max-w-3xl mx-auto w-full space-y-8 py-8">
      {/* 상태 배지 */}
      <div className="flex justify-center">
        {letter.status === 'WAITING' && <span className="bg-slate-600 text-slate-100 px-4 py-2 rounded-full font-bold">답장 대기 중 ⏳</span>}
        {letter.status === 'WRITING' && <span className="bg-yellow-600 text-yellow-50 px-4 py-2 rounded-full font-bold">답장 작성 중 ✍️</span>}
        {letter.status === 'COMPLETED' && <span className="bg-teal-600 text-teal-50 px-4 py-2 rounded-full font-bold">답장 도착 💌</span>}
        {letter.status === 'HIDDEN' && <span className="bg-red-600 text-red-50 px-4 py-2 rounded-full font-bold">관리자 검토 중 ⚠️</span>}
      </div>

      {/* 내 고민 (편지지 형태) */}
      <div className="bg-[#fefce8] text-slate-800 p-8 rounded-lg shadow-lg relative">
        <div className="absolute top-4 left-4 w-4 h-4 bg-teal-900/20 rounded-full" />
        <div className="absolute top-4 right-4 w-4 h-4 bg-teal-900/20 rounded-full" />
        
        <div className="border-b-2 border-slate-300/50 pb-4 mb-6">
          <h2 className={`${nanum.className} text-3xl mb-2 text-teal-900`}>{letter.title}</h2>
          <div className="flex flex-wrap gap-2 text-sm text-slate-500 font-bold">
            <span>보낸이: {letter.nickname}</span>
            <span>|</span>
            <span>{letter.ageGroup}</span>
            <span>|</span>
            <span>{letter.topic}</span>
            <span>|</span>
            <span>원하는 답장: {letter.replyStyle}</span>
          </div>
        </div>
        
        <div className="whitespace-pre-wrap leading-loose min-h-[150px]">
          {letter.content}
        </div>
      </div>

      {/* 답장 영역 */}
      {letter.status === 'COMPLETED' && letter.replyContent && (
        <div className="bg-[#f8fafc] text-teal-950 p-8 rounded-lg shadow-lg relative border-l-8 border-yellow-300">
          <h3 className={`${nanum.className} text-3xl mb-6 text-teal-900`}>채리 선생님의 답장</h3>
          <div className="whitespace-pre-wrap leading-loose min-h-[150px]">
            {letter.replyContent}
          </div>
          <div className="text-right text-slate-500 text-sm mt-8">
            {new Date(letter.repliedAt || 0).toLocaleDateString()}
          </div>
        </div>
      )}

      {/* 만족도 평가 (답장이 완료되었을 때만) */}
      {letter.status === 'COMPLETED' && (
        <div className="pt-8 border-t-2 border-dashed border-slate-50/20 text-center space-y-6">
          <h4 className="text-xl text-yellow-100 font-bold">선생님의 답장이 도움이 되었나요?</h4>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => handleSatisfaction('GOOD')}
              disabled={letter.satisfaction !== null || isEvaluating}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all ${letter.satisfaction === 'GOOD' ? 'bg-yellow-200 text-teal-900' : 'bg-transparent border-2 border-slate-50 text-slate-50 hover:bg-slate-50/10'}`}
            >
              <ThumbsUp size={20} />
              <span>도움이 되었어요</span>
            </button>
            <button 
              onClick={() => handleSatisfaction('BAD')}
              disabled={letter.satisfaction !== null || isEvaluating}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all ${letter.satisfaction === 'BAD' ? 'bg-red-400 text-white border-red-400' : 'bg-transparent border-2 border-slate-50 text-slate-50 hover:bg-slate-50/10'}`}
            >
              <ThumbsDown size={20} />
              <span>아쉬워요</span>
            </button>
          </div>
          {letter.satisfaction && <p className="text-sm text-yellow-200 mt-2">소중한 피드백 감사합니다!</p>}
        </div>
      )}

    </div>
  );
}
