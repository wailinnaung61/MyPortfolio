"use client";

import { SocialIcons } from "@/components/elements";
import { getInformation } from "@/fetchers";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Footer = () => {
  const { data } = useQuery("information", getInformation);
  const { t, i18n } = useTranslation("common");
  const [lng, setLng] = useState(i18n.language);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleLangChange = (lng) => setLng(lng);
    i18n.on("languageChanged", handleLangChange);
    return () => i18n.off("languageChanged", handleLangChange);
  }, [i18n]);

  if (!data || !mounted) return null;

  return (
    <footer className="footer relative z-20 border-t border-white border-opacity-10 bg-grey bg-opacity-95 backdrop-blur backdrop-filter">
      <div className="container mx-auto">
        <div className="footer-content flex flex-wrap items-center justify-between gap-y-5 gap-x-7 py-5 text-center md:flex-nowrap">
          <div className="w-full md:w-auto">
            <SocialIcons data={data.socialAddress} />
          </div>
          <p className="mb-0 w-full md:w-auto">
            &copy; {new Date().getFullYear()}, {t("allrightsreserved")}
            <Link
              href="/"
              className="pl-1.5 font-medium text-heading no-underline hover:text-primary"
            >
              {lng === "jp" ? "ウェイリンアウン" : "Wai Linn Aung"}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
