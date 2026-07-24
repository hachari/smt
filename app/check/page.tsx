'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { nanum } from '../layout';
import { MailOpen, Search } from 'lucide-react';
import { checkReplyAuth } from '@/app/actions';

export default function CheckPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const id = formData.get('id') as string;
    const password = formData.get('password') as string;

    const result = await checkReplyAuth(id, password);
    
    if (result.success) {
      router.push(`/letter/${id}?pw=${password}`);
    } else {
      setError(result.message || '인증에 실패했습니다.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full space-y-8 py-12">
      <div className="text-center space-y-4">
        <div className="flex justify-center text-yellow-200 mb-6">
          <MailOpen size={64} />
        </div>
        <h2 className={`${nanum.className} text-4xl text-yellow-200`}>내 편지함 열어보기</h2>
        <p className="text-slate-300">
          발급받은 접수번호와 비밀번호를 입력해 주세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-teal-800/40 p-6 md:p-8 rounded-2xl border-2 border-dashed border-slate-50/20">
        
        <div className="space-y-2">
          <label className="block text-sm text-yellow-100 font-bold">접수번호</label>
          <input required type="text" name="id" className="w-full bg-teal-900/50 border border-slate-50/30 rounded-lg p-3 text-slate-50 font-mono tracking-widest placeholder-slate-500 focus:outline-none focus:border-yellow-200" placeholder="0000-0000" />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-yellow-100 font-bold">비밀번호</label>
          <input required type="password" name="password" className="w-full bg-teal-900/50 border border-slate-50/30 rounded-lg p-3 text-slate-50 font-mono tracking-widest placeholder-slate-500 focus:outline-none focus:border-yellow-200" placeholder="****" />
        </div>

        {error && (
          <p className="text-red-400 text-sm font-bold text-center">{error}</p>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-2 bg-yellow-200 text-teal-900 px-6 py-4 rounded-xl font-bold text-xl hover:bg-yellow-300 transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <span>확인 중...</span>
          ) : (
            <>
              <Search size={24} />
              <span>답장 확인하기</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
}
