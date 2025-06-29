"use client";

import FsLightbox from "fslightbox-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { RiFileTextLine } from "react-icons/ri";
import { Portal } from "react-portal";
import { imageLoader, shimmer, toBase64 } from "../../lib/utils";
import i18next from "i18next";

const Portfolio = ({
  portfolio: {
    title_en,
    title_jp,
    subtitle_en,
    subtitle_jp,
    coverimage,
    imagegallery,
    videogallery,
    url,
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

  return (
    <div className="portfolio card hovercard group p-4 md:p-5">
      <div className="portfolio-top relative overflow-hidden">
        <div className="portfolio-image fiximage blur-0 filter transition-all duration-500 group-hover:blur-[2px]">
          <Image
            loader={imageLoader}
            unoptimized={true}
            src={coverimage}
            height={384}
            width={550}
            alt={lng === "jp" ? title_jp : title_en}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(550, 384)
            )}`}
          />
        </div>
        <div className="portfolio-hovercontent absolute left-0 top-0 z-20 flex h-full w-full -translate-x-full transform items-center justify-center gap-4 overflow-hidden backdrop-blur-sm transition-all duration-500 group-hover:translate-x-0">
          {imagegallery.length ? (
            <button
              className="inline-flex h-10 min-h-0 w-10 items-center justify-center rounded-full bg-primary p-0 text-center text-lg text-grey"
              onClick={() => setImageGalleryOpen((prev) => !prev)}
            >
              <RiFileTextLine />
            </button>
          ) : null}
        </div>
      </div>
      <div className="portfolio-content mt-4 cursor-pointer">
        <h5 className="mb-0">{lng === "jp" ? title_jp : title_en}</h5>
        <p>{lng === "jp" ? subtitle_jp : subtitle_en}</p>
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
    </div>
  );
};

export default Portfolio;
