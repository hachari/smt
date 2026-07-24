'use client';

import { useSearchParams } from 'next/navigation';
import { nanum } from '@/lib/fonts';
import Link from 'next/link';
import { CheckCircle2, Home, MailOpen } from 'lucide-react';
import { Suspense } from 'react';

function CompleteContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const pw = searchParams.get('pw');

  return (
    <div className="max-w-xl mx-auto text-center space-y-8 py-12">
      <div className="flex justify-center text-yellow-200">
        <CheckCircle2 size={80} />
      </div>
      
      <div className="space-y-4">
        <h2 className={`${nanum.className} text-4xl text-yellow-200`}>
          편지가 무사히 도착했어요!
        </h2>
        <p className="text-lg text-slate-200 leading-relaxed">
          채리 선생님이 편지를 꼼꼼히 읽고 답장을 작성해 주실 거예요.<br/>
          아래의 접수번호와 비밀번호를 <strong>반드시 캡처하거나 메모</strong>해 주세요!
        </p>
      </div>

      <div className="bg-teal-800/40 p-6 md:p-8 rounded-2xl border-2 border-dashed border-slate-50/30 space-y-4">
        <div>
          <span className="text-yellow-100 text-sm font-bold block mb-1">접수번호</span>
          <span className="text-3xl font-mono tracking-widest text-slate-50">{id}</span>
        </div>
        <div>
          <span className="text-yellow-100 text-sm font-bold block mb-1">비밀번호</span>
          <span className="text-2xl font-mono tracking-widest text-slate-50">{pw}</span>
        </div>
        <p className="text-red-300 text-sm mt-4 font-bold">
          ※ 분실 시 다시 찾을 수 없으며 답장을 확인할 수 없습니다.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link 
          href="/"
          className="flex items-center justify-center w-full sm:w-auto space-x-2 bg-transparent border-2 border-slate-50 text-slate-50 px-6 py-3 rounded-xl font-bold hover:bg-slate-50/10 transition-all"
        >
          <Home size={20} />
          <span>홈으로 가기</span>
        </Link>
        <Link 
          href="/check"
          className="flex items-center justify-center w-full sm:w-auto space-x-2 bg-yellow-200 text-teal-900 px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all"
        >
          <MailOpen size={20} />
          <span>답장 확인하기</span>
        </Link>
      </div>
    </div>
  );
}

export default function CompletePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompleteContent />
    </Suspense>
  );
}
