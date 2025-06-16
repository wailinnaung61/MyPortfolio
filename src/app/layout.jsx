import RootClientLayout from "@/components/utils/RootClientLayout";
import BackToTop from "./_components/BackToTop";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import "normalize.css";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/globals.scss";

export const metadata = {
  title: {
    template: "%s | Wai Linn Aung",
    default: "Wai Linn Aung - Portfolio",
  },
  description:
    "Wai Linn Aung - is a creative personal portfolio React template build with NextJS and Tailwindcss.",
  keywords: "React, Portfolio ",
  author: "Wai Linn Aung",
};

function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="relative">
        <RootClientLayout>
          <div className="wrapper relative min-h-screen w-full bg-grey">
            <Header />
            <main className="page-content relative bg-grey bg-opacity-95">
              <div className="bglines fixed left-0 top-0 z-20 flex h-screen w-full justify-around">
                <span className="border-r border-white border-opacity-5"></span>
                <span className="border-r border-white border-opacity-5"></span>
                <span className="border-r border-white border-opacity-5"></span>
                <span className="border-r border-white border-opacity-5"></span>
                <span className="border-r border-white border-opacity-5"></span>
              </div>
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
