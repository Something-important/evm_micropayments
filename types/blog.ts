export interface BlogPost {
    id: number | string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
    image: string;
    slug: string;
    content?: string;
  }