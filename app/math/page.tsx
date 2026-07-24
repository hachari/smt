'use client';

import { useChat } from 'ai/react';
import { nanum } from '@/lib/fonts';
import { Send, Bot, User, Trash2 } from 'lucide-react';

export default function MathTutorPage() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
    api: '/api/chat',
  });

  return (
    <div className="max-w-3xl mx-auto w-full h-[85vh] flex flex-col pt-4">
      {/* 튜터봇 헤더 */}
      <div className="text-center mb-6 space-y-2 shrink-0">
        <h2 className={`${nanum.className} text-4xl text-yellow-200 flex items-center justify-center gap-2`}>
          <Bot size={32} />
          <span>수학 튜터봇</span>
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          수학 문제나 개념이 이해되지 않을 때 언제든 질문해 보세요!
        </p>
      </div>

      {/* 채팅 창 영역 */}
      <div className="flex-1 bg-teal-800/40 rounded-t-2xl border-2 border-b-0 border-dashed border-slate-50/20 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center flex-col text-slate-400 space-y-4">
            <Bot size={48} className="opacity-50" />
            <p className="text-center">
              안녕하세요! 저는 수학 튜터봇이에요.<br/>
              궁금한 수학 문제를 아래에 입력해 보세요!
            </p>
          </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* 프로필 아이콘 */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-yellow-200 text-teal-900' : 'bg-teal-700 text-yellow-200'}`}>
                  {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                
                {/* 메시지 말풍선 */}
                <div className={`p-4 rounded-2xl ${m.role === 'user' ? 'bg-yellow-200 text-teal-950 rounded-tr-sm' : 'bg-teal-900/80 text-slate-50 rounded-tl-sm border border-teal-700'}`}>
                  <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                    {m.content}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 입력 폼 영역 */}
      <div className="bg-teal-900 p-4 border-2 border-t-0 border-dashed border-slate-50/20 rounded-b-2xl shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="flex-1 bg-teal-800/50 border border-slate-50/30 rounded-xl p-4 text-slate-50 placeholder-slate-400 focus:outline-none focus:border-yellow-200 transition-colors"
            value={input}
            onChange={handleInputChange}
            placeholder="수학 관련 질문을 입력해주세요 (예: 근의 공식이 뭐야?)"
            required
          />
          <button 
            type="submit" 
            disabled={!input.trim()}
            className="bg-yellow-200 text-teal-900 px-6 rounded-xl font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send size={20} />
          </button>
        </form>
        <div className="flex justify-end mt-2">
          <button 
            type="button" 
            onClick={() => setMessages([])}
            className="text-xs text-slate-400 hover:text-red-300 flex items-center gap-1 transition-colors"
          >
            <Trash2 size={12} />
            <span>대화 초기화</span>
          </button>
        </div>
      </div>
    </div>
  );
}
