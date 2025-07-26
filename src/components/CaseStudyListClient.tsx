import React from 'react';

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
    <section id="casestudies" className="section-padding py-20 bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Case Studies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real-world projects showcasing innovative solutions, technical challenges overcome, and measurable business impact.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <article key={cs.id} className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transform hover:-translate-y-2">
              {/* Card Header */}
              <div className="p-6 pb-4">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  <a href={`/case-study/${cs.slug}`} className="stretched-link">
                    {cs.data.title}
                  </a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                  {cs.data.description}
                </p>
              </div>

              {/* Client Badge */}
              <div className="px-6 pb-2">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 border border-purple-200 dark:border-purple-700">
                  <svg className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2m0 0h4" />
                  </svg>
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">{cs.data.client}</span>
                </div>
              </div>

              {/* Results */}
              {cs.data.result && (
                <div className="px-6 pb-4">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">Key Result</p>
                        <p className="text-sm text-green-700 dark:text-green-300">{cs.data.result}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="px-6 pb-4">
                {cs.data.tags && cs.data.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {cs.data.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium border border-purple-200 dark:border-purple-800">
                        {tag}
                      </span>
                    ))}
                    {cs.data.tags.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                        +{cs.data.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                <div className="flex items-center justify-between">
                  <time className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {new Date(cs.data.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </time>
                  <a 
                    href={`/case-study/${cs.slug}`} 
                    className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm transition-colors group-hover:translate-x-1 transform duration-200"
                  >
                    View Study
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </article>
          ))}
        </div>
        
        {/* View All Button */}
        {caseStudies.length > 6 && (
          <div className="text-center mt-12">
            <a 
              href="/case-studies" 
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View All Case Studies
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
