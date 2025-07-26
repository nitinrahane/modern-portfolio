import React from 'react';

export default function MinimalPortfolio() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              John Smith
            </h1>
            <nav className="space-x-4">
              <a href="#about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                About
              </a>
              <a href="#projects" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Projects
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Full-Stack Developer & UI/UX Designer
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              I create exceptional digital experiences with modern technologies. 
              Passionate about building scalable applications and beautiful user interfaces.
            </p>
            <div className="space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Get In Touch
              </button>
              <button className="border border-gray-300 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                View Resume
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              About Me
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              I'm a passionate full-stack developer with 5+ years of experience building web applications. 
              I specialize in React, Node.js, and cloud technologies.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
                <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-300">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                <div className="text-gray-600 dark:text-gray-300">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                <div className="text-gray-600 dark:text-gray-300">Technologies</div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project Card 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4"></div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  E-Commerce Platform
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  A full-stack e-commerce solution built with React and Node.js
                </p>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">React</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Node.js</span>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="h-48 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg mb-4"></div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Social Media App
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Real-time social platform with messaging and content sharing
                </p>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">React Native</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">Firebase</span>
                </div>
              </div>

              {/* Project Card 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mb-4"></div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  AI Content Generator
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  AI-powered tool for generating marketing content
                </p>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">Next.js</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">OpenAI</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Get In Touch
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              I'm always open to discussing new opportunities and interesting projects.
            </p>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                📧 john@example.com
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                📱 +1 (555) 123-4567
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                📍 San Francisco, CA
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 John Smith. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
