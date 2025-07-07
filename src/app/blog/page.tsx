import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { getPosts } from '@/lib/blog';
import BlogList from '../components/BlogList';

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <Header />
      
      <main className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl font-bold mb-4">HashPay Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, updates, and guides about payment streaming and blockchain technology.
          </p>
        </div>

        <BlogList posts={posts} />
      </main>

      <Footer />
    </div>
  );
}