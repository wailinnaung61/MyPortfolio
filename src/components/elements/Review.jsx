"use client";
import { useAppContext } from "@/context/appContext";
import i18next from "@/i18n";
import { useEffect, useState } from "react";

const Review = ({ review }) => {
  const { isDark } = useAppContext();
  const [lng, setLng] = useState(i18next.language);
  useEffect(() => {
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  const name = review[`name_${lng}`] || review.name_en || review.name;
  const text = review[`text_${lng}`] || review.text_en || review.text;
  const { meta } = review;

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
      className={`review card mt-11 p-6 md:p-8 rounded-2xl shadow-xl transition-transform duration-200 hover:scale-[1.025] hover:shadow-2xl border border-gray-200/20 min-h-[320px] flex flex-col justify-between ${
        isDark ? "bg-[#23293a] border-[#2d3448]" : "bg-white border-gray-100"
      }`}
    >
      <div>
        <h5 className="mb-3 text-2xl font-semibold text-primary/90 tracking-tight dark:text-primary/90 text-primary">
          {name}
        </h5>
        <p
          className={`mb-3 text-sm ${
            isDark ? "text-gray-300" : "text-gray-800"
          } flex items-center`}
        >
          <span className="font-medium flex items-center">
            <svg
              className="inline-block mr-1 mb-0.5"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isDark ? "#d1d5db" : "#374151"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {lng === "jp" ? "日付 ー " : "Date - "}
          </span>
          <span className="ml-2">{meta}</span>
        </p>
        <p
          className={`mb-6 text-base leading-relaxed flex-1 ${
            isDark ? "text-gray-300" : "text-gray-800"
          } flex items-start`}
        >
          <svg
            className="inline-block mr-2 mb-1 flex-shrink-0"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isDark ? "#d1d5db" : "#374151"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 17H7a4 4 0 0 1 4-4V7a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4z" />
            <path d="M17 17h-2a4 4 0 0 1 4-4V7a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4z" />
          </svg>
          {text}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleDownloadCertificate}
          className={`group relative inline-flex items-center justify-center h-12 w-12 rounded-full border-2 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/40 hover:scale-110 hover:shadow-xl ${
            isDark
              ? "border-[#434b63] bg-[#23293a] hover:border-primary"
              : "border-primary bg-gray-50 hover:border-primary"
          }`}
          title="Download"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={`w-7 h-7 ${
              isDark ? "text-gray-300" : "text-primary"
            } group-hover:text-primary`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5v10"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 15l6 4 6-4"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Review;
