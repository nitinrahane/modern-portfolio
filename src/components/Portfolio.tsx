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
        {blogs.length > 0 && <BlogListClient blogs={blogs} />}
        {caseStudies.length > 0 && <CaseStudyListClient caseStudies={caseStudies} />}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

