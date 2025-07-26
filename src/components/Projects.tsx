import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'E-Commerce Dashboard',
      description: 'A comprehensive dashboard for managing e-commerce operations with real-time analytics, inventory management, and order processing.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
      features: [
        'Real-time sales analytics',
        'Inventory management system',
        'Payment processing integration',
        'Responsive design',
        'Advanced filtering and search',
      ],
      github: 'https://github.com/yourusername/ecommerce-dashboard',
      live: 'https://ecommerce-dashboard-demo.com',
      category: 'Full-Stack',
      status: 'Completed',
    },
    {
      title: 'Social Media App',
      description: 'A modern social media platform with real-time messaging, post sharing, and advanced user interaction features.',
      image: '/api/placeholder/600/400',
      technologies: ['React Native', 'Firebase', 'Redux', 'Socket.io'],
      features: [
        'Real-time messaging',
        'Photo and video sharing',
        'Push notifications',
        'User authentication',
        'Social interactions (likes, comments)',
      ],
      github: 'https://github.com/yourusername/social-media-app',
      live: 'https://social-app-demo.com',
      category: 'Mobile',
      status: 'Completed',
    },
    {
      title: 'AI Content Generator',
      description: 'An AI-powered tool that generates high-quality content for blogs, social media, and marketing campaigns.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'Supabase'],
      features: [
        'AI-powered content generation',
        'Multiple content templates',
        'SEO optimization',
        'Export functionality',
        'User collaboration tools',
      ],
      github: 'https://github.com/yourusername/ai-content-generator',
      live: 'https://ai-content-demo.com',
      category: 'AI/ML',
      status: 'In Progress',
    },
    {
      title: 'Portfolio Website Builder',
      description: 'A drag-and-drop website builder specifically designed for creating beautiful portfolio websites for creatives.',
      image: '/api/placeholder/600/400',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS S3'],
      features: [
        'Drag-and-drop interface',
        'Custom themes and templates',
        'SEO optimization',
        'Analytics integration',
        'Custom domain support',
      ],
      github: 'https://github.com/yourusername/portfolio-builder',
      live: 'https://portfolio-builder-demo.com',
      category: 'Web App',
      status: 'Completed',
    },
    {
      title: 'Crypto Trading Bot',
      description: 'An automated cryptocurrency trading bot with advanced algorithms and risk management features.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'FastAPI', 'Redis', 'PostgreSQL', 'Docker'],
      features: [
        'Automated trading strategies',
        'Real-time market analysis',
        'Risk management tools',
        'Performance analytics',
        'Multiple exchange support',
      ],
      github: 'https://github.com/yourusername/crypto-trading-bot',
      category: 'Backend',
      status: 'Completed',
    },
    {
      title: 'Task Management System',
      description: 'A collaborative project management tool with advanced features for team coordination and productivity tracking.',
      image: '/api/placeholder/600/400',
      technologies: ['Angular', 'NestJS', 'MongoDB', 'Socket.io', 'JWT'],
      features: [
        'Team collaboration',
        'Project timeline tracking',
        'Real-time updates',
        'File sharing',
        'Advanced reporting',
      ],
      github: 'https://github.com/yourusername/task-management',
      live: 'https://task-management-demo.com',
      category: 'Full-Stack',
      status: 'Completed',
    },
  ];

  const [filter, setFilter] = React.useState('All');
  const categories = ['All', 'Full-Stack', 'Mobile', 'AI/ML', 'Web App', 'Backend'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
            A showcase of my recent work, demonstrating my skills in various technologies 
            and domains. Each project represents a unique challenge and solution.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group hover:scale-105"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                <div className="w-full h-48 bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                  <Play className="text-white" size={48} />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                      aria-label="View source code"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                      aria-label="View live demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === 'Completed' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {project.description}
                </p>

                {/* Key Features */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {project.features.length > 3 && (
                      <li className="text-sm text-gray-500 dark:text-gray-400">
                        +{project.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-outline text-center"
                    >
                      <Github size={16} className="inline mr-2" />
                      Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-primary text-center"
                    >
                      <ExternalLink size={16} className="inline mr-2" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Interested in seeing more of my work or discussing a project?
          </p>
          <a href="#contact" className="btn-primary">
            Let's Work Together
          </a>
        </motion.div>
      </div>
    </section>
  );
}
