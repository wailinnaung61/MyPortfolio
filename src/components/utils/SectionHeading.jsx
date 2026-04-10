"use client";

import i18next from "@/i18n";
import { headingReveal, dividerGrow } from "@/lib/motion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParallax } from "react-scroll-parallax";

const SectionHeading = ({ title, watermark, animated = true }) => {
  const [tTitle, setTTitle] = useState(title);
  const [tWatermark, setTWatermark] = useState(watermark);

  useEffect(() => {
    const lng = i18next.language || "jp";
    setTTitle(i18next.t(title));
    setTWatermark(i18next.t(watermark));
    const handleLanguageChanged = () => {
      setTTitle(i18next.t(title));
      setTWatermark(i18next.t(watermark));
    };
    i18next.on("languageChanged", handleLanguageChanged);
    return () => {
      i18next.off("languageChanged", handleLanguageChanged);
    };
  }, [title, watermark]);

  const parallax = useParallax({
    translateX: animated ? [-200, 200] : null,
    easing: "easeInOut",
  });

  return (
    <div className="section-heading relative overflow-hidden pb-14 text-center">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={headingReveal}
        className="relative z-10 mb-2 uppercase"
      >
        {tTitle}
      </motion.h2>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={dividerGrow}
        className="relative z-10 inline-block h-1.5 w-32 origin-left overflow-hidden rounded-full bg-primary bg-opacity-20"
      >
        <span className="absolute left-0 top-0 inline-block h-full w-1.5 animate-lefttoright rounded-full bg-primary"></span>
      </motion.span>
      <span
        ref={parallax.ref}
        className="pointer-events-none absolute left-1/2 -top-2 z-0 -translate-x-1/2 transform text-9xl font-bold uppercase text-heading opacity-5"
      >
        {tWatermark}
      </span>
    </div>
  );
};

export default SectionHeading;
