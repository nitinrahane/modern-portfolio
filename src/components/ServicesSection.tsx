import React from 'react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ServicesSection: React.FC = () => {
  const services: Service[] = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: "Custom Web Development",
      description: "Building modern, scalable web applications using React, .NET Core, and cloud technologies.",
      features: [
        "Responsive Design",
        "Performance Optimization",
        "Cross-browser Compatibility",
        "SEO-friendly Architecture"
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v10a2 2 0 002 2h6a2 2 0 002-2V8M7 8H5a2 2 0 00-2 2v8a2 2 0 002 2h2m0-12h10" />
        </svg>
      ),
      title: "Azure Cloud Solutions",
      description: "Leveraging Microsoft Azure for scalable, secure, and cost-effective cloud solutions.",
      features: [
        "Cloud Migration",
        "DevOps Implementation", 
        "Serverless Architecture",
        "Monitoring & Analytics"
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Mobile-First Design",
      description: "Creating intuitive, user-friendly interfaces that work seamlessly across all devices.",
      features: [
        "Progressive Web Apps",
        "Native App Development",
        "UI/UX Design",
        "User Experience Testing"
      ]
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
            A website should be a solution - Not a problem.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 sm:mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary-600 dark:bg-primary-500 rounded-lg flex items-center justify-center text-white mb-6">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 rounded-xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            I'm obsessed about getting my clients' results.
          </h3>
          <p className="text-lg sm:text-xl text-primary-100 mb-12 sm:mb-16 max-w-2xl mx-auto">
            Ready to transform your ideas into powerful digital solutions? Let's discuss your project and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-700 hover:bg-primary-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Your Project
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
