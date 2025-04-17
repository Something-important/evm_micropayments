'use client';
import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useTheme } from "../context/themeContext";

export default function Blog() {
  const { theme } = useTheme();

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Micropayments: How HashPay is Revolutionizing Digital Transactions",
      excerpt: "Explore how HashPay's innovative payment streaming technology is transforming the way we handle digital transactions...",
      date: "March 15, 2024",
      author: "Sarah Chen",
      category: "Technology",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      title: "Blockchain Security: Best Practices for Payment Streaming",
      excerpt: "Learn about the security measures and best practices that make HashPay's payment streaming platform safe and reliable...",
      date: "March 10, 2024",
      author: "Michael Rodriguez",
      category: "Security",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      title: "Scaling Payment Infrastructure: A Technical Deep Dive",
      excerpt: "A technical exploration of how HashPay handles high-volume payment streams while maintaining performance...",
      date: "March 5, 2024",
      author: "Alex Kumar",
      category: "Engineering",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-background" : "bg-dark-background"}`}>
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">HashPay Blog</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Insights, updates, and deep dives into the world of payment streaming and blockchain technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{post.author}</span>
                    <button className="text-primary hover:text-primary/80 transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="btn-primary">
              View All Posts
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 