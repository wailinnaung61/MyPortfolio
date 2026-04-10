"use client";

import { motion } from "framer-motion";
import { RiBookLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { getEducationBackground } from "../../fetchers";
import { staggerContainer, staggerItem, fadeUp } from "../../lib/motion";
import { TimelineItem } from "../elements";
import i18next from "i18next";
import { useEffect, useState } from "react";

const EducationTimeline = () => {
  const { data } = useQuery("education-background", getEducationBackground);
  const [lng, setLng] = useState(i18next.language);

  useEffect(() => {
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  if (!data) return null;

  return (
    <div className="education-timeline">
      <motion.h4
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <RiBookLine className="mr-2 inline-block text-primary" />
        {lng === "jp" ? "学歴" : "Educational Qualification"}
      </motion.h4>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer(0.12)}
      >
        {data?.map((timeline) => (
          <motion.div
            variants={staggerItem}
            className="timeline-wrap"
            key={timeline.id}
          >
            <TimelineItem
              timeline={{
                ...timeline,
                title: lng === "jp" ? timeline.title_jp : timeline.title_en,
                meta: lng === "jp" ? timeline.meta_jp : timeline.meta_en,
                text: lng === "jp" ? timeline.text_jp : timeline.text_en,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default EducationTimeline;
