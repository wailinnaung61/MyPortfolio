import { redirect } from "next/navigation";

// Redirect /posts to /posts/1 (first page)
export default function PostsIndex() {
  redirect("/posts/1");
}
