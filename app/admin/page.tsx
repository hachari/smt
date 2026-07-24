'use client';

import { useEffect, useState } from 'react';
import { adminGetLetters, adminUpdateLetter } from '@/app/actions';
import { Letter } from '@/lib/store';
import { nanum } from '@/lib/fonts';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [letters, setLetters] = useState<Letter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  
  // 관리자 답변 작성 폼 상태
  const [replyContent, setReplyContent] = useState('');
  const [status, setStatus] = useState<'WAITING'|'WRITING'|'COMPLETED'|'HIDDEN'>('WAITING');
  const [isPublic, setIsPublic] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin1234') { // 하드코딩된 임시 관리자 비밀번호
      setIsAuthenticated(true);
      loadLetters();
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const loadLetters = async () => {
    const data = await adminGetLetters();
    setLetters(data);
  };

  const handleSelect = (letter: Letter) => {
    setSelectedLetter(letter);
    setReplyContent(letter.replyContent || '');
    setStatus(letter.status);
    setIsPublic(letter.isPublic);
  };

  const handleUpdate = async () => {
    if (!selectedLetter) return;
    
    await adminUpdateLetter(selectedLetter.id, {
      replyContent,
      status,
      isPublic,
      repliedAt: status === 'COMPLETED' ? Date.now() : undefined,
    });
    
    alert('수정되었습니다.');
    loadLetters();
    setSelectedLetter(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className={`${nanum.className} text-4xl text-yellow-200`}>관리자 로그인</h2>
        <form onSubmit={handleLogin} className="flex space-x-2">
          <input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-3 rounded bg-teal-800 text-white outline-none border border-teal-600 focus:border-yellow-200"
            placeholder="비밀번호"
          />
          <button className="bg-yellow-200 text-teal-900 px-4 py-2 rounded font-bold">확인</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* 리스트 패널 */}
      <div className="md:col-span-1 bg-teal-800/30 p-4 rounded-xl border border-teal-700 h-[80vh] overflow-y-auto">
        <h3 className={`${nanum.className} text-2xl text-yellow-200 mb-4`}>편지 목록 ({letters.length})</h3>
        <div className="space-y-3">
          {letters.map(l => (
            <div 
              key={l.id} 
              onClick={() => handleSelect(l)}
              className={`p-3 rounded cursor-pointer border ${selectedLetter?.id === l.id ? 'border-yellow-200 bg-teal-700' : 'border-teal-700 bg-teal-800'} hover:bg-teal-700 transition-colors`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs bg-teal-900 px-2 py-1 rounded text-yellow-100">{l.status}</span>
                <span className="text-xs text-slate-400">{new Date(l.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="font-bold text-sm truncate text-white">{l.title}</div>
              <div className="text-xs text-slate-300 mt-1">{l.replyStyle} / {l.topic}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 상세 및 작성 패널 */}
      <div className="md:col-span-2 bg-teal-800/30 p-6 rounded-xl border border-teal-700 h-[80vh] overflow-y-auto">
        {selectedLetter ? (
          <div className="space-y-6">
            <h3 className={`${nanum.className} text-3xl text-yellow-200 border-b border-teal-700 pb-2`}>편지 상세 정보</h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm bg-teal-900/50 p-4 rounded">
              <div><strong>접수번호:</strong> {selectedLetter.id}</div>
              <div><strong>닉네임:</strong> {selectedLetter.nickname}</div>
              <div><strong>연령대:</strong> {selectedLetter.ageGroup}</div>
              <div><strong>분야:</strong> {selectedLetter.topic}</div>
              <div><strong>요청 방식:</strong> {selectedLetter.replyStyle}</div>
              <div><strong>만족도:</strong> {selectedLetter.satisfaction || '평가 전'}</div>
            </div>

            <div className="space-y-2">
              <strong className="text-yellow-100">제목</strong>
              <div className="p-3 bg-teal-900/50 rounded">{selectedLetter.title}</div>
            </div>

            <div className="space-y-2">
              <strong className="text-yellow-100">고민 내용</strong>
              <div className="p-4 bg-teal-900/50 rounded whitespace-pre-wrap min-h-[100px]">
                {selectedLetter.content}
              </div>
            </div>

            <hr className="border-teal-700" />

            <div className="space-y-4">
              <h4 className={`${nanum.className} text-2xl text-yellow-200`}>채리 선생님 답장 작성</h4>
              
              <textarea 
                value={replyContent}
                onChange={e => setReplyContent(e.target.value)}
                className="w-full bg-white text-teal-900 p-4 rounded outline-none min-h-[200px]"
                placeholder="답장을 작성해주세요. 공감 -> 현실 점검 -> 실천 방법 -> 응원 순서!"
              />

              <div className="flex gap-4 flex-wrap">
                <label className="flex items-center space-x-2">
                  <span className="font-bold">상태:</span>
                  <select 
                    value={status} 
                    onChange={e => setStatus(e.target.value as any)}
                    className="p-2 bg-teal-900 rounded outline-none border border-teal-600"
                  >
                    <option value="WAITING">대기 중</option>
                    <option value="WRITING">작성 중</option>
                    <option value="COMPLETED">답변 완료</option>
                    <option value="HIDDEN">숨김 (부적절)</option>
                  </select>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <span className="font-bold">공개 여부 (사용자 동의 여부 기반):</span>
                  <input 
                    type="checkbox" 
                    checked={isPublic} 
                    onChange={e => setIsPublic(e.target.checked)}
                    className="w-5 h-5 accent-yellow-400"
                  />
                </label>
              </div>

              <button 
                onClick={handleUpdate}
                className="w-full bg-yellow-200 text-teal-900 py-3 rounded font-bold hover:bg-yellow-300 transition-colors"
              >
                저장 및 적용하기
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            왼쪽 목록에서 편지를 선택해주세요.
          </div>
        )}
      </div>
    </div>
  );
}
