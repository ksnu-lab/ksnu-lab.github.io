import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "사이버보안 연구실 | Cyber Security Lab",
    template: "%s | SecLab",
  },
  description:
    "국립군산대학교 컴퓨터정보공학과 사이버 보안 연구실. 암호 및 부채널 분석, 인공지능 보안, 해킹 및 보안을 연구합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>

        {/* Microsoft Clarity 추적 코드 삽입 */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vjdvdgo52l");
          `}
        </Script>
      </body>
    </html>
  );
}
