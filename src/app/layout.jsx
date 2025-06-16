import RootClientLayout from "@/components/utils/RootClientLayout";
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
          {children}
          <div className="portal-root"></div>
        </RootClientLayout>
      </body>
    </html>
  );
}

export default RootLayout;
