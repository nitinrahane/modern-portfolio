import React from 'react';

interface BlogPost {
  id: string;
  slug: string;
  data: {
    title: string;
    description: string;
    date: string;
    author: string;
    tags?: string[];
    image?: string;
  };
}

interface BlogListClientProps {
  blogs: BlogPost[];
}

export default function BlogListClient({ blogs }: BlogListClientProps) {
  return (
    <section id="blogs" className="section-padding py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
            Latest Blog Posts
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on modern web development, technology trends, and software engineering best practices.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <article key={post.id} className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transform hover:-translate-y-2">
              {/* Card Header */}
              <div className="p-6 pb-4">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  <a href={`/blog/${post.slug}`} className="stretched-link">
                    {post.data.title}
                  </a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                  {post.data.description}
                </p>
              </div>

              {/* Card Body */}
              <div className="px-6 pb-4">
                {post.data.tags && post.data.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.data.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium border border-primary-200 dark:border-primary-800">
                        {tag}
                      </span>
                    ))}
                    {post.data.tags.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                        +{post.data.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">{post.data.author}</span>
                    <span className="mx-2">•</span>
                    <time>{new Date(post.data.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</time>
                  </div>
                  <a 
                    href={`/blog/${post.slug}`} 
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors group-hover:translate-x-1 transform duration-200"
                  >
                    Read More
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </article>
          ))}
        </div>
        
        {/* View All Button */}
        {blogs.length > 6 && (
          <div className="text-center mt-12">
            <a 
              href="/blog" 
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View All Posts
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
