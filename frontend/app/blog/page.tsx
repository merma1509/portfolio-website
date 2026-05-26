'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        console.error('Error fetching blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs');
    }
  };


  return (
    <Layout currentPage="blog">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-6 sm:py-8 lg:py-16">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6 sm:mb-8 text-center">Blog</h1>
          <div className="grid gap-4 sm:gap-6 lg:gap-8">
            {blogs.length > 0 ? (
              blogs.map((blog: any) => (
                <div key={blog.id} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg border border-slate-200/40 dark:border-slate-700/40">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-white mb-2 sm:mb-3 lg:mb-4">{blog.title}</h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">{blog.content}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-600 dark:text-slate-300 text-center text-sm sm:text-base lg:text-lg">No blogs yet.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
