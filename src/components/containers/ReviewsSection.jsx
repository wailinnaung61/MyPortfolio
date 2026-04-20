"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCertificates } from "../../fetchers";
import { staggerContainer, staggerScaleItem, fadeUp } from "../../lib/motion";
import { Review } from "../elements";
import i18next from "@/i18n";
import { RiShieldCheckLine, RiDownloadLine } from "react-icons/ri";
import JSZip from "jszip";

const categoryConfig = {
  education: {
    en: "Education",
    jp: "学歴",
  },
  aws: {
    en: "AWS Certifications",
    jp: "AWS認定資格",
    highlight: true,
  },
  professional: {
    en: "Professional Certifications",
    jp: "プロフェッショナル認定",
  },
  programming: {
    en: "Programming Certifications",
    jp: "プログラミング認定",
  },
  language: {
    en: "Language & Other",
    jp: "語学・その他",
  },
  recommendation: {
    en: "Recommendations",
    jp: "推薦状",
  },
  other: {
    en: "Other",
    jp: "その他",
  },
};

/** "other" is grouped under the language pill (label is "Language & Other") */
const categoryOrder = [
  "education",
  "aws",
  "professional",
  "programming",
  "language",
  "recommendation",
];

const ReviewsSection = () => {
  const { data } = useQuery("certificates", getCertificates);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  const [lng, setLng] = useState(
    i18next.language ||
      (typeof window !== "undefined"
        ? window.localStorage.getItem("i18nextLng")
        : "en"),
  );

  useEffect(() => {
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);

    if (typeof window !== "undefined") {
      const storedLng = window.localStorage.getItem("i18nextLng");
      if (storedLng && storedLng !== lng) {
        setLng(storedLng);
      }
    }

    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  const handleDownloadAll = async () => {
    if (!data?.length || isDownloadingAll) return;

    const certFiles = data.map((cert) => cert?.certificateFile).filter(Boolean);

    if (!certFiles.length) return;

    setIsDownloadingAll(true);

    try {
      const zip = new JSZip();

      await Promise.all(
        certFiles.map(async (fileName) => {
          const safeName = String(fileName);
          const fileUrl = `/certificates/${encodeURIComponent(safeName)}`;
          const response = await fetch(fileUrl);
          if (!response.ok) return;
          const fileBlob = await response.blob();
          zip.file(safeName, fileBlob);
        }),
      );

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = zipUrl;
      link.download = "all-certificates.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(zipUrl);
    } finally {
      setIsDownloadingAll(false);
    }
  };

  if (!data) return null;

  const grouped = {};
  data.forEach((cert) => {
    const cat = cert.category || "other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(cert);
  });

  const languageAndOtherCount =
    (grouped.language?.length || 0) + (grouped.other?.length || 0);

  const filterOptions = [
    { value: "all", label: lng === "jp" ? "全て" : "All" },
    ...categoryOrder
      .filter((cat) => {
        if (cat === "language") return languageAndOtherCount > 0;
        return grouped[cat]?.length > 0;
      })
      .map((cat) => ({
        value: cat,
        label: categoryConfig[cat]?.[lng] || categoryConfig[cat]?.en || cat,
        count:
          cat === "language"
            ? languageAndOtherCount
            : grouped[cat]?.length || 0,
      })),
  ];

  const certMatchesFilter = (cert, filter) => {
    if (filter === "all") return true;
    const cat = cert.category || "other";
    if (filter === "language") return cat === "language" || cat === "other";
    return cat === filter;
  };

  const filteredData = data.filter((cert) =>
    certMatchesFilter(cert, activeFilter),
  );

  const awsCerts = data.filter((c) => c.category === "aws").slice(0, 3);
  const showAwsHighlightRow = activeFilter === "all";

  return (
    <div>
      {/* AWS Highlight Badges — only on "All" to avoid duplicating the grid when a category is selected */}
      {showAwsHighlightRow ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer(0.1)}
          className="mb-10 grid grid-cols-3 gap-4"
        >
          {awsCerts.map((cert) => {
            const name = cert[`name_${lng}`] || cert.name_en;
            return (
              <motion.div
                key={cert.id}
                variants={staggerScaleItem}
                className="col-span-3 sm:col-span-1"
              >
                <div className="group relative overflow-hidden rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.06] to-orange-500/[0.03] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/10">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                    <RiShieldCheckLine className="text-2xl text-amber-500" />
                  </div>
                  <h5 className="mb-1 text-sm font-semibold text-heading">
                    {name}
                  </h5>
                  <p className="text-xs text-body/50">{cert.meta}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : null}

      {/* Filter Pills */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filterOptions.map((opt) => (
          <button
            type="button"
            key={opt.value}
            onClick={() => setActiveFilter(opt.value)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
              activeFilter === opt.value
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-white/[0.08] bg-white/[0.03] text-body hover:border-primary/20 hover:text-primary"
            }`}
          >
            {opt.label}
            {opt.value !== "all" && typeof opt.count === "number" && (
              <span className="ml-1.5 text-body/40">({opt.count})</span>
            )}
          </button>
        ))}
      </div>

      {/* Certificate Grid — avoid whileInView once + stagger (same bug as portfolios) */}
      <div className="grid grid-cols-6 gap-4">
        <div className="contents">
          <AnimatePresence mode="popLayout">
            {filteredData.map((review) => (
              <motion.div
                key={`${activeFilter}-${review.id}`}
                layout={false}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  transition: { duration: 0.2 },
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-6 sm:col-span-3 lg:col-span-2"
              >
                <Review review={review} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Download All Button */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mt-8 text-center"
      >
        <button
          type="button"
          className="btn btn-transparent inline-flex items-center gap-2"
          onClick={handleDownloadAll}
          disabled={isDownloadingAll}
        >
          <RiDownloadLine className="relative z-10" />
          <span>
            {isDownloadingAll
              ? lng === "jp"
                ? "ZIP作成中..."
                : "Preparing ZIP..."
              : lng === "jp"
                ? `すべてZIPダウンロード (${data.length})`
                : `Download All ZIP (${data.length})`}
          </span>
        </button>
      </motion.div>
    </div>
  );
};

export default ReviewsSection;
