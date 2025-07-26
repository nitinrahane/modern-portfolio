import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Zap, Users, Award, Heart } from 'lucide-react';

export default function About() {
  const stats = [
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Projects Completed' },
    { number: '100+', label: 'Happy Clients' },
    { number: '10+', label: 'Technologies Mastered' },
  ];

  const values = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Clean Code',
      description: 'I write maintainable, scalable, and well-documented code that stands the test of time.',
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Design First',
      description: 'Every project starts with thoughtful design and user experience considerations.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance',
      description: 'I optimize for speed and efficiency, ensuring the best possible user experience.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'I believe in transparent communication and working closely with teams and clients.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'I strive for excellence in every detail, from code quality to final delivery.',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Passion',
      description: 'I love what I do and it shows in the quality and creativity of my work.',
    },
  ];

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
            I'm a passionate full-stack developer with a keen eye for design and a love for creating 
            innovative digital solutions that make a positive impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Journey
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                My journey into technology began during my computer science studies, where I discovered 
                my passion for building digital experiences that solve real-world problems. What started 
                as curiosity about how websites work evolved into a deep love for creating elegant, 
                functional applications.
              </p>
              <p>
                Over the past 5 years, I've had the privilege of working with startups, agencies, and 
                enterprise companies, helping them bring their visions to life through code. I specialize 
                in modern web technologies and have a particular interest in React, Node.js, and cloud 
                architecture.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                projects, or mentoring aspiring developers. I believe in continuous learning and staying 
                at the forefront of technological innovation.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg"
              >
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            What I Value
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:scale-105"
              >
                <div className="text-primary-600 dark:text-primary-400 mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {value.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
