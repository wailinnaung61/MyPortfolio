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
    <div className="portfolio-filters flex flex-wrap justify-center gap-4">
      <button
        className={`btn btn-small ${
          currentFilter === "" ? "" : "btn-transparent"
        }`}
        onClick={() => filterHandler("")}
      >
        <span>{lng === "jp" ? "全て" : "All"}</span>
      </button>
      {data?.map((filter) => (
        <button
          className={`btn btn-small ${
            currentFilter === filter.value
              ? "before:invisible"
              : "btn-transparent"
          }`}
          onClick={() => filterHandler(filter.value)}
          key={filter.id}
        >
          <span>{lng === "jp" ? filter.title_jp : filter.title_en}</span>
        </button>
      ))}
    </div>
  );
};

export default PortfolioFilters;
