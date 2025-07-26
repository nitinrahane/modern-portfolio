import React from 'react';

interface BlogPost {
  id: string;
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
    <section id="blogs" className="section-padding">
      <h2 className="text-3xl font-bold mb-8">Latest Blog Posts</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((post) => (
          <article key={post.id} className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            {post.data.image && (
              <img src={post.data.image} alt={post.data.title} className="mb-4 rounded-lg w-full h-40 object-cover" />
            )}
            <h3 className="text-xl font-semibold mb-2">{post.data.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{post.data.description}</p>
            <div className="text-sm text-gray-400 mb-2">{post.data.date} &mdash; {post.data.author}</div>
            <div className="flex flex-wrap gap-2">
              {post.data.tags?.map((tag: string) => (
                <span key={tag} className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded text-xs">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
