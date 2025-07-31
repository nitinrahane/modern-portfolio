import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building, ExternalLink } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      title: 'Senior .NET Developer',
      company: 'Microsoft Technology Solutions',
      location: 'Pune, India',
      period: '2022 - Present',
      type: 'Full-time',
      description: [
        'Architected and developed enterprise-scale .NET applications serving 500K+ users',
        'Migrated legacy systems to Azure Cloud, reducing infrastructure costs by 40%',
        'Built responsive React front-ends integrated with .NET Core Web APIs',
        'Implemented Azure DevOps CI/CD pipelines for automated deployment',
        'Led team of 5 developers in agile development practices',
      ],
      technologies: ['.NET Core', 'C#', 'React', 'Azure', 'SQL Server', 'Docker', 'Azure DevOps'],
      website: 'https://microsoft.com',
    },
    {
      title: '.NET Full-Stack Developer',
      company: 'Enterprise Software Inc.',
      location: 'Pune, India',
      period: '2019 - 2022',
      type: 'Full-time',
      description: [
        'Developed scalable web applications using ASP.NET MVC and React',
        'Designed and optimized SQL Server databases for high-performance applications',
        'Integrated Azure services including App Service, Storage, and Cosmos DB',
        'Created RESTful APIs and implemented authentication using Azure AD',
        'Mentored junior developers and conducted technical code reviews',
      ],
      technologies: ['ASP.NET', 'C#', 'React', 'SQL Server', 'Azure', 'Entity Framework'],
      website: 'https://enterprise-software.com',
    },
    {
      title: 'Software Developer',
      company: 'TechStart Solutions',
      location: 'Pune, India',
      period: '2017 - 2019',
      type: 'Full-time',
      description: [
        'Built web applications using .NET Framework and JavaScript',
        'Developed responsive UI components using React and modern CSS',
        'Collaborated with cross-functional teams to deliver client projects',
        'Implemented database solutions using SQL Server and Entity Framework',
        'Participated in requirements gathering and technical documentation',
      ],
      technologies: ['.NET Framework', 'JavaScript', 'React', 'SQL Server', 'Bootstrap'],
      website: 'https://techstart.com',
    },
  ];

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            My <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
            A journey through my professional career, highlighting key achievements and 
            the technologies I've worked with.
          </p>
        </motion.div>

        <div className="space-y-8 sm:space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline Line - Hidden on mobile */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-6 sm:left-8 top-20 sm:top-24 w-0.5 h-full bg-gradient-to-b from-primary-500 to-purple-500 hidden md:block"></div>
              )}
              
              {/* Timeline Dot - Hidden on mobile */}
              <div className="absolute left-4 sm:left-6 top-6 sm:top-8 w-3 h-3 sm:w-4 sm:h-4 bg-primary-500 rounded-full border-2 sm:border-4 border-white dark:border-gray-900 hidden md:block"></div>

              <div className="md:ml-16 lg:ml-20 p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 sm:mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {exp.title}
                    </h3>
                    
                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                      <div className="flex items-center gap-2">
                        <Building size={14} className="sm:w-4 sm:h-4" />
                        <span className="font-medium">{exp.company}</span>
                        {exp.website && (
                          <a
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                            aria-label={`Visit ${exp.company} website`}
                          >
                            <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5" />
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="sm:w-4 sm:h-4" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="sm:w-4 sm:h-4" />
                        <span>{exp.period}</span>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 sm:px-3 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full w-fit">
                        {exp.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {/* Description */}
                  <ul className="space-y-2 sm:space-y-3">
                    {exp.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 sm:px-3 text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
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
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
            Want to know more about my professional journey?
          </p>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-medium rounded-lg hover:from-primary-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Download Full Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
