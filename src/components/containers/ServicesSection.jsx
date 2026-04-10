"use client";

import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getServices } from "../../fetchers";
import { staggerContainer, staggerItem } from "../../lib/motion";
import { Service } from "../elements";
import i18next from "i18next";
import { useEffect, useState } from "react";

const ServicesSection = () => {
  const { data } = useQuery("services", getServices);
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
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer(0.12)}
      className="services-wrapper grid grid-cols-3 gap-7"
    >
      {data?.map((service) => (
        <motion.div
          variants={staggerItem}
          className="col-span-3 lg:col-span-1"
          key={service.id}
        >
          <Service
            service={{
              ...service,
              title: lng === "jp" ? service.title_jp : service.title_en,
              text: lng === "jp" ? service.text_jp : service.text_en,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ServicesSection;
