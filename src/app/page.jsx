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
import BlogSection from "./_components/BlogSection";

const Homepage = () => {
  const [lng, setLng] = React.useState(i18next.language || "jp");
  const [mounted, setMounted] = React.useState(false);
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    setMounted(true);

    const storedLang = window.localStorage.getItem("i18nextLng") || "jp";
    i18next.changeLanguage(storedLang);
    setLng(storedLang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = storedLang === "en" ? "en" : "ja";
    }

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
      }
    };
    fetchPosts();
  }, []);

  const t = (key) => i18next.t(key, { lng, ns: "common" });

  if (!mounted) return null;

  return (
    <React.Fragment>
      {/* Hero */}
      <SectionWrapper name="section-home">
        <HeroSection />
      </SectionWrapper>

      {/* About Me */}
      <SectionWrapper
        name="section-about"
        className="about-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            animated={false}
            title={t("aboutme")}
            watermark={t("about")}
          />
          <AboutSection />
        </div>
      </SectionWrapper>

      {/* Featured Project (Spendio) */}
      <SectionWrapper
        name="section-featured"
        className="featured-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            animated={false}
            title={t("featuredproject")}
            watermark={t("featured")}
          />
          <FeaturedProject />
        </div>
      </SectionWrapper>

      {/* Skills */}
      <SectionWrapper
        name="section-skills"
        className="skills-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            animated={false}
            title={t("myskills")}
            watermark={t("skills")}
          />
          <SkillsSection />
        </div>
      </SectionWrapper>

      {/* Certificates */}
      <SectionWrapper
        name="section-reviews"
        className="reviews-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            animated={false}
            title={t("clientreviews")}
            watermark={t("reviews")}
          />
          <ReviewsSection />
        </div>
      </SectionWrapper>

      {/* Services */}
      <SectionWrapper
        name="section-service"
        className="services-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            animated={false}
            title={t("myservices")}
            watermark={t("services")}
          />
          <ServicesSection />
        </div>
      </SectionWrapper>

      {/* Portfolio / Works */}
      <SectionWrapper
        name="section-portfolios"
        className="portfolios-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            animated={false}
            title={t("myworks")}
            watermark={t("portfolio")}
          />
          <PortfoliosSection />
        </div>
      </SectionWrapper>

      {/* Resume */}
      <SectionWrapper
        name="section-resume"
        className="resume-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            animated={false}
            title={t("myresume")}
            watermark={t("resume")}
          />
          <ResumeSection />
        </div>
      </SectionWrapper>

      {/* Blog */}
      <SectionWrapper
        name="section-blog"
        className="news-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            animated={false}
            title={t("latestblogs")}
            watermark={t("blogs")}
          />
          <BlogSection posts={posts} />
        </div>
      </SectionWrapper>

      {/* Contact */}
      <SectionWrapper
        name="section-contact"
        className="contact-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            animated={false}
            title={t("contactus")}
            watermark={t("contact")}
          />
          <ContactSection />
        </div>
      </SectionWrapper>

      <span className="block pb-24 lg:pb-28 xl:pb-32"></span>
    </React.Fragment>
  );
};

export default Homepage;
