"use client";

import { Breadcrumb } from "@/components/elements";
import React from "react";
import PostDetails from "./PostDetails";
import i18next from "i18next";

export default function PostDetailsClient({ postData }) {
  const [lng, setLng] = React.useState(i18next.language || "en");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const storedLang = window.localStorage.getItem("i18nextLng") || "en";
    i18next.changeLanguage(storedLang);
    setLng(storedLang);

    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  const t = (key) => i18next.t(key, { lng, ns: "common" });

  if (!mounted) return null;

  return (
    <React.Fragment>
      <Breadcrumb
        title={postData.title}
        paths={[
          {
            name: t("home"),
            link: "/",
          },
          {
            name: t("blogs"),
            link: "/posts/1",
          },
          {
            name: postData.title,
            link: "",
          },
        ]}
      />
      <div className="single-post py-24 lg:py-28 xl:py-32">
        <div className="container mx-auto">
          <PostDetails post={postData} />
        </div>
      </div>
    </React.Fragment>
  );
}
