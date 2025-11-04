"use client";

import { SocialIcons } from "@/components/elements";
import { getInformation } from "@/fetchers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import i18next from "i18next";

const Footer = () => {
  const { data } = useQuery("information", getInformation);
  const [lng, setLng] = useState(i18next.language || "en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  if (!data || !mounted) return null;

  const t = (key) => i18next.t(key, { lng, ns: "common" });

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
