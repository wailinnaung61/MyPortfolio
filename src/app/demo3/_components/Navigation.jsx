import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link as ScrollLink } from "react-scroll";
import i18next from "@/i18n";
import { useEffect, useState } from "react";

const Navigation = () => {
  const pathname = usePathname();
  const checkroute = pathname === "/demo3";
  const [lng, setLng] = useState("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const storedLng =
        window.localStorage.getItem("i18nextLng") || i18next.language || "en";
      setLng(storedLng);
    }
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
            className="btn flex items-center gap-1"
          >
            <span>{lng === "en" ? "EN" : "JP"}</span>
            <svg
              className="w-4 h-4 ml-1"
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

          <ul className="absolute left-0 mt-2 hidden min-w-[7rem] origin-top-right rounded-md border border-gray-200 bg-white shadow-lg group-hover:block z-50">
            <li>
              <button
                onClick={() => {
                  i18next.changeLanguage("en");
                  if (typeof window !== "undefined") {
                    window.localStorage.setItem("i18nextLng", "en");
                  }
                }}
                className="block w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100 hover:text-primary rounded-none"
              >
                English
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  i18next.changeLanguage("jp");
                  if (typeof window !== "undefined") {
                    window.localStorage.setItem("i18nextLng", "jp");
                  }
                }}
                className="block w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100 hover:text-primary"
              >
                日本語
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
