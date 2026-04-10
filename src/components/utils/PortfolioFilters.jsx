"use client";

import { useQuery } from "react-query";
import { getPortfolioFilters } from "../../fetchers";
import { useEffect, useState } from "react";
import i18next from "i18next";

const PortfolioFilters = ({ currentFilter, filterHandler }) => {
  const { data } = useQuery("portfolio-filters", getPortfolioFilters);
  const [lng, setLng] = useState(i18next.language);

  useEffect(() => {
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  if (!data) return null;

  return (
    <div className="portfolio-filters flex flex-wrap justify-center gap-2">
      <button
        type="button"
        className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
          currentFilter === ""
            ? "border-primary/30 bg-primary/10 text-primary"
            : "border-white/[0.08] bg-white/[0.03] text-body hover:border-primary/20 hover:text-primary"
        }`}
        onClick={() => filterHandler("")}
      >
        {lng === "jp" ? "全て" : "All"}
      </button>
      {data?.map((filter) => (
        <button
          type="button"
          className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
            currentFilter === filter.value
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-white/[0.08] bg-white/[0.03] text-body hover:border-primary/20 hover:text-primary"
          }`}
          onClick={() => filterHandler(filter.value)}
          key={filter.id}
        >
          {lng === "jp" ? filter.title_jp : filter.title_en}
        </button>
      ))}
    </div>
  );
};

export default PortfolioFilters;
