const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Create the API directory structure
const apiDir = path.join(process.cwd(), 'public', 'api', 'posts');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

// Read all posts and generate individual JSON files
const postsDir = path.join(process.cwd(), 'src', 'posts');
const files = fs.readdirSync(postsDir);

files.forEach(filename => {
  if (filename.endsWith('.md')) {
    const slug = filename.replace(/\.md$/, '');
    const filePath = path.join(postsDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);
    
    const postData = {
      ...frontmatter,
      content,
      slug
    };
    
    // Write individual post JSON file
    fs.writeFileSync(
      path.join(apiDir, `${slug}.json`),
      JSON.stringify(postData, null, 2)
    );
  }
});

console.log('Generated static API files for all posts');
