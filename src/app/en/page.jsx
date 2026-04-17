"use client";

import i18next from "@/i18n";
import {
  AboutSection,
  ContactSection,
  FeaturedProject,
  HeroSection,
  PortfoliosSection,
  ResumeSection,
  ReviewsSection,
  ServicesSection,
  SkillsSection,
} from "@/components/containers";
import { SectionHeading } from "@/components/utils";
import SectionWrapper from "@/components/utils/SectionWrapper";
import React from "react";
import BlogSection from "../_components/BlogSection";

const HomepageEn = () => {
  const [lng, setLng] = React.useState("en");
  const [mounted, setMounted] = React.useState(false);
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    setMounted(true);
    i18next.changeLanguage("en");
    window.localStorage.setItem("i18nextLng", "en");
    document.documentElement.lang = "en";

    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);

    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts.json");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    document.title =
      lng === "en"
        ? "Wai Linn Aung — Full-Stack Developer"
        : "ウェイ・リン・アウン — フルスタック開発者";
  }, [lng]);

  const t = (key) => i18next.t(key, { lng: "en", ns: "common" });

  if (!mounted) return null;

  return (
    <React.Fragment>
      <SectionWrapper name="section-home">
        <HeroSection />
      </SectionWrapper>

      <SectionWrapper name="section-about" className="about-section pt-24 lg:pt-28 xl:pt-32">
        <div className="container mx-auto">
          <SectionHeading animated={false} title={t("aboutme")} watermark={t("about")} />
          <AboutSection />
        </div>
      </SectionWrapper>

      <SectionWrapper name="section-featured" className="featured-section pt-24 lg:pt-28 xl:pt-32">
        <div className="container mx-auto">
          <SectionHeading animated={false} title={t("featuredproject")} watermark={t("featured")} />
          <FeaturedProject />
        </div>
      </SectionWrapper>

      <SectionWrapper name="section-skills" className="skills-section pt-24 lg:pt-28 xl:pt-32">
        <div className="container mx-auto">
          <SectionHeading animated={false} title={t("myskills")} watermark={t("skills")} />
          <SkillsSection />
        </div>
      </SectionWrapper>

      <SectionWrapper name="section-reviews" className="reviews-section pt-24 lg:pt-28 xl:pt-32">
        <div className="container mx-auto">
          <SectionHeading animated={false} title={t("clientreviews")} watermark={t("reviews")} />
          <ReviewsSection />
        </div>
      </SectionWrapper>

      <SectionWrapper name="section-service" className="services-section pt-24 lg:pt-28 xl:pt-32">
        <div className="container mx-auto">
          <SectionHeading animated={false} title={t("myservices")} watermark={t("services")} />
          <ServicesSection />
        </div>
      </SectionWrapper>

      <SectionWrapper name="section-portfolios" className="portfolios-section pt-24 lg:pt-28 xl:pt-32">
        <div className="container mx-auto">
          <SectionHeading animated={false} title={t("myworks")} watermark={t("portfolio")} />
          <PortfoliosSection />
        </div>
      </SectionWrapper>

      <SectionWrapper name="section-resume" className="resume-section pt-24 lg:pt-28 xl:pt-32">
        <div className="container mx-auto">
          <SectionHeading animated={false} title={t("myresume")} watermark={t("resume")} />
          <ResumeSection />
        </div>
      </SectionWrapper>

      <SectionWrapper name="section-blog" className="news-section pt-24 lg:pt-28 xl:pt-32">
        <div className="container mx-auto">
          <SectionHeading animated={false} title={t("latestblogs")} watermark={t("blogs")} />
          <BlogSection posts={posts} />
        </div>
      </SectionWrapper>

      <SectionWrapper name="section-contact" className="contact-section pt-24 lg:pt-28 xl:pt-32">
        <div className="container mx-auto">
          <SectionHeading animated={false} title={t("contactus")} watermark={t("contact")} />
          <ContactSection />
        </div>
      </SectionWrapper>

      <span className="block pb-24 lg:pb-28 xl:pb-32"></span>
    </React.Fragment>
  );
};

export default HomepageEn;
