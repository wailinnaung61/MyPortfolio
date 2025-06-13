"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RiArrowDownLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { Link } from "react-scroll";
import ReactTyped from "react-typed";
import { getInformation } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
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

  return (
    <div className="herosection relative overflow-hidden">
      {!blurred && (
        <div className="herosection-bg absolute left-0 top-0 h-full w-full"></div>
      )}
      <div
        className={`herosection-content relative z-20 bg-grey-darken  ${
          blurred ? "bg-opacity-20" : "bg-opacity-90"
        }`}
      >
        <div className="container relative mx-auto">
          <div className="flex min-h-screen w-full items-center justify-center">
            <div className="herosection-content w-full py-20 text-center md:w-3/4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                variants={childrenAnimation}
                className="herosection-imagewrapper relative mb-5 inline-block overflow-hidden rounded-full align-middle"
              >
                <span className="herosection-imageanimation absolute left-0 top-0 z-10 h-full w-full animate-spin rounded-full bg-gradient-to-tr from-primary to-transparent"></span>
                <div className="herosection-image fiximage relative z-20 inline-block h-[150px] w-[150px] overflow-hidden rounded-full border-6 border-primary border-opacity-10 align-middle">
                  <Image
                    src={data.thumbImage}
                    alt={data.fullName}
                    height={150}
                    width={150}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(150, 150)
                    )}`}
                  />
                </div>
              </motion.div>
              <motion.h1
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                variants={childrenAnimation}
                className="mb-5 text-heading"
              >
                <span className="block sm:inline">
                  {lng === "jp" ? "こんにちは、私は" : "Hi, I am"}
                </span>{" "}
                {typed ? (
                  <ReactTyped
                    loop
                    typeSpeed={100}
                    backSpeed={20}
                    backDelay={2000}
                    strings={[
                      fullName,
                      lng === "jp"
                        ? "フルスタック開発者"
                        : "Full-stack Developer",
                      lng === "jp" ? "ウェブ開発者" : "Web Developer",
                    ]}
                    className="text-primary"
                  />
                ) : (
                  <span className="text-primary">{fullName}</span>
                )}
              </motion.h1>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                variants={childrenAnimation}
                className="lead mb-0"
              >
                {bio}
              </motion.p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
                variants={childrenAnimation}
                className="herosection-socialicons mt-7 text-center"
              >
                <SocialIcons data={data.socialAddress} />
              </motion.div>
            </div>
          </div>
          {scroll ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1 }}
              variants={childrenAnimation}
              className="herosection-bottom absolute left-0 top-auto bottom-10 w-full justify-between text-center"
            >
              <Link
                activeClass="active"
                to="section-about"
                spy={true}
                smooth="easeInQuad"
                offset={-74}
                duration={1000}
                className="cursor-pointer text-xs font-medium uppercase tracking-widest transition-all hover:text-primary"
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
