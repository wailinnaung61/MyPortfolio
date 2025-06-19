"use client";

import { createSlug } from "@/lib";
import Link from "next/link";

export function CategoryLinks({ categories }) {
  return (
    <div className="inline-flex list-none gap-1.5">
      {categories.map((cat, i) => (
        <span key={i} className="after:content-[','] last:after:hidden">
          <Link
            href={`/category/${createSlug(cat)}/1`}
            className="text-body hover:text-primary"
          >
            {cat}
          </Link>
        </span>
      ))}
    </div>
  );
}
