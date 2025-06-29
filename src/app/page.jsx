"use client";

import i18next from "i18next";
import {
  AboutSection,
  ContactSection,
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

const Homepage2 = () => {
  const [lng, setLng] = React.useState(i18next.language || "en");
  const [mounted, setMounted] = React.useState(false);
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    setMounted(true);

    const storedLang = window.localStorage.getItem("i18nextLng") || "en";
    i18next.changeLanguage(storedLang); // 🔐 Force i18next to use stored language
    setLng(storedLang);

    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);

    return () => i18next.off("languageChanged", handleLangChange);
  }, []);
  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        // For client-side, fetch from public API files
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

  // Prevent hydration mismatch: do not render until mounted on client
  if (!mounted) return null;

  return (
    <React.Fragment>
      {/* Start Hero Section */}
      <SectionWrapper name="section-home">
        <HeroSection />
      </SectionWrapper>
      {/* End Hero Section */}

      {/* Start About Section */}
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
      {/* End About Section */}

      {/* Start Skills Section */}
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
      {/* End Skills Section */}

      {/* Start Service Section */}
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
      {/* End Service Section */}

      {/* Start Resume Section */}
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
      {/* End Resume Section */}

      {/* Start Portfolios Section */}
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
      {/* End Portfolios Section */}

      {/* Start Reviews Section */}
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
      {/* End Reviews Section */}

      {/* Start Blog Section */}
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
      {/* End Blog Section */}

      {/* Start Contact Section */}
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
      {/* End Contact Section */}

      <span className="block pb-24 lg:pb-28 xl:pb-32"></span>
    </React.Fragment>
  );
};

export default Homepage2;
