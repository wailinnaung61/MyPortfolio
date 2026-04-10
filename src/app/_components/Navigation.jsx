import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link as ScrollLink } from "react-scroll";
import i18next from "@/i18n";
import { useEffect, useState } from "react";
import "flag-icons/css/flag-icons.min.css";
import { useAppContext } from "@/context/appContext";

const Navigation = () => {
  const { isDark, setIsDark } = useAppContext();
  const [mounted, setMounted] = useState(false);
  const [lng, setLng] = useState("jp");
  const [i18nReady, setI18nReady] = useState(false);
  const pathname = usePathname();
  const checkroute = pathname === "/";

  // Initialize dark mode and language
  useEffect(() => {
    setMounted(true);

    // Wait for i18next to be ready
    const initLanguage = async () => {
      try {
        // Ensure i18next is initialized
        if (!i18next.isInitialized) {
          await i18next.init();
        }

        // Language: Japanese default for new visitors; respect saved choice
        const storedLang =
          typeof window !== "undefined"
            ? window.localStorage.getItem("i18nextLng")
            : null;

        if (!storedLang) {
          setLng("jp");
          await i18next.changeLanguage("jp");
          if (typeof window !== "undefined") {
            window.localStorage.setItem("i18nextLng", "jp");
            document.documentElement.lang = "ja";
          }
        } else if (storedLang && (storedLang === "en" || storedLang === "jp")) {
          setLng(storedLang);
          await i18next.changeLanguage(storedLang);
          if (typeof document !== "undefined") {
            document.documentElement.lang = storedLang === "en" ? "en" : "ja";
          }
        } else {
          setLng("jp");
          await i18next.changeLanguage("jp");
          if (typeof window !== "undefined") {
            window.localStorage.setItem("i18nextLng", "jp");
            document.documentElement.lang = "ja";
          }
        }

        setI18nReady(true);
      } catch (error) {
        console.error("Failed to initialize i18next:", error);
        setLng("jp");
        setI18nReady(true);
      }
    };

    initLanguage();

    if (typeof window !== "undefined") {
      // Theme setup
      const storedTheme = window.localStorage.getItem("theme");
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const html = document.documentElement;
      if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
        html.classList.add("dark");
        setIsDark(true); // 🟢 Track current mode in context
      } else {
        html.classList.remove("dark");
        setIsDark(false);
      }
    }

    // i18n listener
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []); // Empty dependency array - this should only run once on mount

  // Wait for mounting, language initialization, and i18n resources
  if (!mounted || !lng || !i18nReady) return null;

  // Use i18next.t for translations from JSON files, but let i18next handle the language
  const t = (key) => i18next.t(key, { lng, ns: "common" });

  return (
    <nav className="px-4 text-center">
      <ul className="mb-0 inline-flex list-none gap-6 pl-0">
        <li className="inline-block align-middle">
          {!checkroute ? (
            <Link
              href="/"
              className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
            >
              {t("home")}
              <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </Link>
          ) : (
            <ScrollLink
              activeClass="!text-primary"
              to="section-home"
              spy={true}
              smooth="easeInQuad"
              offset={-74}
              duration={1000}
              className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
            >
              {t("home")}
              <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </ScrollLink>
          )}
        </li>
        <li className="inline-block align-middle">
          {!checkroute ? (
            <Link
              href="/"
              className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
            >
              {t("about")}
              <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </Link>
          ) : (
            <ScrollLink
              activeClass="!text-primary"
              to="section-about"
              spy={true}
              smooth="easeInQuad"
              offset={-74}
              duration={1000}
              className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
            >
              {t("about")}
              <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </ScrollLink>
          )}
        </li>
        <li className="inline-block align-middle">
          {!checkroute ? (
            <Link
              href="/"
              className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
            >
              {t("resume")}
              <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </Link>
          ) : (
            <ScrollLink
              activeClass="!text-primary"
              to="section-resume"
              spy={true}
              smooth="easeInQuad"
              offset={-74}
              duration={1000}
              className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
            >
              {t("resume")}
              <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </ScrollLink>
          )}
        </li>
        <li className="inline-block align-middle">
          {!checkroute ? (
            <Link
              href="/"
              className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
            >
              {t("myworks")}
              <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </Link>
          ) : (
            <ScrollLink
              activeClass="!text-primary"
              to="section-portfolios"
              spy={true}
              smooth="easeInQuad"
              offset={-74}
              duration={1000}
              className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
            >
              {t("myworks")}
              <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </ScrollLink>
          )}
        </li>
        <li className="inline-block align-middle">
          <Link
            href="/blog"
            className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
          >
            {t("blog")}
            <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
          </Link>
        </li>
        <li className="inline-block align-middle">
          {!checkroute ? (
            <Link
              href="/"
              className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
            >
              {t("contact")}
              <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </Link>
          ) : (
            <ScrollLink
              activeClass="!text-primary"
              to="section-contact"
              spy={true}
              smooth="easeInQuad"
              offset={-74}
              duration={1000}
              className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
            >
              {t("contact")}
              <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </ScrollLink>
          )}
        </li>
        {/* Language Switcher */}
        <li className="relative top-3 inline-block align-middle group">
          <button
            type="button"
            aria-label="Switch language"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-heading shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:shadow-[0_0_16px_rgba(16,185,129,0.15)]"
          >
            <span
              className={`fi ${lng === "en" ? "fi-gb" : "fi-jp"} h-4 w-5 flex-shrink-0 rounded-sm`}
            ></span>
            <span className="text-xs font-semibold tracking-wide">
              {lng === "en" ? "English" : "日本語"}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(16,185,129,0.7)]"></span>
            <svg
              className="ml-0.5 h-3.5 w-3.5 text-heading/70 transition-transform duration-300 group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <ul className="absolute left-0 z-50 mt-2 hidden min-w-[9rem] list-none overflow-hidden rounded-xl border border-white/[0.08] bg-grey-lighten/95 p-1.5 shadow-2xl backdrop-blur-xl group-hover:block">
            <li>
              <button
                type="button"
                onClick={() => {
                  i18next.changeLanguage("en");
                  if (typeof window !== "undefined") {
                    window.localStorage.setItem("i18nextLng", "en");
                    document.documentElement.lang = "en";
                  }
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                  lng === "en"
                    ? "bg-primary/12 text-primary"
                    : "text-heading hover:bg-primary/8 hover:text-primary"
                }`}
              >
                <span className="fi fi-gb h-4 w-5 flex-shrink-0 rounded-sm"></span>
                <span className="font-medium">English</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  i18next.changeLanguage("jp");
                  if (typeof window !== "undefined") {
                    window.localStorage.setItem("i18nextLng", "jp");
                    document.documentElement.lang = "ja";
                  }
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                  lng === "jp"
                    ? "bg-primary/12 text-primary"
                    : "text-heading hover:bg-primary/8 hover:text-primary"
                }`}
              >
                <span className="fi fi-jp h-4 w-5 flex-shrink-0 rounded-sm"></span>
                <span className="font-medium">日本語</span>
              </button>
            </li>
          </ul>
        </li>
        {/* Light/Dark Mode Switcher */}
        <li className="relative top-3 inline-block align-middle">
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
            className="appearance-none bg-transparent border-none p-0 m-0 text-white dark:text-white focus:outline-none"
          >
            {!isDark ? (
              // Moon (dark)
              <svg
                className="w-5 h-5 text-heading"
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
              // Sun (light)
              <svg
                className="w-5 h-5 text-heading"
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
      </ul>
    </nav>
  );
};

export default Navigation;
