'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitLetter } from '@/app/actions';
import { nanum } from '../layout';
import EmergencyAlert from '@/components/EmergencyAlert';
import { Send } from 'lucide-react';

export default function WritePage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.length < 20 || content.length > 2000) {
      alert('고민 내용은 최소 20자, 최대 2000자 사이로 작성해 주세요.');
      return;
    }
    
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const result = await submitLetter(formData);
    
    if (result.success) {
      // 성공 시 완료 페이지로 쿼리 파라미터 전달 (실제 서비스에선 더 안전한 방법 사용 권장)
      router.push(`/complete?id=${result.id}&pw=${result.password}`);
    } else {
      alert('접수 중 오류가 발생했습니다.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full space-y-8 py-8">
      <div className="text-center space-y-4">
        <h2 className={`${nanum.className} text-4xl text-yellow-200`}>고민 편지 보내기</h2>
        <p className="text-slate-300">
          마음속 이야기를 솔직하게 적어주세요.<br/>
          <span className="text-yellow-100 font-bold">주의:</span> 본 서비스는 의료 및 전문 심리상담을 대체하지 않습니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-teal-800/40 p-6 md:p-8 rounded-2xl border-2 border-dashed border-slate-50/20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm text-yellow-100 font-bold">닉네임 (또는 별명)</label>
            <input required type="text" name="nickname" className="w-full bg-teal-900/50 border border-slate-50/30 rounded-lg p-3 text-slate-50 placeholder-slate-400 focus:outline-none focus:border-yellow-200" placeholder="예: 익명의 사과" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-yellow-100 font-bold">연령대</label>
            <select required name="ageGroup" className="w-full bg-teal-900/50 border border-slate-50/30 rounded-lg p-3 text-slate-50 focus:outline-none focus:border-yellow-200">
              <option value="">선택해주세요</option>
              <option value="초등학생">초등학생</option>
              <option value="중학생">중학생</option>
              <option value="고등학생">고등학생</option>
              <option value="대학생">대학생</option>
              <option value="성인">성인</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm text-yellow-100 font-bold">고민 분야</label>
            <select required name="topic" className="w-full bg-teal-900/50 border border-slate-50/30 rounded-lg p-3 text-slate-50 focus:outline-none focus:border-yellow-200">
              <option value="">선택해주세요</option>
              <option value="학업">학업</option>
              <option value="진로">진로</option>
              <option value="친구">친구 관계</option>
              <option value="가족">가족 관계</option>
              <option value="연애">연애</option>
              <option value="생활습관">생활 습관</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-yellow-100 font-bold">원하는 답변 방식</label>
            <select required name="replyStyle" className="w-full bg-teal-900/50 border border-slate-50/30 rounded-lg p-3 text-slate-50 focus:outline-none focus:border-yellow-200">
              <option value="">선택해주세요</option>
              <option value="토닥 채리">토닥 채리 (무한 위로)</option>
              <option value="현실 채리">현실 채리 (팩트 폭격)</option>
              <option value="정신 채리">정신 채리 (실천 위주)</option>
              <option value="선생님 채리">선생님 채리 (전문 조언)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-yellow-100 font-bold">고민 제목</label>
          <input required type="text" name="title" maxLength={50} className="w-full bg-teal-900/50 border border-slate-50/30 rounded-lg p-3 text-slate-50 placeholder-slate-400 focus:outline-none focus:border-yellow-200" placeholder="어떤 고민인지 한 줄로 적어주세요." />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-yellow-100 font-bold flex justify-between">
            <span>고민 내용</span>
            <span className="text-slate-400 font-normal">{content.length} / 2000자</span>
          </label>
          <textarea 
            required 
            name="content" 
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-teal-900/50 border border-slate-50/30 rounded-lg p-3 text-slate-50 placeholder-slate-400 focus:outline-none focus:border-yellow-200 resize-none leading-relaxed" 
            placeholder="자세한 이야기를 들려주세요. (최소 20자 이상)&#13;&#10;※ 경고: 이름, 전화번호, 주소, 학교명 등 개인정보는 절대 적지 마세요!" 
          />
          <EmergencyAlert content={content} />
        </div>

        <div className="space-y-4 pt-4 border-t-2 border-dashed border-slate-50/20">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input type="checkbox" name="isPublic" className="mt-1 w-5 h-5 accent-teal-600 rounded" />
            <span className="text-sm text-slate-200 leading-relaxed">
              나와 비슷한 고민을 가진 다른 사람들을 위해 공개 게시판에 고민을 공유하는 것에 동의합니다. (선택) <br/>
              <span className="text-xs text-slate-400">* 공개되더라도 닉네임과 내용은 익명으로 처리됩니다.</span>
            </span>
          </label>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input required type="checkbox" className="mt-1 w-5 h-5 accent-teal-600 rounded" />
            <span className="text-sm text-slate-200 leading-relaxed">
              (필수) 본문 내에 어떠한 개인 식별 정보(이름, 연락처, 주소 등)도 작성하지 않았음을 확인하며, 개인정보 처리 및 운영 방침에 동의합니다.
            </span>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex items-center justify-center space-x-2 bg-yellow-200 text-teal-900 px-6 py-4 rounded-xl font-bold text-xl hover:bg-yellow-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
        >
          {isSubmitting ? (
            <span>접수 중...</span>
          ) : (
            <>
              <Send size={24} />
              <span>채리 선생님께 편지 보내기</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
}
