"use client";

import i18next from "@/i18n";
import { useEffect, useState } from "react";
import { RiDownload2Fill, RiCalendarLine, RiAwardLine } from "react-icons/ri";

const Review = ({ review }) => {
  const [lng, setLng] = useState(i18next.language);
  useEffect(() => {
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  const name = review[`name_${lng}`] || review.name_en || review.name;
  const text = review[`text_${lng}`] || review.text_en || review.text;
  const { meta, category } = review;

  const isAws = category === "aws";

  const handleDownloadCertificate = () => {
    if (!review.certificateFile) return;
    const link = document.createElement("a");
    link.href = `/certificates/${review.certificateFile}`;
    link.download = review.certificateFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`group card relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 ${
        isAws
          ? "hover:border-amber-500/20 hover:shadow-lg hover:shadow-amber-500/5"
          : "hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
      }`}
    >
      <div>
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
            <RiAwardLine className={`text-base ${isAws ? "text-amber-500" : "text-primary"}`} />
          </div>
          <span className="flex items-center gap-1 text-xs text-body/50">
            <RiCalendarLine className="text-xs" />
            {meta}
          </span>
        </div>

        <h5 className="mb-2 text-sm font-semibold leading-snug text-heading">{name}</h5>
        <p className="mb-0 text-xs leading-relaxed text-body/60">{text}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {category && (
          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
            isAws
              ? "border-amber-500/20 bg-amber-500/10 text-amber-500"
              : "border-white/[0.08] bg-white/[0.04] text-body/50"
          }`}>
            {category}
          </span>
        )}
        <button
          onClick={handleDownloadCertificate}
          className={`!m-0 !inline-flex !h-9 !w-9 !min-h-0 !shrink-0 !items-center !justify-center !rounded-full !p-0 border shadow-sm transition-all duration-200 ${
            isAws
              ? "border-amber-500/35 bg-amber-500/12 text-amber-300 hover:border-amber-500/55 hover:bg-amber-500/20 hover:text-amber-200"
              : "border-primary/35 bg-primary/12 text-primary/90 hover:border-primary/55 hover:bg-primary/18 hover:text-primary"
          }`}
          title={lng === "jp" ? "証明書をダウンロード" : "Download certificate"}
          aria-label={lng === "jp" ? "証明書をダウンロード" : "Download certificate"}
        >
          <RiDownload2Fill className="text-lg leading-none opacity-100" />
        </button>
      </div>
    </div>
  );
};

export default Review;
