"use client";
import Link from "next/link";
import i18next from "i18next";
import { useEffect, useState } from "react";

const Logo = ({ url = "/", text = false }) => {
  const [lng, setLng] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        window.localStorage.getItem("i18nextLng") || i18next.language || "en"
      );
    }
    return i18next.language || "en";
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const storedLng = window.localStorage.getItem("i18nextLng");
      if (storedLng && storedLng !== lng) {
        setLng(storedLng);
      }
    }
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  const t = (key) => i18next.t(key, { lng, ns: "common" });

  if (!mounted) {
    return (
      <Link href={url} className="sitelogo py-2">
        <span className="text-4xl font-bold uppercase leading-none text-primary">
          {"portfolio"}
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
