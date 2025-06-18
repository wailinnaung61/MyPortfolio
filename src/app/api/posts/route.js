import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const LIMIT = 6;

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'src/posts');
    const files = await fs.readdir(postsDirectory);
    
    const posts = await Promise.all(
      files.map(async (filename) => {
        const slug = filename.replace(/\.(md|mdx)$/, '');
        const filePath = path.join(postsDirectory, filename);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data: frontmatter } = matter(fileContents);
        
        return {
          slug,
          ...frontmatter,
        };
      })
    );

    // Sort posts by date
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    return Response.json(sortedPosts);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
