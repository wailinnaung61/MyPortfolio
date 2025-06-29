"use client";

import { Logo } from "@/components/utils";
import useEventListener from "@/hooks/useEventListener";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { Link as ScrollLink } from "react-scroll";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import i18next from "i18next";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [lng, setLng] = useState(i18next.language);
  const [mounted, setMounted] = useState(false);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    scrollTop > 200 ? setSticky(true) : setSticky(false);
  };

  useEventListener("scroll", isSticky);

  useEffect(() => {
    setMounted(true);
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  if (!mounted) return null;

  const t = (key) => i18next.t(key, { lng, ns: "common" });
  return (
    <header
      className={`header top-0 left-0 z-50 h-auto w-full ${
        sticky
          ? "fixed animate-slidedown border-b border-white border-opacity-20 bg-grey bg-opacity-80 backdrop-blur backdrop-filter"
          : "absolute"
      }`}
    >
      <div className="container mx-auto">
        <div className="header-inner flex items-center justify-between">
          <Logo url="/" />
          <div className="header-mobilenav block lg:hidden">
            <button
              className="btn btn-small btn-transparent px-3 text-3xl"
              onClick={() => setMobileMenu(true)}
            >
              <RiMenuLine />
            </button>
            <AnimatePresence>
              {mobileMenu && (
                <motion.div
                  initial={{ translateY: "100vh" }}
                  animate={{ translateY: "0px" }}
                  exit={{ translateY: "-100vh" }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-grey p-4 text-center"
                >
                  <MobileNavigation changeState={setMobileMenu} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="header-nav hidden lg:block">
            <Navigation />
          </div>
          <div className="header-button hidden lg:block">
            <ScrollLink
              activeClass="active"
              to="section-contact"
              spy={true}
              smooth="easeInQuad"
              offset={-74}
              duration={1000}
              className="btn"
            >
              <span> {t("hireme")}</span>
            </ScrollLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
