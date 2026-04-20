"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getPortfolios } from "../../fetchers";
import { Portfolio } from "../elements";
import { PortfolioFilters } from "../utils";
import i18next from "i18next";

const PAGE_SIZE = 6;

const PortfoliosSection = () => {
  const [visiblePortfolios, setVisiblePortfolios] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [lng, setLng] = useState(i18next.language);

  useEffect(() => {
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);
  const { data } = useQuery("portfolios", getPortfolios);

  const filteredSource = useMemo(() => {
    if (!data?.length) return [];
    if (currentFilter === "") return data;
    return data.filter(
      (p) => Array.isArray(p.filters) && p.filters.includes(currentFilter)
    );
  }, [data, currentFilter]);

  useEffect(() => {
    if (!data) return;
    setVisiblePortfolios(filteredSource.slice(0, pageNumber * PAGE_SIZE));
  }, [data, filteredSource, pageNumber]);

  const handleFilter = useCallback((value) => {
    setCurrentFilter(value);
    setPageNumber(1);
  }, []);

  const handleLoadmore = useCallback(() => {
    setPageNumber((n) => n + 1);
  }, []);

  const hasMore =
    Boolean(data?.length) && visiblePortfolios.length < filteredSource.length;

  if (!data) return null;

  return (
    <>
      <PortfolioFilters
        currentFilter={currentFilter}
        filterHandler={handleFilter}
      />
      {/*
        Do not use whileInView + once:true with variant stagger: after the first
        scroll-in the parent stays "visible" and newly mounted items (filter changes)
        stay stuck on the child's "hidden" variant. Per-item initial/animate fixes that.
      */}
      <div className="mt-12 grid grid-cols-6 gap-7">
        {visiblePortfolios?.map((portfolio) => (
          <motion.div
            key={`${currentFilter || "all"}-${portfolio.id}`}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-6 flex h-full w-full sm:col-span-3 lg:col-span-2"
          >
            <Portfolio portfolio={portfolio} />
          </motion.div>
        ))}
      </div>
      {hasMore ? (
        <div className="mt-12 text-center">
          <button className="btn btn-small" onClick={handleLoadmore}>
            <span>{lng === "jp" ? "もっと見る" : "Load More"}</span>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default PortfoliosSection;
