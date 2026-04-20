import { createSlug } from "@/lib";
import { formatPostCalendarParts, shimmer, toBase64 } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Blog = ({ post: { title, date, thumb, category, slug } }) => {
  const { month, day, year } = formatPostCalendarParts(date);
  return (
    <article className="blog card flex h-full w-full flex-col p-4 md:p-5">
      <div className="blog-top relative mb-4 aspect-[600/289] w-full shrink-0 overflow-hidden rounded-lg">
        <Link
          href={`/postdetails/${slug}`}
          className="fiximage hover-scale absolute inset-0 block"
          title={title}
        >
          <Image
            src={thumb}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt="Blog Image"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(400, 240)
            )}`}
            className="object-cover object-center"
          />
        </Link>
        <div className="blog-date absolute left-auto right-5 top-5 inline-block min-h-[60px] min-w-[60px] rounded bg-primary p-2 text-center text-grey">
          <span className="month block text-sm uppercase leading-none">
            {month}
          </span>
          <span className="date block text-2xl leading-none">{day}</span>
          <span className="year block text-sm leading-none">{year}</span>
        </div>
      </div>
      <h5 className="mb-0 shrink-0">
        <Link
          href={`/postdetails/${slug}`}
          className=" block overflow-hidden overflow-ellipsis whitespace-nowrap transition-colors duration-500 hover:text-primary"
          title={title}
        >
          {title}
        </Link>
      </h5>
      <div className="mt-auto flex min-h-[1.75rem] flex-wrap list-none gap-1.5 text-sm">
        {category.map((cat, i) => (
          <span key={i} className="after:content-[','] last:after:hidden">
            <Link
              href={`/category/${createSlug(cat)}/1`}
              className=" hover:text-primary"
            >
              {cat}
            </Link>
          </span>
        ))}
      </div>
    </article>
  );
};

export default Blog;
