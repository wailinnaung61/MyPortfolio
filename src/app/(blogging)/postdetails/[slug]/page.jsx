"use client";

import { Breadcrumb } from "@/components/elements";
import React, { useEffect, useState } from "react";
import PostDetails from "./_components/PostDetails";
import i18next from "i18next";
import Loading from "@/app/loading";

export default function PostDetailsPage({ params: { slug } }) {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [lng, setLng] = useState(i18next.language || "en");

  useEffect(() => {
    setMounted(true);
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    if (typeof window !== "undefined") {
      setLng(
        window.localStorage.getItem("i18nextLng") || i18next.language || "en"
      );
    }
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) throw new Error("Failed to fetch post");
        const data = await response.json();
        setPostData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const t = (key) => i18next.t(key, { lng, ns: "common" });

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) return null;

  if (loading) return Loading();
  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        {t("error")}: {error}
      </div>
    );
  if (!postData)
    return <div className="text-center py-20">{t("postNotFound")}</div>;

  return (
    <>
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
        blurred
      />
      <div className="single-post py-24 lg:py-28 xl:pt-32">
        <div className="container mx-auto">
          <PostDetails postData={postData} />
        </div>
      </div>
    </>
  );
}
