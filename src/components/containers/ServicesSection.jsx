"use client";

import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getServices } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
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
    <div className="services-wrapper grid grid-cols-3 gap-7">
      {data?.map((service, index) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
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
    </div>
  );
};

export default ServicesSection;
