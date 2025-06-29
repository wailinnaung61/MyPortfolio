import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory } from "@/lib/blogging";
import Blog from "../../../_components/Blog";
import BlogPagination from "../../../_components/BlogPagination";

// Generate static params for all category slugs and pages
export async function generateStaticParams() {
  try {
    const categories = getAllCategories();
    const paths = [];

    categories.forEach((category) => {
      const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');
      
      // Just generate page 1 for each category to avoid issues
      paths.push({
        slug: categorySlug,
        page: "1",
      });
    });

    return paths;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default function CategoryPage({ params }) {
  const { slug, page } = params;
  const currentPage = parseInt(page) || 1;
  
  try {
    const { posts, hasMore } = getPostsByCategory(slug, currentPage, 6);
      if (!posts || posts.length === 0) {
      return (
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">No posts found</h1>
          <p>No posts found for this category.</p>
        </div>
      );
    }// Get category name for display
    const allCategories = getAllCategories();
    const categoryName = allCategories.find(cat => 
      cat.name.toLowerCase().replace(/\s+/g, '-') === slug
    )?.name || slug;

    return (
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Category: {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          </h1>
          <p className="text-gray-600">
            Found {posts.length} posts in this category
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Blog key={index} post={post} />
          ))}
        </div>
        
        {(hasMore || currentPage > 1) && (
          <BlogPagination
            currentPage={currentPage}
            hasMore={hasMore}
            basePath={`/category/${slug}`}
          />
        )}
      </div>
    );  } catch (error) {
    console.error('Error loading category posts:', error);
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p>There was an error loading this category.</p>
      </div>
    );
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const allCategories = getAllCategories();
  const categoryName = allCategories.find(cat => 
    cat.name.toLowerCase().replace(/\s+/g, '-') === slug
  )?.name || slug;
  
  return {
    title: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} - Blog Categories`,
    description: `Browse all posts in the ${categoryName} category`,
  };
}
