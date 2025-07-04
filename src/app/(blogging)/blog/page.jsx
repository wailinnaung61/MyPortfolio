import { redirect } from "next/navigation";

// Redirect /blog to /posts/1 (first page of posts)
export default function BlogIndex() {
  redirect("/posts/1");
}
