"use client";

import { motion } from "framer-motion";
import { RiBookLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { getEducationBackground } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
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
      <h4>
        <RiBookLine className="mr-2 inline-block text-primary" />
        {lng === "jp" ? "学歴" : "Educational Qualification"}
      </h4>
      {data?.map((timeline, index) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
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
    </div>
  );
};

export default EducationTimeline;
