import RootClientLayout from "@/components/utils/RootClientLayout";
import { GradientOrbs } from "@/components/utils";
import BackToTop from "./_components/BackToTop";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "normalize.css";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/globals.scss";

export const metadata = {
  title: {
    template: "%s | Wai Linn Aung",
    default: "ウェイ・リン・アウン — フルスタック開発者",
  },
  description:
    "東京を拠点とするフルスタック開発者。AWS認定エンジニア、Spendioの開発者。Wai Linn Aungのポートフォリオ。",
  keywords:
    "フルスタック開発者, AWS, React, ポートフォリオ, Wai Linn Aung, Full-Stack Developer, Tokyo",
  author: "Wai Linn Aung",
};

function RootLayout({ children }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                localStorage.setItem('theme', theme);
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                const lng = localStorage.getItem('i18nextLng') || 'jp';
                document.documentElement.lang = lng === 'en' ? 'en' : 'ja';
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="relative">
        <RootClientLayout>
          <div className="wrapper relative min-h-screen w-full bg-grey">
            <GradientOrbs />
            <Header />
            <main className="page-content relative bg-grey bg-opacity-95">
              {/* Subtle dot grid overlay */}
              <div className="dot-grid-bg fixed left-0 top-0 z-20 h-screen w-full" aria-hidden="true" />
              <div className="sitedata relative z-30 min-h-screen">
                {children}
              </div>
            </main>
            <Footer />
            <BackToTop />
          </div>
          <div className="portal-root"></div>
        </RootClientLayout>
      </body>
    </html>
  );
}

export default RootLayout;
