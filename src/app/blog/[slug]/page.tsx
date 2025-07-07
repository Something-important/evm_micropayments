import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Head from 'next/head';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Image from 'next/image';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'src/content/posts', `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Configure marked
  marked.setOptions({
    gfm: true,
    breaks: true,
    pedantic: false
  });

  // Custom renderer for images
  const renderer = new marked.Renderer();
  renderer.image = ({ href, title, text }) => {
    // Extract classes from the title if present
    const classes = title ? title.replace(/^{: /, '').replace(/}$/, '') : '';
    return `<img src="${href}" alt="${text}" class="${classes} mx-auto rounded-lg shadow-lg" />`;
  };
  marked.use({ renderer });

  const htmlContent = marked.parse(content) as string;

  // Extract headings for table of contents
  const headings = content
    .split('\n')
    .filter(line => line.startsWith('## '))
    .map(line => ({
      title: line.replace('## ', ''),
      id: line.replace('## ', '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }));

  // Generate share URLs
  const shareUrl = `https://hashpay.com/blog/${slug}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.title)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.excerpt} />
      </Head>
      <Header />
      
      <main className="container mx-auto px-4 py-20 max-w-4xl">
        <article className="prose dark:prose-invert max-w-none">
          {/* Featured Image */}
          {data.image && (
            <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>{data.date}</span>
              {data.author && <span>By {data.author}</span>}
              {data.readTime && <span>{data.readTime}</span>}
            </div>
            {data.category && (
              <span className="inline-block px-3 py-1 mt-4 text-sm rounded-full bg-primary/10 text-primary">
                {data.category}
              </span>
            )}
          </div>

          {/* Table of Contents */}
          {headings.length > 0 && (
            <div className="mb-12 p-6 bg-muted/50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
              <ul className="space-y-2">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a 
                      href={`#${heading.id}`}
                      className="text-primary hover:underline"
                    >
                      {heading.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div 
            className="prose-headings:font-bold 
                      prose-a:text-primary prose-a:no-underline
                      prose-pre:bg-[#0f172a] prose-pre:text-[#e2e8f0] prose-pre:p-4 prose-pre:rounded-lg
                      prose-code:text-[#e2e8f0] prose-code:bg-[#1e293b] prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                      prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4
                      prose-img:mx-auto prose-img:rounded-lg prose-img:shadow-lg
                      prose-div:my-8
                      prose-table:w-full prose-table:border-collapse
                      prose-th:border prose-th:border-gray-300 prose-th:p-2 prose-th:text-left prose-th:bg-gray-100 dark:prose-th:bg-gray-800
                      prose-td:border prose-td:border-gray-300 prose-td:p-2
                      [&_.language-bash]:text-[#10b981]
                      [&_.language-typescript]:text-[#3b82f6]"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-xl font-semibold mb-4">Share this article</h3>
            <div className="flex gap-4">
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Share on Twitter
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Share on LinkedIn
              </a>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}