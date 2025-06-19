import { MarkdownRenderer } from "@/components/utils";
import { shimmer, toBase64 } from "@/lib/utils";
import Image from "next/image";
import { CategoryLinks } from "./PostInteractiveElements";

export default function PostDetails({ postData }) {
  const { date, cover, category, content } = postData;

  const formattedDate = new Date(date).toLocaleDateString("en-us", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <div className="post-header mb-8">
        <div className="fiximage mb-5 overflow-hidden rounded border border-white border-opacity-20">
          <Image
            src={cover}
            height={650}
            width={1350}
            alt="Blog Image"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(1350, 650)
            )}`}
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-wrap justify-between gap-x-4">
          <div className="mb-0 flex gap-2 text-heading">
            Category : <CategoryLinks categories={category} />
          </div>
          <p className="mb-0 text-heading">
            Published on :
            <span className="ml-1.5 text-body">{formattedDate}</span>
          </p>
        </div>
      </div>
      <div className="post-body mt-4">
        <MarkdownRenderer>{content}</MarkdownRenderer>
      </div>
    </>
  );
}
