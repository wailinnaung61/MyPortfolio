import { redirect } from "next/navigation";

// Redirect /en/blog to /posts/1
export default function EnglishBlogIndex() {
  redirect("/posts/1");
}
