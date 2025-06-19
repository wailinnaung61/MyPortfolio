"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import i18next from "i18next";
import React from "react";
import { Breadcrumb } from "@/components/elements";
import PostsShowcase from "./PostsShowcase";
import PostsSidebar from "./PostsSidebar";

export default function PostsPageCategory({
  slug,
  page,
  posts,
  hasMore,
  categories,
  recentPosts,
}) {
  const [lng, setLng] = useState(i18next.language || "en");

  useEffect(() => {
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);

    if (typeof window !== "undefined") {
      setLng(
        window.localStorage.getItem("i18nextLng") || i18next.language || "en"
      );
    }

    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  const t = (key) => i18next.t(key, { lng, ns: "common" });

  return (
    <>
      <Breadcrumb
        title={lng === "en" ? "Blogs" : "ブログ"}
        paths={[
          { name: t("home"), link: "/" },
          { name: t("blogs"), link: "/posts/1" },
          { name: slug, link: "" },
        ]}
        blurred
      />
      <div className="blogs py-24 lg:py-28 xl:py-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-12">
            <div className="col-span-1 lg:col-span-9">
              <PostsShowcase posts={posts} />
              <div className="flex gap-3 pt-10 text-center">
                {page !== "1" && (
                  <Link
                    href={`/category/${slug}/${String(parseInt(page) - 1)}`}
                    className="btn btn-small"
                  >
                    <span>{t("previous")}</span>
                  </Link>
                )}
                {hasMore && (
                  <Link
                    href={`/category/${slug}/${String(parseInt(page) + 1)}`}
                    className="btn btn-small"
                  >
                    <span>{t("next")}</span>
                  </Link>
                )}
              </div>
            </div>
            <div className="col-span-1 lg:col-span-3">
              <PostsSidebar categories={categories} recentPosts={recentPosts} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
