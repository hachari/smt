import type { Metadata } from "next";
import { Nanum_Pen_Script, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Link from "next/link";

export const nanum = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const notoSans = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "정신 채리라 | 고민 상담소",
  description: "익명으로 고민을 남기면 채리 선생님이 진심을 담아 답장해 드립니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSans.className} bg-teal-900 text-slate-50 min-h-screen flex flex-col`}
      >
        <header className="border-b-2 border-dashed border-slate-50/30 p-4 lg:p-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className={`${nanum.className} text-3xl md:text-4xl tracking-wider text-yellow-200 hover:text-yellow-300 transition-colors`}>
              정신 채리라
            </Link>
            <nav>
              <ul className={`${nanum.className} flex space-x-6 text-2xl`}>
                <li>
                  <Link href="/write" className="hover:text-yellow-200 transition-colors">
                    고민 보내기
                  </Link>
                </li>
                <li>
                  <Link href="/board" className="hover:text-yellow-200 transition-colors">
                    공개 고민
                  </Link>
                </li>
                <li>
                  <Link href="/check" className="hover:text-yellow-200 transition-colors">
                    답장 확인
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-6 flex flex-col">
          {children}
        </main>

        <footer className={`${nanum.className} border-t-2 border-dashed border-slate-50/30 p-4 text-center mt-8`}>
          <p className="text-xl opacity-80">
            &copy; {new Date().getFullYear()} 정신 채리라. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
