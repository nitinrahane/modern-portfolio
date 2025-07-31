import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  name: string;
  position: string;
  company: string;
  avatar: string;
  content: string;
  linkedinUrl: string;
}

const TestimonialsCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const testimonials: Testimonial[] = [
    {
      name: "Dhwani Kahalpiya",
      position: "Software Engineer",
      company: "Microsoft",
      avatar: "https://via.placeholder.com/80x80/4F46E5/FFFFFF?text=DK",
      content: "Working with him has been a remarkable experience. He is an exceptional developer with a deep understanding of software architecture and a keen eye for building innovative functionalities and efficient solutions.",
      linkedinUrl: "https://linkedin.com/in/nitinrahane"
    },
    {
      name: "Harsh Kumar", 
      position: "Product Manager",
      company: "Tech Corp",
      avatar: "https://via.placeholder.com/80x80/059669/FFFFFF?text=HK",
      content: "I am pleased to recommend Nitin who worked under me at our firm with extensive experience in web frontend and backend development.",
      linkedinUrl: "https://linkedin.com/in/nitinrahane"
    },
    {
      name: "Roopam Pil",
      position: "Lead Developer", 
      company: "Innovation Labs",
      avatar: "https://via.placeholder.com/80x80/DC2626/FFFFFF?text=RP",
      content: "Nitin is distinguished by his ability to optimize business processes for both end-user satisfaction and strategic business growth. His strategic skills, combined with operational excellence, makes him a go-to professional for complex business challenges.",
      linkedinUrl: "https://linkedin.com/in/nitinrahane"
    },
    {
      name: "Sarah Johnson",
      position: "Technical Lead",
      company: "Digital Solutions",
      avatar: "https://via.placeholder.com/80x80/8B5CF6/FFFFFF?text=SJ",
      content: "Nitin's expertise in full-stack development and his ability to understand business requirements make him an invaluable team member. His code quality and attention to detail are exceptional.",
      linkedinUrl: "https://linkedin.com/in/nitinrahane"
    },
    {
      name: "Alex Chen",
      position: "DevOps Engineer",
      company: "Cloud Innovations",
      avatar: "https://via.placeholder.com/80x80/F59E0B/FFFFFF?text=AC",
      content: "Working with Nitin on cloud migration projects was outstanding. His understanding of Azure services and deployment strategies helped us achieve seamless transitions.",
      linkedinUrl: "https://linkedin.com/in/nitinrahane"
    },
    {
      name: "Maria Rodriguez",
      position: "UX Designer",
      company: "Design Studio",
      avatar: "https://via.placeholder.com/80x80/EF4444/FFFFFF?text=MR",
      content: "Nitin bridges the gap between design and development beautifully. He translates complex UI/UX requirements into elegant, functional code with remarkable precision.",
      linkedinUrl: "https://linkedin.com/in/nitinrahane"
    }
  ];

  const itemsPerSlide = 2;
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  // Auto-advance carousel
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000); // 5 second intervals for testimonials
      return () => clearInterval(interval);
    }
  }, [totalSlides, isHovered]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getCurrentTestimonials = () => {
    const start = currentSlide * itemsPerSlide;
    return testimonials.slice(start, start + itemsPerSlide);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
            Don't just take my word for it - here's what my colleagues and clients have to say about working with me.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {getCurrentTestimonials().map((testimonial, index) => (
                <motion.div
                  key={`${currentSlide}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Quote Icon */}
                  <div className="text-primary-600 dark:text-primary-400 mb-6">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-4c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-4c0-1.1.9-2 2-2V8z"/>
                    </svg>
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="text-gray-900 dark:text-white font-semibold">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {testimonial.position} at {testimonial.company}
                      </p>
                    </div>
                    <a
                      href={testimonial.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-primary-600 dark:bg-primary-400'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* LinkedIn Recommendations CTA */}
        <div className="text-center mt-12">
          <a
            href="https://linkedin.com/in/nitinrahane"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
            </svg>
            View All Recommendations on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
