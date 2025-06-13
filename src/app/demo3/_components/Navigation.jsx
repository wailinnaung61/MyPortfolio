import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link as ScrollLink } from "react-scroll";
import i18next from "@/i18n";
import { useEffect, useState } from "react";
import "flag-icons/css/flag-icons.min.css";

const Navigation = () => {
  const pathname = usePathname();
  const checkroute = pathname === "/demo3";
  const [lng, setLng] = useState("en");
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Initialize dark mode and language
  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      // Language setup
      const storedLng =
        window.localStorage.getItem("i18nextLng") || i18next.language || "en";
      setLng(storedLng);

      // Theme setup
      const storedTheme = window.localStorage.getItem("theme");
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const html = document.documentElement;

      if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
        html.classList.add("dark");
        setIsDark(true); // 🟢 Track current mode in state
      } else {
        html.classList.remove("dark");
        setIsDark(false);
      }
    }

    // i18n listener
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  // Use i18next.t for translations from JSON files, but let i18next handle the language
  const t = (key) => i18next.t(key, { lng, ns: "common" });

  if (!mounted) return null;

  return (
    <nav className="flex-grow px-5 text-center">
      <ul className="mb-0 inline-flex list-none gap-7 pl-0">
        <li className="inline-block align-middle">
          {!checkroute ? (
            <Link
              href="/demo3"
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
              href="/demo3"
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
              href="/demo3"
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
              href="/demo3"
              className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
            >
              {t("works")}
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
              {t("works")}
              <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
            </ScrollLink>
          )}
        </li>
        <li className="inline-block align-middle">
          <Link
            href="/demo3/posts/1"
            className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
          >
            {t("blog")}
            <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
          </Link>
        </li>
        <li className="inline-block align-middle">
          {!checkroute ? (
            <Link
              href="/demo3"
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
            className="flex items-center gap-1 px-3 py-1 border border-primary text-white rounded-md hover:bg-primary/10 transition"
          >
            <span className="text-heading">{lng === "en" ? "EN" : "JP"}</span>
            <svg
              className="w-4 h-4 ml-1 text-heading"
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
          <ul className="absolute left-0 mt-2 hidden min-w-[7rem] origin-top-right border border-primary bg-gray-200 shadow-lg group-hover:block z-50 list-none">
            <li
              onClick={() => {
                i18next.changeLanguage("en");
                if (typeof window !== "undefined") {
                  window.localStorage.setItem("i18nextLng", "en");
                }
              }}
              className="flex items-center gap-1 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 cursor-default"
            >
              <span className="fi fi-gb flex-shrink-0 w-5 h-4"></span>
              English
            </li>
            <li
              onClick={() => {
                i18next.changeLanguage("jp");
                if (typeof window !== "undefined") {
                  window.localStorage.setItem("i18nextLng", "jp");
                }
              }}
              className="flex items-center gap-1 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 cursor-default"
            >
              <span className="fi fi-jp flex-shrink-0 w-5 h-4"></span>
              日本語
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
