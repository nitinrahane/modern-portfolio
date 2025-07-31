import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTotalExperience } from '../utils/experience';

interface Brand {
  name: string;
  logo: string;
  description: string;
}

const BrandCarousel: React.FC = () => {
  const brands: Brand[] = [
    {
      name: "Microsoft",
      logo: "https://img.icons8.com/fluency/96/microsoft.png",
      description: "Enterprise Solutions"
    },
    {
      name: "Azure",
      logo: "https://img.icons8.com/fluency/96/azure-1.png", 
      description: "Cloud Services"
    },
    {
      name: "Clutron",
      logo: "https://via.placeholder.com/96x96/4F46E5/FFFFFF?text=C",
      description: "Technology Solutions"
    },
    {
      name: "TCS",
      logo: "https://via.placeholder.com/96x96/0F172A/FFFFFF?text=TCS",
      description: "Digital Transformation"
    },
    {
      name: "Infosys",
      logo: "https://via.placeholder.com/96x96/3B82F6/FFFFFF?text=I",
      description: "IT Services"
    },
    {
      name: "Wipro",
      logo: "https://via.placeholder.com/96x96/10B981/FFFFFF?text=W",
      description: "Global IT Solutions"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(brands.length / itemsPerSlide);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const stats = [
    { number: `${getTotalExperience()}+`, label: "Years Experience" },
    { number: "50+", label: "Projects Completed" },
    { number: "15+", label: "Happy Clients" },
    { number: "20+", label: "Technologies Mastered" }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Brands I've <span className="gradient-text">Worked With</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
            Trusted by leading companies to deliver exceptional digital experiences and robust solutions.
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative mb-12 sm:mb-16">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {brands.slice(currentIndex * itemsPerSlide, (currentIndex * itemsPerSlide) + itemsPerSlide).map((brand, index) => (
                  <motion.div
                    key={brand.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center border border-gray-200 dark:border-gray-700"
                  >
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-16 h-16 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/64x64/4F46E5/FFFFFF?text=${brand.name.charAt(0)}`;
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{brand.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{brand.description}</p>
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
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-600 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
