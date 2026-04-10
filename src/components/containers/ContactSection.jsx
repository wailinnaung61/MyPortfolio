"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RiMailLine, RiMapPinLine, RiPhoneLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { getInformation } from "../../fetchers";
import { blurFadeLeft, blurFadeRight, staggerContainer, staggerItem } from "../../lib/motion";
import ContactForm from "./ContactForm";
import i18next from "i18next";
import { useEffect, useState } from "react";

const ContactSection = () => {
  const { data } = useQuery("information", getInformation);
  const [lng, setLng] = useState(i18next.language);

  useEffect(() => {
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  if (!data) return null;

  return (
    <div className="grid grid-cols-9 gap-7">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={blurFadeLeft}
        className="col-span-9 lg:col-span-4"
      >
        <div className="contact-information">
          <h4>{lng === "jp" ? "連絡先情報" : "Contact Information"}</h4>
          <p>
            {lng === "jp"
              ? "ご連絡先を入力してください。折り返しご連絡いたします。"
              : "Please enter your contact details below so I can get in touch with you:"}
          </p>
          <span className="inline-block h-1 w-20 rounded-full bg-primary bg-opacity-20"></span>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer(0.15)}
            className="contact-blocks mt-5 space-y-5"
          >
            <motion.div variants={staggerItem} className="contact-block card flex p-4 md:p-5 transition-all duration-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
              <span className="icon mr-4 inline-flex h-16 w-16 shrink-0 grow-0 basis-16 items-center justify-center rounded-full bg-primary bg-opacity-10 text-3xl text-primary">
                <RiPhoneLine />
              </span>
              <div className="content">
                <h5 className="mb-2">
                  {lng === "jp" ? "電話で連絡" : "Contact on phone"}
                </h5>
                {data.phoneNumbers.map((number, index) => (
                  <p className="mb-0" key={index}>
                    <Link
                      href={`tel:${number.split("-").join("")}`}
                      className="no-underline"
                    >
                      {number}
                    </Link>
                  </p>
                ))}
              </div>
            </motion.div>
            <motion.div variants={staggerItem} className="contact-block card flex p-4 md:p-5 transition-all duration-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
              <span className="icon mr-4 inline-flex h-16 w-16 shrink-0 grow-0 basis-16 items-center justify-center rounded-full bg-primary bg-opacity-10 text-3xl text-primary">
                <RiMailLine />
              </span>
              <div className="content">
                <h5 className="mb-2">
                  {lng === "jp" ? "メールで連絡" : "Contact on mail"}
                </h5>
                {data.emailAddress.map((email, index) => (
                  <p className="mb-0" key={index}>
                    <Link href={`mailto:${email}`} className="no-underline">
                      {email}
                    </Link>
                  </p>
                ))}
              </div>
            </motion.div>
            <motion.div variants={staggerItem} className="contact-block card flex p-4 md:p-5 transition-all duration-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
              <span className="icon mr-4 inline-flex h-16 w-16 shrink-0 grow-0 basis-16 items-center justify-center rounded-full bg-primary bg-opacity-10 text-3xl text-primary">
                <RiMapPinLine />
              </span>
              <div className="content">
                <h5 className="mb-2">
                  {lng === "jp" ? "住所" : "Contact address"}
                </h5>
                <p className="mb-0 break-words whitespace-pre-line">
                  {lng === "jp" ? data.address_jp : data.address_en}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={blurFadeRight}
        className="col-span-9 lg:col-span-5"
      >
        <ContactForm />
      </motion.div>
    </div>
  );
};

export default ContactSection;
