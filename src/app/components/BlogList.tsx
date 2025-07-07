'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/blog';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get unique categories and tags
  const categories = useMemo(() => {
    const uniqueCategories = new Set(posts.map(post => post.category).filter((category): category is string => Boolean(category)));
    return ['all', ...Array.from(uniqueCategories)];
  }, [posts]);

  const tags = useMemo(() => {
    const allTags = posts.flatMap(post => post.tags || []);
    return Array.from(new Set(allTags));
  }, [posts]);

  // Filter posts based on selected category and tags
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
      const tagMatch = selectedTags.length === 0 || 
        selectedTags.some(tag => post.tags?.includes(tag));
      return categoryMatch && tagMatch;
    });
  }, [posts, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="space-y-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {filteredPosts.map((post: Post) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="card"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {post.category && (
                    <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                      {post.category}
                    </span>
                  )}
                  {post.readTime && (
                    <span className="text-sm text-muted-foreground">
                      {post.readTime}
                    </span>
                  )}
                </div>
                
                <h2 className="text-xl font-semibold mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-muted-foreground mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{post.date}</span>
                  {post.author && (
                    <span className="text-muted-foreground">By {post.author}</span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* No Results Message */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found matching your filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedTags([]);
            }}
            className="mt-4 text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
} 