"use client";

import { Breadcrumb } from "@/components/elements";
import { Comments } from "@/components/utils";
import React, { useEffect, useState } from "react";
import PostDetails from "./_components/PostDetails";

export default function PostDetailsPage({ params: { slug } }) {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!postData) return <div className="text-center py-20">Post not found</div>;

  return (
    <>
      <Breadcrumb
        title={postData.title}
        paths={[
          {
            name: "Home",
            link: "/",
          },
          {
            name: "Blogs",
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
          <div className="post-comments mt-8">
            <Comments title={postData.title} slug={postData.slug} />
          </div>
        </div>
      </div>
    </>
  );
}
