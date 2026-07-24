import { getPublicLetters } from '@/app/actions';
import { nanum } from '../layout';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function BoardPage() {
  const letters = await getPublicLetters();

  return (
    <div className="max-w-4xl mx-auto w-full space-y-8 py-8">
      <div className="text-center space-y-4 mb-12">
        <h2 className={`${nanum.className} text-4xl text-yellow-200`}>공개 고민 게시판</h2>
        <p className="text-slate-300">
          비슷한 고민을 가진 사람들의 이야기를 익명으로 나눕니다.<br/>
          (개인정보 보호를 위해 작성자가 공개에 동의한 고민만 표시됩니다.)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {letters.length === 0 ? (
          <div className="col-span-1 md:col-span-2 text-center py-20 text-slate-400">
            아직 공개된 고민이 없습니다.
          </div>
        ) : (
          letters.map(letter => (
            <div key={letter.id} className="bg-teal-800/40 p-6 rounded-2xl border-2 border-dashed border-slate-50/20 hover:border-yellow-200 transition-colors flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="bg-teal-900 text-yellow-200 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                    {letter.topic}
                  </span>
                  <span className="text-slate-400 text-sm">
                    {new Date(letter.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-50 line-clamp-2 leading-relaxed">
                  {letter.title}
                </h3>
              </div>
              <div className="mt-6 pt-4 border-t border-dashed border-slate-50/20 flex justify-between items-center text-sm text-slate-300">
                <span>답변 방식: {letter.replyStyle}</span>
                <span className="flex items-center space-x-1">
                  <Lock size={14} />
                  <span>익명 보장</span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="text-center pt-8">
        <Link 
          href="/write"
          className="inline-block bg-transparent border-2 border-slate-50 text-slate-50 px-8 py-4 rounded-xl font-bold text-xl hover:bg-slate-50 hover:text-teal-900 transition-all"
        >
          나도 익명으로 고민 남기기
        </Link>
      </div>
    </div>
  );
}
