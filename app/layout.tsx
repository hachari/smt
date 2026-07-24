import type { Metadata } from "next";
import { Nanum_Pen_Script } from "next/font/google";
import "./globals.css";

const nanumPenScript = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "채리 하차리 | 정신채리라",
  description: "선생님들을 위한 교육용 웹 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${nanumPenScript.className} bg-teal-900 text-slate-50 min-h-screen flex flex-col`}
      >
        {/* 상단 헤더: 서비스 로고(채리 하차리)와 네비게이션 바 공간 */}
        <header className="border-b-2 border-dashed border-slate-50/30 p-4 lg:p-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl tracking-wider text-yellow-200">
              채리 하차리
            </h1>
            <nav>
              <ul className="flex space-x-6 text-2xl">
                <li>
                  <a href="#" className="hover:text-yellow-200 transition-colors">
                    홈
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-200 transition-colors">
                    소개
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-200 transition-colors">
                    기능
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* 메인 화면(Hero Section) 영역 */}
        <main className="flex-1 max-w-4xl mx-auto w-full p-6 flex flex-col items-center justify-center">
          {children}
        </main>

        {/* 하단 푸터: 카피라이트 공간 */}
        <footer className="border-t-2 border-dashed border-slate-50/30 p-4 text-center">
          <p className="text-xl opacity-80">
            &copy; {new Date().getFullYear()} 채리 하차리. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
