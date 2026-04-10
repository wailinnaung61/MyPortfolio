"use client";

import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getTechskills } from "../../fetchers";
import { staggerContainer, staggerScaleItem } from "../../lib/motion";
import i18next from "i18next";
import { useEffect, useState } from "react";
import {
  RiServerLine,
  RiCodeSSlashLine,
  RiCloudLine,
  RiDatabase2Line,
  RiGitBranchLine,
  RiSmartphoneLine,
} from "react-icons/ri";

const categoryIcons = {
  backend: RiServerLine,
  frontend: RiCodeSSlashLine,
  cloud: RiCloudLine,
  database: RiDatabase2Line,
  devops: RiGitBranchLine,
  mobile: RiSmartphoneLine,
};

const levelColors = {
  Expert: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
  Advanced: "text-primary border-primary/20 bg-primary/10",
  Intermediate: "text-amber-400 border-amber-400/20 bg-amber-400/10",
  Beginner: "text-body/60 border-white/10 bg-white/5",
};

const TechSkills = () => {
  const { data } = useQuery("tech-skills", getTechskills);
  const [lng, setLng] = useState(i18next.language);

  useEffect(() => {
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  if (!data) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer(0.08)}
      className="grid grid-cols-6 gap-4"
    >
      {data?.map((skill) => {
        const Icon = categoryIcons[skill.category] || RiCodeSSlashLine;
        const title = lng === "jp" ? skill.title_jp : skill.title_en;
        const level = lng === "jp" ? skill.level_jp : skill.level;
        const colorClass = levelColors[skill.level] || levelColors.Intermediate;

        return (
          <motion.div
            variants={staggerScaleItem}
            className="col-span-6 sm:col-span-3 lg:col-span-2"
            key={skill.id}
          >
            <div className="card group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                  <Icon className="text-xl" />
                </div>
                <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${colorClass}`}>
                  {level}
                </span>
              </div>

              <h5 className="mb-3 text-base font-semibold text-heading">{title}</h5>

              <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                />
              </div>

              {skill.items && (
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-white/[0.04] px-2 py-0.5 text-xs text-body/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default TechSkills;
