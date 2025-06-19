import PostsPageClient from "../../_components/PostsPageClient";
import {
  getAllCategories,
  getPostsByPage,
  getRecentPosts,
} from "@/lib/blogging";

export const metadata = {
  title: "Posts",
};

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
