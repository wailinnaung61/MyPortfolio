"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RiArrowDownLine, RiDownloadLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { Link } from "react-scroll";
import { TypeAnimation } from "react-type-animation";
import { getInformation } from "../../fetchers";
import { heroName, heroSubtitle, heroBio, heroCTA, heroSocial } from "../../lib/motion";
import { shimmer, toBase64 } from "../../lib/utils";
import { SocialIcons } from "../elements";
import i18next from "i18next";
import { useEffect, useState } from "react";

const HeroSection = ({ blurred, scroll = true, typed = true }) => {
  const { data } = useQuery("information", getInformation);
  const [lng, setLng] = useState(i18next.language);

  useEffect(() => {
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  if (!data) return null;

  const fullName = data[`fullName_${lng}`] || data.fullName;
  const bio = data[`bio_${lng}`] || data.bio;

  const handleDownloadAll = () => {
    const files = [
      "/ウェイリンアウン_履歴書.pdf",
      "/ウェイリンアウン職務経歴書.pdf",
      "/certificates/degree.pdf",
    ];
    files.forEach((file) => {
      const link = document.createElement("a");
      link.href = file;
      link.download = file.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="herosection relative overflow-hidden">
      {!blurred && (
        <div className="herosection-bg absolute left-0 top-0 h-full w-full"></div>
      )}
      <div
        className={`herosection-content relative z-20 bg-grey-darken ${
          blurred ? "bg-opacity-20" : "bg-opacity-90"
        }`}
      >
        {/* Gradient orbs for hero */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(16,185,129,0.4), transparent 70%)" }} />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full opacity-15 blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(20,184,166,0.4), transparent 70%)" }} />
        </div>

        <div className="container relative mx-auto">
          <div className="flex min-h-screen w-full items-center">
            <div className="grid w-full grid-cols-1 items-center gap-10 py-20 lg:grid-cols-2">
              {/* Left: Text content */}
              <div className="text-left">
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={heroSubtitle}
                  className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary"
                >
                  {lng === "jp" ? "フルスタックWeb開発者" : "Full-Stack Web Developer"}
                </motion.p>

                <motion.h1
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={heroName}
                  className="mb-2 text-4xl font-extrabold leading-tight text-heading sm:text-5xl lg:text-6xl"
                >
                  {lng === "jp" ? "こんにちは、" : "Hi, I'm"}{" "}
                  <span className="gradient-text">{fullName}</span>
                </motion.h1>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={heroSubtitle}
                  className="mb-6 h-8 text-xl text-body sm:text-2xl"
                >
                  {typed ? (
                    <TypeAnimation
                      key={lng}
                      sequence={[
                        lng === "jp" ? "フルスタックWeb開発者" : "Full-Stack Web Developer",
                        2000,
                        lng === "jp" ? "AWS認定エンジニア" : "AWS Certified Engineer",
                        2000,
                        lng === "jp" ? "Spendioの開発者" : "Creator of Spendio",
                        2000,
                      ]}
                      speed={30}
                      repeat={Infinity}
                      className="text-body/70"
                    />
                  ) : (
                    <span className="text-body/70">
                      {lng === "jp" ? "フルスタックWeb開発者" : "Full-Stack Web Developer"}
                    </span>
                  )}
                </motion.div>

                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={heroBio}
                  className="mb-8 max-w-lg text-lg leading-relaxed text-body"
                >
                  {bio}
                </motion.p>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={heroCTA}
                  className="mb-8 flex flex-wrap gap-4"
                >
                  <Link
                    activeClass="active"
                    to="section-portfolios"
                    spy={true}
                    smooth="easeInQuad"
                    offset={-74}
                    duration={1000}
                    className="btn cursor-pointer"
                  >
                    <span>{lng === "jp" ? "作品を見る" : "View My Work"}</span>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-transparent"
                    onClick={handleDownloadAll}
                  >
                    <span className="flex items-center gap-2">
                      <RiDownloadLine />
                      {lng === "jp" ? "履歴書" : "Resume"}
                    </span>
                  </button>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={heroSocial}
                >
                  <SocialIcons data={data.socialAddress} />
                </motion.div>
              </div>

              {/* Right: Profile image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative hidden lg:flex lg:justify-center"
              >
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full opacity-30 blur-2xl"
                    style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.4), rgba(20,184,166,0.3))" }}
                    aria-hidden="true" />
                  <div className="relative h-[320px] w-[320px] overflow-hidden rounded-full border-2 border-white/10 xl:h-[380px] xl:w-[380px]">
                    <Image
                      src={data.thumbImage}
                      alt={fullName}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(380, 380))}`}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {scroll ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={heroSocial}
              className="herosection-bottom absolute left-0 top-auto bottom-10 w-full justify-between text-center"
            >
              <Link
                activeClass="active"
                to="section-about"
                spy={true}
                smooth="easeInQuad"
                offset={-74}
                duration={1000}
                className="cursor-pointer text-xs font-medium uppercase tracking-widest text-body transition-all hover:text-primary"
              >
                <RiArrowDownLine className="inline animate-bounce text-base" />
                <span className="pl-2">{i18next.t("scrolldown", { lng })}</span>
              </Link>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
