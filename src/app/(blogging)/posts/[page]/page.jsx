import PostsPageClient from "../../_components/PostsPageClient";
import {
  getAllCategories,
  getPostsByPage,
  getRecentPosts,
  getAllPostsData,
} from "@/lib/blogging";

export const metadata = {
  title: "Posts",
};

// Add generateStaticParams for static export
export function generateStaticParams() {
  try {
    const allPosts = getAllPostsData();
    const LIMIT = 6;
    const totalPages = Math.ceil(allPosts.length / LIMIT);
    const params = Array.from({ length: totalPages }, (_, i) => ({
      page: (i + 1).toString(),
    }));
    return params;
  } catch (error) {
    return [{ page: "1" }];
  }
}

export default function PostsPage({ params }) {
  const { page } = params;
  const { posts, hasMore } = getPostsByPage(parseInt(page));
  const categories = getAllCategories();
  const recentPosts = getRecentPosts();

  return (
    <PostsPageClient
      page={page}
      posts={posts}
      hasMore={hasMore}
      categories={categories}
      recentPosts={recentPosts}
    />
  );
}
