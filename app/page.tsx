import { nanum } from "./layout";
import { Pen, MailOpen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 w-full">
        <h2 className={`${nanum.className} text-5xl md:text-7xl text-yellow-200 leading-tight`}>
          정신 채리라!
        </h2>
        <p className="text-lg md:text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed font-medium">
          모든 고민에는 답이 없어도, 답장은 필요합니다.<br />
          누구에게도 말하지 못한 고민을 익명으로 남겨 주세요.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            href="/write"
            className="flex items-center justify-center w-full sm:w-auto space-x-2 bg-yellow-200 text-teal-900 px-8 py-4 rounded-xl font-bold text-xl hover:bg-yellow-300 transition-all transform hover:-translate-y-1"
          >
            <Pen size={24} />
            <span>고민 편지 보내기</span>
          </Link>
          <Link 
            href="/check"
            className="flex items-center justify-center w-full sm:w-auto space-x-2 bg-transparent border-2 border-slate-50 text-slate-50 px-8 py-4 rounded-xl font-bold text-xl hover:bg-slate-50/10 transition-all transform hover:-translate-y-1"
          >
            <MailOpen size={24} />
            <span>답장 확인하기</span>
          </Link>
        </div>
      </section>

      {/* 오늘의 답장 Section */}
      <section className="w-full max-w-4xl pt-12 border-t-2 border-dashed border-slate-50/20">
        <h3 className={`${nanum.className} text-3xl md:text-4xl text-center text-yellow-200 mb-8`}>
          📮 오늘의 채리 한마디
        </h3>
        <div className="p-8 border-2 border-slate-50/50 rounded-2xl bg-teal-800/50 text-center space-y-6 relative overflow-hidden">
          {/* 장식용 따옴표 */}
          <div className={`${nanum.className} text-8xl text-teal-700/30 absolute top-2 left-6 leading-none`}>"</div>
          <div className="relative z-10 space-y-2">
            <p className="text-xl md:text-2xl text-slate-50 font-medium leading-relaxed">
              공부를 못하는 건 부끄러운 일이 아니다.<br/>
              시작하지 않는 게 더 아쉽다.
            </p>
            <p className="text-xl md:text-2xl text-yellow-200 font-bold mt-4">
              오늘은 딱 20분만 해보자.
            </p>
          </div>
        </div>
      </section>

      {/* Reply Styles Cards */}
      <section className="w-full max-w-4xl pt-12 border-t-2 border-dashed border-slate-50/20">
        <h3 className={`${nanum.className} text-3xl md:text-4xl text-center text-yellow-200 mb-8`}>
          원하는 답장 방식을 선택해 보세요
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border-2 border-dashed border-slate-50/30 rounded-xl bg-teal-800/30">
            <h4 className={`${nanum.className} text-2xl text-yellow-200 mb-2`}>🤍 토닥 채리</h4>
            <p className="text-slate-200 leading-relaxed text-sm md:text-base">
              아무 조건 없는 무한 공감과 따뜻한 위로가 필요할 때 선택해 주세요. 마음이 많이 지쳤을 때 도움이 될 거예요.
            </p>
          </div>
          <div className="p-6 border-2 border-dashed border-slate-50/30 rounded-xl bg-teal-800/30">
            <h4 className={`${nanum.className} text-2xl text-yellow-200 mb-2`}>⚡ 현실 채리</h4>
            <p className="text-slate-200 leading-relaxed text-sm md:text-base">
              객관적인 팩트 체크와 현실적인 조언이 필요할 때. 아프지만 뼈가 되고 살이 되는 따끔한 조언을 해드려요.
            </p>
          </div>
          <div className="p-6 border-2 border-dashed border-slate-50/30 rounded-xl bg-teal-800/30">
            <h4 className={`${nanum.className} text-2xl text-yellow-200 mb-2`}>🎯 정신 채리</h4>
            <p className="text-slate-200 leading-relaxed text-sm md:text-base">
              구체적인 실천 방법과 액션 플랜이 필요할 때. 어떻게 시작해야 할지 막막한 상황에서 길잡이가 되어 드려요.
            </p>
          </div>
          <div className="p-6 border-2 border-dashed border-slate-50/30 rounded-xl bg-teal-800/30">
            <h4 className={`${nanum.className} text-2xl text-yellow-200 mb-2`}>👨‍🏫 선생님 채리</h4>
            <p className="text-slate-200 leading-relaxed text-sm md:text-base">
              진학, 학업, 진로에 관련된 전문적이고 경험 우러나오는 조언이 필요할 때. 든든한 학교 선생님처럼 도와드려요.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
