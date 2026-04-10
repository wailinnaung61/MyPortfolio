"use client";

import { getInformation } from "@/fetchers";
import { blurFadeLeft, blurFadeRight } from "@/lib/motion";
import { shimmer, toBase64 } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useQuery } from "react-query";
import i18next from "i18next";
import { useEffect, useState } from "react";
import {
  RiMapPinLine,
  RiTranslate2,
  RiCheckboxCircleLine,
  RiBriefcaseLine,
  RiDownloadLine,
  RiGlobalLine,
} from "react-icons/ri";

const AboutSection = () => {
  const { data } = useQuery("information", getInformation);
  const [lng, setLng] = useState(i18next.language);

  useEffect(() => {
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  if (!data) return null;

  const fullName = data[`fullName_${lng}`] || data.fullName;
  const bio = data[`bio_${lng}`] || data.bio;
  const nationality = data[`nationality_${lng}`] || data.nationality;
  const address = data[`address_${lng}`] || data.address;
  const freelance = data[`freelance_${lng}`] || data.freelance;
  const languages = (data.languages && data.languages[lng]) || [];

  const handleDownloadAll = () => {
    const files = [
      "/ウェイリンアウン_履歴書.pdf",
      "/ウェイリンアウン職務経歴書.pdf",
    ];
    files.forEach((file) => {
      const link = document.createElement("a");
      link.href = file;
      link.download = file.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const infoCards = [
    {
      icon: RiMapPinLine,
      label: lng === "jp" ? "所在地" : "Location",
      value: address,
    },
    {
      icon: RiGlobalLine,
      label: lng === "jp" ? "国籍" : "Nationality",
      value: nationality,
    },
    {
      icon: RiTranslate2,
      label: lng === "jp" ? "言語" : "Languages",
      value: languages.join(", "),
    },
    {
      icon: RiBriefcaseLine,
      label: lng === "jp" ? "経験" : "Experience",
      value: lng === "jp" ? "7年以上" : "7+ Years",
    },
    {
      icon: RiCheckboxCircleLine,
      label: lng === "jp" ? "フリーランス" : "Freelance",
      value: freelance,
    },
  ];

  return (
    <div className="grid grid-cols-2 items-center gap-10 lg:gap-16">
      <div className="col-span-2 lg:col-span-1">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={blurFadeLeft}
          className="relative"
        >
          <div className="relative mx-auto max-w-[500px]">
            {/* Glow behind image */}
            <div
              className="absolute -inset-4 rounded-2xl opacity-20 blur-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(16,185,129,0.3), rgba(20,184,166,0.2))",
              }}
              aria-hidden="true"
            />
            <div className="about-image relative overflow-hidden rounded-2xl border border-white/[0.08]">
              <Image
                src={data.largeImage}
                height={500}
                width={660}
                alt={fullName}
                className="object-cover"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(660, 500))}`}
              />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="col-span-2 lg:col-span-1">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={blurFadeRight}
          className="about-content"
        >
          <h3 className="mb-2">
            {lng === "jp" ? "こんにちは、私は" : "Hi, I am"}{" "}
            <span className="gradient-text">{fullName}</span>
          </h3>
          <p className="mb-6 text-lg leading-relaxed text-body">{bio}</p>

          {/* Info Grid */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {infoCards.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 backdrop-blur-sm"
              >
                <item.icon className="mb-1.5 text-lg text-primary" />
                <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-body/40">
                  {item.label}
                </p>
                <p className="mb-0 text-sm font-medium text-heading">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn inline-flex items-center gap-2"
            onClick={handleDownloadAll}
          >
            <RiDownloadLine className="relative z-10" />
            <span>
              {lng === "jp" ? "履歴書をダウンロード" : "Download Resume"}
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
