import React from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import Footer from './Footer';
import BlogListClient from './BlogListClient';
import CaseStudyListClient from './CaseStudyListClient';

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

interface CaseStudy {
  id: string;
  slug: string;
  data: {
    title: string;
    description: string;
    date: string;
    client: string;
    tags?: string[];
    image?: string;
  };
}

interface PortfolioProps {
  blogs?: BlogPost[];
  caseStudies?: CaseStudy[];
}

export default function Portfolio({ blogs = [], caseStudies = [] }: PortfolioProps) {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        
        {/* Blog & Case Studies Preview */}
        <section id="blogs" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Latest Work & <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Insights</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Exploring cutting-edge technologies and sharing real-world project experiences to help others in their development journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Blog Preview */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Recent Blog Posts</h3>
                </div>
                
                {blogs.length > 0 ? (
                  <div className="space-y-6">
                    <BlogListClient blogs={blogs.slice(0, 3)} />
                    {blogs.length > 3 && (
                      <div className="mt-8 text-center">
                        <a 
                          href="/blog" 
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                          <span>View All Posts</span>
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Blog Posts Coming Soon</h4>
                    <p className="text-gray-600 dark:text-gray-300">I'm working on some exciting technical articles and tutorials. Stay tuned!</p>
                  </div>
                )}
              </div>
              
              {/* Case Studies Preview */}
              <div id="casestudies" className="space-y-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Case Studies</h3>
                </div>
                
                {caseStudies.length > 0 ? (
                  <div className="space-y-6">
                    <CaseStudyListClient caseStudies={caseStudies.slice(0, 3)} />
                    {caseStudies.length > 3 && (
                      <div className="mt-8 text-center">
                        <a 
                          href="/case-study" 
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                          <span>View All Case Studies</span>
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0V9a1 1 0 011-1h4a1 1 0 011 1v13" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Case Studies in Development</h4>
                    <p className="text-gray-600 dark:text-gray-300">Detailed project breakdowns and technical deep-dives are being prepared to showcase real-world solutions.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer removed - will be added at the bottom of the page layout */}
    </div>
  );
}

