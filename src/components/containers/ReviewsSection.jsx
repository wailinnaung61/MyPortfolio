"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getCertificates } from "../../fetchers";
import { Review } from "../elements";
import i18next from "@/i18n";

const ReviewsSection = () => {
  const { data } = useQuery("certificates", getCertificates);

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handleDownloadAll = () => {
    // Download only the combined PDF file
    const link = document.createElement("a");
    link.href = "/certificates/all-certificates.pdf";
    link.download = "all-certificates.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [lng, setLng] = useState(
    i18next.language ||
      (typeof window !== "undefined"
        ? window.localStorage.getItem("i18nextLng")
        : "en")
  );
  useEffect(() => {
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    // Also check localStorage in case language is set there
    if (typeof window !== "undefined") {
      const storedLng = window.localStorage.getItem("i18nextLng");
      if (storedLng && storedLng !== lng) setLng(storedLng);
    }
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  if (!data) return null;

  return (
    <div className="swiper-holder">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={28}
        slidesPerView={3}
        autoplay={{
          delay: 4000,
        }}
        centerInsufficientSlides={true}
        ref={sliderRef}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {data?.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="slider-item">
              <Review review={review} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "1rem",
          marginTop: "1rem",
        }}
      >
        <button className="btn" onClick={handleDownloadAll}>
          <span>{lng === "jp" ? "すべてダウンロード" : "Download All"}</span>
        </button>
      </div>
      <button
        className={`swiper-button-prev ${
          document.documentElement.classList.contains("dark") ? "dark" : "light"
        }`}
        onClick={handlePrev}
      ></button>
      <button
        className={`swiper-button-next ${
          document.documentElement.classList.contains("dark") ? "dark" : "light"
        }`}
        onClick={handleNext}
      ></button>
    </div>
  );
};

export default ReviewsSection;
