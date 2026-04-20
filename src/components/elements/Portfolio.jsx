"use client";

import FsLightbox from "fslightbox-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { RiFileTextLine, RiExternalLinkLine, RiStarFill } from "react-icons/ri";
import { Portal } from "react-portal";
import { imageLoader, shimmer, toBase64 } from "../../lib/utils";
import i18next from "@/i18n";

const Portfolio = ({
  portfolio: {
    title_en,
    title_jp,
    subtitle_en,
    subtitle_jp,
    coverimage,
    coverimage_en,
    coverimage_jp,
    imagegallery,
    videogallery,
    url,
    featured,
  },
}) => {
  const [videoGalleryOpen, setVideoGalleryOpen] = useState(false);
  const [imageGalleryOpen, setImageGalleryOpen] = useState(false);
  const [lng, setLng] = useState(i18next.language);
  useEffect(() => {
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  const selectedImage =
    imagegallery && imagegallery.length > 1
      ? lng === "jp"
        ? imagegallery[1]
        : imagegallery[0]
      : imagegallery && imagegallery[0];

  const title = lng === "jp" ? title_jp : title_en;
  const subtitle = lng === "jp" ? subtitle_jp : subtitle_en;

  const coverSrc =
    coverimage_en && coverimage_jp
      ? lng === "jp"
        ? coverimage_jp
        : coverimage_en
      : coverimage;

  return (
    <motion.div
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className={`portfolio card group relative flex h-full w-full flex-col p-4 transition-all duration-300 md:p-5 ${
        featured
          ? "border-primary/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
          : "hover:border-white/[0.12] hover:shadow-lg hover:shadow-primary/5"
      }`}
    >
      {featured && (
        <div className="absolute -top-px right-4 z-10 flex items-center gap-1 rounded-b-md bg-primary px-2 py-1 text-[10px] font-medium text-white">
          <RiStarFill className="text-xs" />
          Featured
        </div>
      )}

      <div className="portfolio-top relative aspect-[550/384] w-full shrink-0 overflow-hidden rounded-lg">
        <div className="portfolio-image fiximage absolute inset-0 blur-0 filter transition-all duration-500 group-hover:blur-[2px] group-hover:scale-105">
          <Image
            key={coverSrc}
            loader={imageLoader}
            unoptimized={true}
            src={coverSrc}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={title}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(550, 384))}`}
            className="object-cover"
          />
        </div>
        <div className="portfolio-hovercontent absolute left-0 top-0 z-20 flex h-full w-full -translate-x-full transform items-center justify-center gap-4 overflow-hidden bg-black/30 backdrop-blur-sm transition-all duration-500 group-hover:translate-x-0">
          {imagegallery && imagegallery.length > 0 && (
            <button
              className="inline-flex h-10 min-h-0 w-10 items-center justify-center rounded-full border-0 bg-primary p-0 text-center text-lg text-white transition-transform duration-300 hover:scale-110"
              onClick={() => setImageGalleryOpen((prev) => !prev)}
            >
              <RiFileTextLine />
            </button>
          )}
          {url && url !== false && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 min-h-0 w-10 items-center justify-center rounded-full border-0 bg-white/20 p-0 text-center text-lg text-white backdrop-blur transition-transform duration-300 hover:scale-110 hover:bg-primary"
            >
              <RiExternalLinkLine />
            </a>
          )}
        </div>
      </div>
      <div className="portfolio-content mt-4 flex min-h-0 flex-1 flex-col">
        <h5 className="mb-1 text-sm font-semibold transition-colors duration-300 group-hover:text-primary">
          {title}
        </h5>
        <p className="mb-0 line-clamp-2 min-h-[2.5rem] text-xs leading-relaxed text-body/60">
          {subtitle}
        </p>
      </div>
      {imagegallery && (
        <Portal>
          <FsLightbox
            toggler={imageGalleryOpen}
            sources={selectedImage ? [selectedImage] : []}
          />
        </Portal>
      )}
      {videogallery && (
        <Portal>
          <FsLightbox toggler={videoGalleryOpen} sources={videogallery} />
        </Portal>
      )}
    </motion.div>
  );
};

export default Portfolio;
