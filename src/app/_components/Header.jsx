"use client";

import { Logo } from "@/components/utils";
import useEventListener from "@/hooks/useEventListener";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { Link as ScrollLink } from "react-scroll";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import i18next from "@/i18n";

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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`header top-0 left-0 z-50 h-auto w-full transition-all duration-400 ease-premium ${
        sticky
          ? "fixed animate-slidedown border-b border-white/[0.06] bg-grey/75 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl supports-[backdrop-filter]:bg-grey/65"
          : "absolute bg-gradient-to-b from-grey-darken/40 to-transparent backdrop-blur-[2px] supports-[backdrop-filter]:from-grey-darken/30"
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
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-grey p-4 text-center"
                >
                  <MobileNavigation changeState={setMobileMenu} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="hidden items-center gap-3 lg:flex xl:gap-4">
            <div className="header-nav">
              <Navigation />
            </div>
            <div className="header-button">
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
      </div>
    </motion.header>
  );
};

export default Header;
