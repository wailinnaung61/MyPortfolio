"use client";
import Link from "next/link";
import i18next from "@/i18n";
import { useEffect, useState } from "react";

const Logo = ({ url = "/", text = false }) => {
  const [lng, setLng] = useState("jp");
  const [mounted, setMounted] = useState(false);
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Initialize language properly
    const initLanguage = async () => {
      try {
        // Ensure i18next is initialized
        if (!i18next.isInitialized) {
          await i18next.init();
        }

        // Language setup - ensure Japanese is default
        const storedLang =
          typeof window !== "undefined"
            ? window.localStorage.getItem("i18nextLng")
            : null;

        // Force Japanese as default for new visitors
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
        console.error("Failed to initialize i18next in Logo:", error);
        // Fallback
        setLng("jp");
        setI18nReady(true);
      }
    };

    initLanguage();

    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []); // Empty dependency array to prevent infinite loop

  const t = (key) => i18next.t(key, { lng, ns: "common" });

  // Wait for mounting and i18n initialization
  if (!mounted || !i18nReady) {
    return (
      <Link href={url} className="sitelogo py-2">
        <span className="text-4xl font-bold uppercase leading-none text-primary">
          {"ポートフォリオ"}
        </span>
      </Link>
    );
  }

  return (
    <Link href={url} className="sitelogo py-2">
      <span className="text-4xl font-bold uppercase leading-none text-primary">
        {t("portfolio")}
      </span>
    </Link>
  );
};

export default Logo;
