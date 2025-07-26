import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building, ExternalLink } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      title: 'Senior Full-Stack Developer',
      company: 'TechCorp Inc.',
      location: 'Pune, India',
      period: '2022 - Present',
      type: 'Full-time',
      description: [
        'Led development of a microservices architecture serving 1M+ users',
        'Built and maintained React-based dashboard with real-time analytics',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Mentored junior developers and conducted code reviews',
        'Collaborated with product and design teams on feature development',
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL'],
      website: 'https://techcorp.com',
    },
    {
      title: 'Full-Stack Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      period: '2020 - 2022',
      type: 'Full-time',
      description: [
        'Developed MVP from scratch using React and Express.js',
        'Designed and implemented RESTful APIs and database schemas',
        'Integrated third-party services including Stripe and SendGrid',
        'Optimized application performance resulting in 40% faster load times',
        'Participated in product planning and feature prioritization',
      ],
      technologies: ['React', 'Express.js', 'MongoDB', 'Stripe API', 'Heroku'],
      website: 'https://startupxyz.com',
    },
    {
      title: 'Frontend Developer',
      company: 'Design Agency Pro',
      location: 'New York, NY',
      period: '2019 - 2020',
      type: 'Contract',
      description: [
        'Created pixel-perfect responsive websites from Figma designs',
        'Developed custom WordPress themes and plugins',
        'Implemented animations and interactive elements using GSAP',
        'Collaborated with designers to ensure design consistency',
        'Optimized websites for SEO and performance',
      ],
      technologies: ['JavaScript', 'WordPress', 'SCSS', 'GSAP', 'PHP'],
      website: 'https://designagencypro.com',
    },
  ];

  return (
    <section id="experience" className="section-padding bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            My <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
            A journey through my professional career, highlighting key achievements and 
            the technologies I've worked with.
          </p>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline Line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-8 top-24 w-0.5 h-full bg-gradient-to-b from-primary-500 to-purple-500 hidden md:block"></div>
              )}
              
              {/* Timeline Dot */}
              <div className="absolute left-6 top-8 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-gray-900 hidden md:block"></div>

              <div className="md:ml-20 card">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {exp.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300 mb-4">
                      <div className="flex items-center gap-2">
                        <Building size={16} />
                        <span className="font-medium">{exp.company}</span>
                        {exp.website && (
                          <a
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                            aria-label={`Visit ${exp.company} website`}
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>
                      <span className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full">
                        {exp.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Description */}
                  <ul className="space-y-2">
                    {exp.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
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
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Want to know more about my professional journey?
          </p>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Download Full Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
