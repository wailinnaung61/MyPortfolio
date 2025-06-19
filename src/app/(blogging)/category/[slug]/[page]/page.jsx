import dynamic from "next/dynamic";
import {
  getAllCategories,
  getPostsByCategory,
  getRecentPosts,
} from "@/lib/blogging";

// Dynamically import the client component
const PostsPageClient = dynamic(
  () => import("../../../_components/PostsPageCategory"),
  {
    ssr: false, // this ensures it's run client-side
  }
);

export function generateMetadata({ params }) {
  const { slug } = params;
  return {
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
  };
}

export default function PostsPage({ params }) {
  const { slug, page } = params;
  const postsData = getPostsByCategory(slug, page, 6);
  const categories = getAllCategories();
  const recentPosts = getRecentPosts();

  return (
    <PostsPageClient
      slug={slug}
      page={page}
      posts={postsData.posts}
      hasMore={postsData.hasMore}
      categories={categories}
      recentPosts={recentPosts}
    />
  );
}
