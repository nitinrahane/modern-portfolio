import React from 'react';
import { motion } from 'framer-motion';

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
    <div className="space-y-6">
      {blogs.map((post, index) => (
        <motion.article 
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
        >
          <div className="p-6">
            {/* Date Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.data.date).toLocaleDateString()}
              </span>
              <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              <a href={`/blog/${post.slug}`} className="stretched-link">
                {post.data.title}
              </a>
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 text-sm leading-relaxed">
              {post.data.description}
            </p>

            {/* Tags */}
            {post.data.tags && post.data.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.data.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
                {post.data.tags.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{post.data.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Read More Arrow */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
