import React from 'react';
import { motion } from 'framer-motion';

interface CaseStudy {
  id: string;
  slug: string;
  data: {
    title: string;
    description: string;
    date: string;
    client: string;
    result?: string;
    tags?: string[];
    image?: string;
  };
}

interface CaseStudyListClientProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudyListClient({ caseStudies }: CaseStudyListClientProps) {
  return (
    <div className="space-y-6">
      {caseStudies.map((caseStudy, index) => (
        <motion.article 
          key={caseStudy.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
        >
          <div className="p-6">
            {/* Client Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0V9a1 1 0 011-1h4a1 1 0 011 1v13" />
                </svg>
                {caseStudy.data.client}
              </span>
              <div className="w-2 h-2 bg-emerald-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
              <a href={`/case-study/${caseStudy.slug}`} className="stretched-link">
                {caseStudy.data.title}
              </a>
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 text-sm leading-relaxed">
              {caseStudy.data.description}
            </p>

            {/* Result Badge (if available) */}
            {caseStudy.data.result && (
              <div className="mb-3">
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {caseStudy.data.result}
                </span>
              </div>
            )}

            {/* Tags */}
            {caseStudy.data.tags && caseStudy.data.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {caseStudy.data.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
                {caseStudy.data.tags.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{caseStudy.data.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Read More Arrow */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
