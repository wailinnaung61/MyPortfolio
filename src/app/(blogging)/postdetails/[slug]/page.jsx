import fs from "fs";
import path from "path";
import PostDetailsClient from "./PostDetailsClient";

// Add generateStaticParams for static export
export function generateStaticParams() {
  try {
    const postsDirectory = path.join(process.cwd(), "src/posts");
    const filenames = fs.readdirSync(postsDirectory);
    const params = filenames
      .filter((name) => name.endsWith(".md"))
      .map((name) => ({ slug: name.replace(/\.md$/, "") }));
    return params;
  } catch (error) {
    return [];
  }
}

export default function PostDetailsPage({ params: { slug } }) {
  return <PostDetailsClient slug={slug} />;
}
