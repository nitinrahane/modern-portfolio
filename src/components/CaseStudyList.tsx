import React from 'react';

interface CaseStudy {
  id: string;
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
    <section id="casestudies" className="section-padding">
      <h2 className="text-3xl font-bold mb-8">Case Studies</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((cs) => (
          <article key={cs.id} className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            {cs.data.image && (
              <img src={cs.data.image} alt={cs.data.title} className="mb-4 rounded-lg w-full h-40 object-cover" />
            )}
            <h3 className="text-xl font-semibold mb-2">{cs.data.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{cs.data.description}</p>
            <div className="text-sm text-gray-400 mb-2">{cs.data.date} &mdash; {cs.data.client}</div>
            {cs.data.result && <div className="text-green-600 dark:text-green-400 mb-2">Result: {cs.data.result}</div>}
            <div className="flex flex-wrap gap-2">
              {cs.data.tags?.map((tag: string) => (
                <span key={tag} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded text-xs">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
