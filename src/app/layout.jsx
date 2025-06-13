import RootClientLayout from "@/components/utils/RootClientLayout";
import "normalize.css";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/globals.scss";

export const metadata = {
  title: {
    template: "%s | Bieber",
    default: "Bieber",
  },
  description:
    "Bieber - is a creative personal portfolio React template build with NextJS and Tailwindcss.",
  keywords: "React Template, Portfolio Template",
  author: "Nuclear Themes",
};

function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <RootClientLayout>
        <body className="relative">
          {children}
          <div className="portal-root"></div>
        </body>
      </RootClientLayout>
    </html>
  );
}

export default RootLayout;
