import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real application, you would send the form data to your backend
    console.log('Form submitted:', formData);
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    
    // Reset form after successful submission
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus('idle');
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      content: 'john@example.com',
      link: 'mailto:john@example.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      content: 'San Francisco, CA',
      link: 'https://maps.google.com/?q=San+Francisco,+CA',
    },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      url: 'https://github.com/yourusername',
      color: 'hover:text-gray-900 dark:hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: 'https://linkedin.com/in/yourusername',
      color: 'hover:text-blue-600',
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: 'https://twitter.com/yourusername',
      color: 'hover:text-blue-400',
    },
  ];

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
            I'm always open to discussing new opportunities, interesting projects, 
            or just having a friendly conversation about technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Send Me a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label 
                  htmlFor="subject" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 resize-vertical"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </div>
                )}
              </button>
              
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-center"
                >
                  Thanks for your message! I'll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="card">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
                  >
                    <div className="text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-200">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {info.title}
                      </div>
                      <div className="text-lg text-gray-900 dark:text-white">
                        {info.content}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Follow Me
              </h3>
              
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Let's Work Together
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I'm currently available for freelance work and new opportunities. 
                Whether you have a project in mind or just want to chat about technology, 
                I'd love to hear from you.
              </p>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <p>📍 Based in San Francisco, CA</p>
                <p>🌍 Available for remote work worldwide</p>
                <p>⚡ Usually responds within 24 hours</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

