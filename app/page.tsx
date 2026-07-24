import { BookOpen } from "lucide-react";

export default function Home() {
  return (
    <section className="text-center space-y-8 p-8 md:p-12 border-4 border-dashed border-slate-50/20 rounded-2xl w-full">
      {/* 환영 문구 */}
      <h2 className="text-5xl md:text-7xl text-yellow-200 leading-tight">
        정신채리라!
      </h2>
      
      {/* 간단한 설명 */}
      <p className="text-3xl md:text-4xl text-slate-100 max-w-xl mx-auto leading-relaxed">
        이곳은 선생님들을 위한 마법의 교실입니다.<br />
        필요한 기능들을 자유롭게 추가하고 그려보세요.
      </p>
      
      {/* 기능 추가를 위한 가짜(Placeholder) 버튼 */}
      <div className="pt-8 flex justify-center">
        <button 
          className="inline-flex items-center space-x-3 bg-transparent border-2 border-slate-50 border-dashed text-slate-50 px-8 py-4 rounded-xl text-3xl hover:bg-slate-50/10 hover:border-yellow-200 hover:text-yellow-200 transition-all transform hover:scale-105 active:scale-95"
          aria-label="기능 추가하기"
        >
          <BookOpen size={32} />
          <span>기능 추가하기</span>
        </button>
      </div>
    </section>
  );
}
