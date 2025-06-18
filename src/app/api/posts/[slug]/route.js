import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const filePath = path.join(process.cwd(), 'src/posts', `${slug}.md`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);
    
    return Response.json({
      ...frontmatter,
      content,
      slug
    });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
