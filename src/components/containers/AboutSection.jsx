"use client";

import { getInformation } from "@/fetchers";
import { childrenAnimation } from "@/lib/motion";
import { shimmer, toBase64 } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useQuery } from "react-query";
import i18next from "i18next";
import { useEffect, useState } from "react";

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
  const firstName = data[`firstName_${lng}`] || data.firstName;
  const lastName = data[`lastName_${lng}`] || data.lastName;
  const bio = data[`bio_${lng}`] || data.bio;
  const nationality = data[`nationality_${lng}`] || data.nationality;
  const address = data[`address_${lng}`] || data.address;
  const freelance = data[`freelance_${lng}`] || data.freelance;
  const languages = (data.languages && data.languages[lng]) || [];

  return (
    <div className="grid grid-cols-2 items-center gap-7">
      <div className="col-span-2 lg:col-span-1">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          variants={childrenAnimation}
          className="about-image overflow-hidden rounded-lg"
        >
          <div className="about-image-inner fiximage relative border-10 border-primary border-opacity-20">
            <span className="absolute -top-2.5 left-0 z-10 h-2.5 w-10 animate-ledgerleftright rounded-full bg-gradient-to-r from-transparent to-primary"></span>
            <span className="absolute top-auto -bottom-2.5 left-auto z-10 h-2.5 w-10 animate-ledgerrightleft rounded-full bg-gradient-to-r from-primary to-transparent"></span>
            <span className="absolute -left-2.5 top-auto z-10 h-10 w-2.5 animate-ledgerbottomtop rounded-full bg-gradient-to-t from-transparent to-primary"></span>
            <span className="absolute left-auto -right-2.5 z-10 h-10 w-2.5 animate-ledgertopbottom rounded-full bg-gradient-to-b from-transparent to-primary"></span>
            <Image
              src={data.largeImage}
              height={422}
              width={660}
              alt={fullName}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(660, 422)
              )}`}
            />
          </div>
        </motion.div>
      </div>
      <div className="col-span-2 lg:col-span-1">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          variants={childrenAnimation}
          className="about-content"
        >
          <h3>
            {lng === "jp" ? "こんにちは、私は" : "Hi, I am"}{" "}
            <span className="text-primary">{fullName}</span>
          </h3>
          <ul className="styledlist">
            {firstName && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  {lng === "jp" ? "名" : "First Name"}{" "}
                </strong>
                : {firstName}
              </li>
            )}
            {lastName && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  {lng === "jp" ? "姓" : "Last Name"}{" "}
                </strong>
                : {lastName}
              </li>
            )}
            {data.age && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  {lng === "jp" ? "年齢" : "Age"}{" "}
                </strong>
                : {data.age} {lng === "jp" ? "歳" : "years"}
              </li>
            )}
            {nationality && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  {lng === "jp" ? "国籍" : "Nationality"}{" "}
                </strong>
                : {nationality}
              </li>
            )}
            {languages.length ? (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  {lng === "jp" ? "言語" : "Languages"}{" "}
                </strong>
                : {languages.join(", ")}
              </li>
            ) : null}
            {address && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium align-top">
                  {lng === "jp" ? "住所" : "Address"}
                </strong>
                <span className="break-words whitespace-pre-line align-top">
                  : {address}
                </span>
              </li>
            )}
            {freelance && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  {lng === "jp" ? "フリーランス" : "Freelance"}{" "}
                </strong>
                : {freelance}
              </li>
            )}
          </ul>
          <a href="/resume.pdf" className="btn mt-3">
            <span>
              {lng === "jp" ? "履歴書をダウンロード" : "Download Resume"}
            </span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
