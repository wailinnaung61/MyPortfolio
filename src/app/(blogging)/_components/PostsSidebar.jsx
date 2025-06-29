"use client";
import { useState, useEffect } from "react";
import i18next from "i18next";
import { childrenAnimation } from "@/lib/motion";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PostsSidebar({ categories, recentPosts }) {
  const [lng, setLng] = useState(i18next.language);

  useEffect(() => {
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  return (
    <div className="widget sticky top-[107px] mt-8 space-y-10 lg:mt-0">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        variants={childrenAnimation}
        className="widget widget-category card rounded p-4"
      >
        <h5 className="border-b border-white border-opacity-20 pb-2 font-medium text-primary">
          {lng === "jp" ? "カテゴリ" : "Category"}
        </h5>        <ul className="styledlist mb-0 list-none pl-0">
          {categories.map((category) => (
            <li key={category.name}>
              <span className="clearfix block">
                {category.name}
                <span className="float-right">({category.count})</span>
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        variants={childrenAnimation}
        className="widget widget-recentpost card rounded p-4"
      >
        <h5 className="border-b border-white border-opacity-20 pb-2 font-medium text-primary">
          {lng === "jp" ? "最近の投稿" : "Recent Posts"}
        </h5>
        <ul className="mb-0 list-none pl-0">
          {recentPosts.map((post, index) => (
            <li key={index} className="mb-4 last:mb-0">
              <p className="mb-0">
                <Link
                  href={`/postdetails/${post.slug}`}
                  className="text-heading no-underline hover:text-primary hover:underline"
                >
                  {post.title}{" "}
                </Link>
              </p>
              <small className="text-body">
                {`${new Date(post.date).toLocaleDateString("en-us", {
                  month: "short",
                })} ${new Date(post.date).toLocaleDateString("en-us", {
                  day: "2-digit",
                })}, ${new Date(post.date).getFullYear({
                  year: "numeric",
                })}`}
              </small>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
