import Link from "next/link";

const BlogPagination = ({ currentPage, hasMore, basePath }) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      {prevPage > 0 && (
        <Link
          href={`${basePath}/${prevPage}`}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors"
        >
          Previous
        </Link>
      )}
      
      <span className="px-4 py-2 bg-gray-100 rounded">
        Page {currentPage}
      </span>
      
      {hasMore && (
        <Link
          href={`${basePath}/${nextPage}`}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default BlogPagination;
