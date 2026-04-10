import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiCloseLine } from "react-icons/ri";
import { Link as ScrollLink } from "react-scroll";
import i18next from "@/i18n";
import { useEffect, useState } from "react";
import "flag-icons/css/flag-icons.min.css";

const MobileNavigation = ({ changeState }) => {
  const pathname = usePathname();
  const checkroute = pathname === "/";
  const [lng, setLng] = useState("jp");
  const [isDark, setIsDark] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLng =
        window.localStorage.getItem("i18nextLng") || i18next.language || "jp";
      setLng(storedLng);
      const storedTheme = window.localStorage.getItem("theme");
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const html = document.documentElement;
      if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
        html.classList.add("dark");
        setIsDark(true);
      } else {
        html.classList.remove("dark");
        setIsDark(false);
      }
    }
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  const t = (key) => i18next.t(key, { lng, ns: "common" });

  const handleClick = () => {
    changeState(false);
  };

  return (
    <>
      <button
        className="btn btn-small btn-transparent absolute left-auto right-4 top-4 z-10 h-10 w-10 rounded-full p-0 text-center text-3xl"
        onClick={() => changeState(false)}
      >
        <RiCloseLine className="inline" />
      </button>
      <nav
        className={`relative max-h-full w-full overflow-y-auto flex flex-col items-center justify-center min-h-screen 
        ${isDark ? "bg-gray-900" : "bg-white"}
      `}
      >
        <ul className="mb-0 list-none pl-0 w-full flex flex-col items-center justify-center">
          <li className="block">
            {!checkroute ? (
              <Link
                href="/"
                className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider 
                  ${isDark ? 'text-white' : 'text-heading'} before:text-primary"
                onClick={() => handleClick()}
              >
                {t("home")}
                <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
              </Link>
            ) : (
              <ScrollLink
                activeClass="text-primary"
                to="section-home"
                spy={true}
                smooth="easeInQuad"
                offset={-74}
                duration={1000}
                className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider text-heading before:text-primary"
                onClick={() => handleClick()}
              >
                {t("home")}
                <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
              </ScrollLink>
            )}
          </li>
          <li className="block">
            {!checkroute ? (
              <Link
                href="/"
                className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider text-heading before:text-primary"
                onClick={() => handleClick()}
              >
                {t("about")}
                <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
              </Link>
            ) : (
              <ScrollLink
                activeClass="text-primary"
                to="section-about"
                spy={true}
                smooth="easeInQuad"
                offset={-74}
                duration={1000}
                className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider text-heading before:text-primary"
                onClick={() => handleClick()}
              >
                {t("about")}
                <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
              </ScrollLink>
            )}
          </li>
          <li className="block">
            {!checkroute ? (
              <Link
                href="/"
                className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider text-heading before:text-primary"
                onClick={() => handleClick()}
              >
                {t("resume")}
                <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
              </Link>
            ) : (
              <ScrollLink
                activeClass="text-primary"
                to="section-resume"
                spy={true}
                smooth="easeInQuad"
                offset={-74}
                duration={1000}
                className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider text-heading before:text-primary"
                onClick={() => handleClick()}
              >
                {t("resume")}
                <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
              </ScrollLink>
            )}
          </li>
          <li className="block">
            {!checkroute ? (
              <Link
                href="/"
                className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider text-heading before:text-primary"
                onClick={() => handleClick()}
              >
                {t("myworks")}
                <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
              </Link>
            ) : (
              <ScrollLink
                activeClass="text-primary"
                to="section-portfolios"
                spy={true}
                smooth="easeInQuad"
                offset={-74}
                duration={1000}
                className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider text-heading before:text-primary"
                onClick={() => handleClick()}
              >
                {t("myworks")}
                <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
              </ScrollLink>
            )}
          </li>
          <li className="block">
            <Link
              href="/posts/1"
              className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider text-heading before:text-primary"
              onClick={() => handleClick()}
            >
              {t("blog")}
              <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </Link>
          </li>
          <li className="flex justify-center">
            {!checkroute ? (
              <Link
                href="/"
                className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider text-heading before:text-primary"
                onClick={() => handleClick()}
              >
                {t("contact")}
                <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
              </Link>
            ) : (
              <ScrollLink
                activeClass="text-primary"
                to="section-contact"
                spy={true}
                smooth="easeInQuad"
                offset={-74}
                duration={1000}
                className="group relative inline-block cursor-pointer py-2 text-lg uppercase tracking-wider text-heading before:text-primary"
                onClick={() => handleClick()}
              >
                {t("contact")}
                <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
              </ScrollLink>
            )}
          </li>
        </ul>
        {/* Language Switcher */}
        <li className="relative mt-5 block">
          <div className="relative inline-block w-full text-left">
            <button
              type="button"
              aria-label="Switch language"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-heading shadow-[0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:border-primary/35 hover:bg-primary/10"
              onClick={() => setShowLangDropdown((prev) => !prev)}
            >
              <span
                className={`fi ${lng === "en" ? "fi-gb" : "fi-jp"} h-4 w-5 flex-shrink-0 rounded-sm`}
              ></span>
              <span className="text-sm font-semibold">
                {lng === "en" ? "English" : "日本語"}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(16,185,129,0.7)]"></span>
              <svg
                className={`h-3.5 w-3.5 text-heading/70 transition-transform duration-300 ${
                  showLangDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showLangDropdown && (
              <ul
                className={`absolute left-1/2 z-50 mt-2 w-40 -translate-x-1/2 rounded-xl border border-white/[0.1] p-1.5 shadow-2xl backdrop-blur-xl ${
                  isDark ? "bg-gray-900/95" : "bg-white/95"
                }`}
              >
                {["en", "jp"].map((code) => (
                  <li key={code}>
                    <button
                      type="button"
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                        lng === code
                          ? "bg-primary/12 text-primary"
                          : isDark
                          ? "text-white hover:bg-primary-dark/10 hover:text-primary-light"
                          : "text-heading hover:bg-primary/10 hover:text-primary"
                      }`}
                      onClick={() => {
                        i18next.changeLanguage(code);
                        if (typeof window !== "undefined") {
                          window.localStorage.setItem("i18nextLng", code);
                          document.documentElement.lang = code === "en" ? "en" : "ja";
                        }
                        setShowLangDropdown(false);
                      }}
                    >
                      <span
                        className={`fi ${code === "en" ? "fi-gb" : "fi-jp"} h-4 w-5 flex-shrink-0 rounded-sm`}
                      ></span>
                      <span className="font-medium">
                        {code === "en" ? "English" : "日本語"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
        <li className="block">
          {/* Light/Dark Mode Switcher */}
          <button
            aria-label="Toggle dark mode"
            onClick={() => {
              const html = document.documentElement;
              const newMode = !isDark;
              if (newMode) {
                html.classList.add("dark");
                localStorage.setItem("theme", "dark");
              } else {
                html.classList.remove("dark");
                localStorage.setItem("theme", "light");
              }
              setIsDark(newMode);
            }}
            className={`appearance-none bg-transparent border-none p-0 m-0 focus:outline-none 
              ${isDark ? "text-white" : "text-heading"}`}
          >
            {isDark ? (
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
        </li>
        <div className="header-button pt-8">
          <ScrollLink
            activeClass="active"
            to="section-contact"
            spy={true}
            smooth="easeInQuad"
            offset={-74}
            duration={1000}
            className={`btn btn-small ${
              isDark ? "" : "text-white bg-primary hover:bg-primary-dark"
            }`}
            onClick={() => handleClick()}
          >
            <span>{t("hireme")}</span>
          </ScrollLink>
        </div>
      </nav>
    </>
  );
};

export default MobileNavigation;
