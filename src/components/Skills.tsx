import React from 'react';
import { motion } from 'framer-motion';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: '🎨',
      skills: [
        { name: 'React', level: 95, color: 'from-blue-500 to-cyan-500' },
        { name: 'TypeScript', level: 90, color: 'from-blue-600 to-blue-700' },
        { name: 'Next.js', level: 88, color: 'from-gray-700 to-gray-900' },
        { name: 'Vue.js', level: 82, color: 'from-green-500 to-emerald-500' },
        { name: 'Tailwind CSS', level: 93, color: 'from-cyan-500 to-blue-500' },
        { name: 'Framer Motion', level: 85, color: 'from-pink-500 to-purple-500' },
      ],
    },
    {
      title: 'Backend Development',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 92, color: 'from-green-600 to-green-700' },
        { name: 'Express.js', level: 88, color: 'from-gray-600 to-gray-700' },
        { name: 'NestJS', level: 85, color: 'from-red-500 to-pink-500' },
        { name: 'Python', level: 80, color: 'from-yellow-500 to-orange-500' },
        { name: 'GraphQL', level: 83, color: 'from-pink-500 to-purple-500' },
        { name: 'REST APIs', level: 90, color: 'from-blue-500 to-indigo-500' },
      ],
    },
    {
      title: 'Database & Cloud',
      icon: '☁️',
      skills: [
        { name: 'PostgreSQL', level: 87, color: 'from-blue-600 to-blue-800' },
        { name: 'MongoDB', level: 85, color: 'from-green-500 to-green-700' },
        { name: 'AWS', level: 82, color: 'from-orange-500 to-orange-600' },
        { name: 'Docker', level: 80, color: 'from-blue-500 to-blue-600' },
        { name: 'Firebase', level: 78, color: 'from-yellow-500 to-orange-500' },
        { name: 'Redis', level: 75, color: 'from-red-500 to-red-600' },
      ],
    },
    {
      title: 'Tools & Technologies',
      icon: '🛠️',
      skills: [
        { name: 'Git & GitHub', level: 95, color: 'from-gray-700 to-gray-900' },
        { name: 'VS Code', level: 92, color: 'from-blue-500 to-blue-600' },
        { name: 'Figma', level: 85, color: 'from-purple-500 to-pink-500' },
        { name: 'Jest', level: 80, color: 'from-orange-500 to-red-500' },
        { name: 'Webpack', level: 75, color: 'from-blue-600 to-cyan-600' },
        { name: 'CI/CD', level: 78, color: 'from-green-500 to-blue-500' },
      ],
    },
  ];

  const softSkills = [
    'Problem Solving',
    'Team Leadership',
    'Communication',
    'Project Management',
    'Agile Methodologies',
    'Code Review',
    'Mentoring',
    'Technical Writing',
  ];

  return (
    <section id="skills" className="section-padding bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
            A comprehensive overview of my technical expertise and the tools I use 
            to bring ideas to life.
          </p>
        </motion.div>

        {/* Technical Skills */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: skillIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Soft Skills & Expertise
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {softSkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="px-6 py-3 bg-gradient-to-r from-primary-100 to-purple-100 dark:from-primary-900 dark:to-purple-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                20+
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">
                Technologies Mastered
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                5+
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">
                Years of Experience
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                100%
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">
                Commitment to Quality
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
