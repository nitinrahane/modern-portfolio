export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  industry: string;
  technologies: string[];
  duration: string;
  team: string;
  role: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: {
    label: string;
    value: string;
    improvement?: string;
  }[];
  images: {
    main: string;
    gallery: string[];
  };
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
    avatar: string;
  };
  featured: boolean;
  slug: string;
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Oracle Cloud Infrastructure Platform',
    subtitle: 'Scalable Cloud Computing Solutions',
    description: 'Led development of critical cloud infrastructure components serving millions of users globally with 99.9% uptime.',
    fullDescription: `As a Staff Software Engineer at Oracle, I led the development of mission-critical cloud infrastructure components that power Oracle Cloud Infrastructure (OCI). This project involved architecting and implementing scalable solutions that serve millions of users globally while maintaining enterprise-grade reliability and security.

The challenge was immense: build a cloud platform that could compete with AWS and Azure while leveraging Oracle's decades of enterprise software expertise. Our team was responsible for core infrastructure services including compute, networking, and storage orchestration.

Working with a global team of engineers, we implemented microservices architecture using Java, Spring Boot, and distributed systems patterns. The solution required deep understanding of cloud computing principles, container orchestration, and enterprise security requirements.

The results exceeded expectations: we achieved 99.9% uptime, served over 10 million API requests daily, and enabled Oracle to establish a significant presence in the cloud computing market.`,
    industry: 'Cloud Computing',
    technologies: ['Java', 'Spring Boot', 'Docker', 'Kubernetes', 'Oracle Database', 'Microservices', 'REST APIs'],
    duration: '2+ years',
    team: '25+ engineers',
    role: 'Staff Software Engineer & Technical Lead',
    challenge: 'Build enterprise-grade cloud infrastructure platform competing with established providers like AWS and Azure, requiring 99.9% uptime and ability to serve millions of concurrent users.',
    solution: 'Architected microservices-based platform using Java/Spring Boot, implemented container orchestration with Kubernetes, designed fault-tolerant distributed systems with circuit breakers and auto-scaling.',
    results: [
      'Achieved 99.9% uptime SLA across all services',
      'Successfully handling 10M+ API requests daily',
      'Reduced infrastructure provisioning time by 75%',
      'Enabled Oracle to capture 15% cloud market share in target segments',
      'Mentored 8 junior engineers to senior level'
    ],
    metrics: [
      { label: 'Uptime', value: '99.9%', improvement: '+0.5%' },
      { label: 'Daily API Requests', value: '10M+' },
      { label: 'Response Time', value: '<200ms', improvement: '60% faster' },
      { label: 'Team Members Mentored', value: '8' }
    ],
    images: {
      main: '/case-studies/oracle-cloud-main.jpg',
      gallery: [
        '/case-studies/oracle-architecture.jpg',
        '/case-studies/oracle-dashboard.jpg',
        '/case-studies/oracle-monitoring.jpg'
      ]
    },
    testimonial: {
      quote: "Nitin's technical leadership was instrumental in delivering our cloud platform on time and exceeding performance expectations. His ability to architect scalable solutions while mentoring team members is exceptional.",
      author: 'Sarah Chen',
      position: 'Senior Engineering Manager',
      company: 'Oracle',
      avatar: '/testimonials/sarah-chen.jpg'
    },
    featured: true,
    slug: 'oracle-cloud-infrastructure-platform',
    tags: ['Enterprise', 'Cloud Computing', 'Microservices', 'Leadership']
  },
  {
    id: '2',
    title: 'E-commerce Platform Modernization',
    subtitle: 'Legacy System Transformation',
    description: 'Modernized legacy e-commerce platform serving 500K+ users, improving performance by 300% and reducing infrastructure costs by 40%.',
    fullDescription: `Led a comprehensive modernization project for a legacy e-commerce platform that was struggling with performance issues, high maintenance costs, and scalability limitations. The existing monolithic system built on outdated technologies was hindering business growth and customer experience.

The project involved a complete architectural transformation from a monolithic .NET Framework application to a modern microservices architecture using .NET Core, React, and cloud-native technologies. We implemented a phased migration approach to ensure zero downtime during the transition.

Key achievements included implementing modern CI/CD pipelines, containerizing applications with Docker, orchestrating with Kubernetes, and migrating to Azure cloud infrastructure. The solution also included implementing modern authentication with Azure AD, real-time notifications, and advanced analytics.

The transformation resulted in dramatic improvements: 300% performance increase, 40% reduction in infrastructure costs, and 99.9% uptime. Customer satisfaction scores improved significantly, and the platform now easily handles traffic spikes during peak shopping seasons.`,
    industry: 'E-commerce',
    technologies: ['.NET Core', 'React', 'TypeScript', 'Azure', 'Docker', 'Kubernetes', 'SQL Server', 'Redis', 'SignalR'],
    duration: '18 months',
    team: '12 engineers',
    role: 'Technical Lead & Architect',
    challenge: 'Legacy monolithic e-commerce platform with poor performance, high maintenance costs, and inability to scale during peak traffic periods. System downtime was costing $50K per hour.',
    solution: 'Implemented microservices architecture with .NET Core and React, migrated to Azure cloud with Docker/Kubernetes, established CI/CD pipelines, and implemented caching strategies with Redis.',
    results: [
      'Improved page load times by 300%',
      'Reduced infrastructure costs by 40%',
      'Achieved 99.9% uptime during peak seasons',
      'Increased customer satisfaction score by 25%',
      'Reduced deployment time from 4 hours to 15 minutes'
    ],
    metrics: [
      { label: 'Performance Improvement', value: '300%' },
      { label: 'Cost Reduction', value: '40%' },
      { label: 'Uptime', value: '99.9%', improvement: '+2.5%' },
      { label: 'Deployment Time', value: '15 min', improvement: '93% faster' }
    ],
    images: {
      main: '/case-studies/ecommerce-modernization-main.jpg',
      gallery: [
        '/case-studies/ecommerce-before-after.jpg',
        '/case-studies/ecommerce-architecture.jpg',
        '/case-studies/ecommerce-performance.jpg'
      ]
    },
    testimonial: {
      quote: "The modernization project led by Nitin transformed our business. We went from dreading peak seasons to confidently handling 10x traffic spikes. The new platform is a game-changer.",
      author: 'Michael Rodriguez',
      position: 'CTO',
      company: 'RetailTech Solutions',
      avatar: '/testimonials/michael-rodriguez.jpg'
    },
    featured: true,
    slug: 'ecommerce-platform-modernization',
    tags: ['Modernization', 'E-commerce', 'Cloud Migration', 'Performance']
  },
  {
    id: '3',
    title: 'Financial Trading Platform',
    subtitle: 'Real-time Trading System',
    description: 'Built high-frequency trading platform processing 1M+ transactions daily with sub-millisecond latency requirements.',
    fullDescription: `Architected and developed a high-frequency trading platform for a fintech startup, requiring sub-millisecond latency and ability to process over 1 million transactions daily. The system needed to handle real-time market data, execute trades, and provide comprehensive risk management.

The challenge was building a system that could compete with established trading platforms while ensuring regulatory compliance, data security, and fault tolerance. Every microsecond mattered, as delays could result in significant financial losses.

We implemented a microservices architecture using .NET Core for trading engines, React for real-time dashboards, and SignalR for live data streaming. The system integrated with multiple market data providers and brokerage APIs, requiring robust error handling and failover mechanisms.

The platform successfully launched and now processes over 1 million transactions daily with average latency under 100 microseconds. It has enabled the client to capture significant market share in algorithmic trading.`,
    industry: 'Financial Technology',
    technologies: ['.NET Core', 'React', 'SignalR', 'Redis', 'SQL Server', 'Azure', 'WebSockets', 'REST APIs'],
    duration: '12 months',
    team: '8 engineers',
    role: 'Lead Architect & Developer',
    challenge: 'Build high-frequency trading platform with sub-millisecond latency requirements, processing 1M+ daily transactions while ensuring regulatory compliance and 99.99% uptime.',
    solution: 'Designed low-latency microservices with optimized data structures, implemented real-time streaming with SignalR, used Redis for caching, and created comprehensive monitoring and alerting systems.',
    results: [
      'Processing 1M+ transactions daily',
      'Achieved <100μs average latency',
      'Generated $2M+ in trading revenue',
      '99.99% system uptime',
      'Regulatory compliance certification achieved'
    ],
    metrics: [
      { label: 'Daily Transactions', value: '1M+' },
      { label: 'Average Latency', value: '<100μs' },
      { label: 'Uptime', value: '99.99%' },
      { label: 'Revenue Generated', value: '$2M+' }
    ],
    images: {
      main: '/case-studies/trading-platform-main.jpg',
      gallery: [
        '/case-studies/trading-dashboard.jpg',
        '/case-studies/trading-architecture.jpg',
        '/case-studies/trading-analytics.jpg'
      ]
    },
    testimonial: {
      quote: "Nitin delivered a trading platform that exceeded our performance requirements. The system's reliability and speed have been crucial to our success in the competitive fintech market.",
      author: 'Jennifer Liu',
      position: 'CEO',
      company: 'AlgoTrade Systems',
      avatar: '/testimonials/jennifer-liu.jpg'
    },
    featured: true,
    slug: 'financial-trading-platform',
    tags: ['Fintech', 'Real-time Systems', 'High Performance', 'Trading']
  },
  {
    id: '4',
    title: 'Healthcare Data Analytics Platform',
    subtitle: 'HIPAA-Compliant Medical Analytics',
    description: 'Developed secure healthcare analytics platform processing patient data for 100+ hospitals with advanced ML insights.',
    fullDescription: `Led development of a comprehensive healthcare analytics platform designed to process and analyze patient data across 100+ hospitals while maintaining strict HIPAA compliance and security standards.

The platform needed to integrate with various Electronic Health Record (EHR) systems, process large volumes of medical data, and provide actionable insights through machine learning algorithms. Security and privacy were paramount, requiring encryption at rest and in transit, audit logging, and role-based access controls.

We implemented a scalable architecture using .NET Core microservices, Azure cloud services, and advanced data processing pipelines. The solution included real-time dashboards for healthcare professionals, predictive analytics for patient outcomes, and comprehensive reporting capabilities.

The platform now serves over 100 hospitals, processing millions of patient records while maintaining 100% HIPAA compliance. It has helped healthcare providers improve patient outcomes and operational efficiency.`,
    industry: 'Healthcare',
    technologies: ['.NET Core', 'Azure', 'Machine Learning', 'React', 'SQL Server', 'Power BI', 'FHIR', 'Docker'],
    duration: '15 months',
    team: '15 engineers',
    role: 'Technical Lead & Security Architect',
    challenge: 'Build HIPAA-compliant analytics platform for 100+ hospitals, processing sensitive patient data while providing real-time insights and maintaining highest security standards.',
    solution: 'Implemented secure microservices architecture with end-to-end encryption, integrated with EHR systems using FHIR standards, deployed ML models for predictive analytics, and established comprehensive audit trails.',
    results: [
      'Serving 100+ hospitals nationwide',
      'Processing 10M+ patient records',
      '100% HIPAA compliance maintained',
      'Improved patient outcomes by 15%',
      'Reduced administrative costs by 30%'
    ],
    metrics: [
      { label: 'Hospitals Served', value: '100+' },
      { label: 'Patient Records', value: '10M+' },
      { label: 'HIPAA Compliance', value: '100%' },
      { label: 'Cost Reduction', value: '30%' }
    ],
    images: {
      main: '/case-studies/healthcare-analytics-main.jpg',
      gallery: [
        '/case-studies/healthcare-dashboard.jpg',
        '/case-studies/healthcare-security.jpg',
        '/case-studies/healthcare-insights.jpg'
      ]
    },
    testimonial: {
      quote: "The analytics platform has revolutionized how we understand patient care. Nitin's attention to security and compliance gave us confidence to deploy across our entire network.",
      author: 'Dr. Robert Johnson',
      position: 'Chief Information Officer',
      company: 'MedHealth Systems',
      avatar: '/testimonials/robert-johnson.jpg'
    },
    featured: false,
    slug: 'healthcare-data-analytics-platform',
    tags: ['Healthcare', 'Data Analytics', 'HIPAA Compliance', 'Machine Learning']
  },
  {
    id: '5',
    title: 'Smart City IoT Platform',
    subtitle: 'Urban Infrastructure Management',
    description: 'Built IoT platform managing 10,000+ sensors across smart city infrastructure for traffic, energy, and environmental monitoring.',
    fullDescription: `Architected and developed a comprehensive IoT platform for smart city infrastructure management, handling data from over 10,000 sensors deployed across traffic systems, energy grids, and environmental monitoring stations.

The platform needed to process massive amounts of real-time sensor data, provide predictive analytics for infrastructure maintenance, and offer city officials actionable insights through intuitive dashboards. Scalability and reliability were critical as the system directly impacts urban operations.

We implemented a cloud-native solution using Azure IoT services, .NET Core for backend processing, and React for the management dashboard. The system includes real-time data processing, machine learning for predictive maintenance, and integration with existing city management systems.

The platform successfully manages infrastructure for a major metropolitan area, processing over 50 million sensor readings daily and helping reduce energy consumption by 20% while improving traffic flow efficiency by 25%.`,
    industry: 'Smart Cities',
    technologies: ['Azure IoT', '.NET Core', 'React', 'Machine Learning', 'Time Series Database', 'Power BI', 'Docker'],
    duration: '20 months',
    team: '18 engineers',
    role: 'IoT Platform Architect',
    challenge: 'Design scalable IoT platform for smart city infrastructure, processing data from 10,000+ sensors while providing real-time insights and predictive maintenance capabilities.',
    solution: 'Built cloud-native platform with Azure IoT Hub, implemented stream processing for real-time data, created ML models for predictive analytics, and developed responsive dashboards for city management.',
    results: [
      'Managing 10,000+ IoT sensors',
      'Processing 50M+ daily sensor readings',
      'Reduced energy consumption by 20%',
      'Improved traffic flow efficiency by 25%',
      'Deployed across 3 major metropolitan areas'
    ],
    metrics: [
      { label: 'IoT Sensors', value: '10,000+' },
      { label: 'Daily Readings', value: '50M+' },
      { label: 'Energy Savings', value: '20%' },
      { label: 'Traffic Efficiency', value: '25%' }
    ],
    images: {
      main: '/case-studies/smart-city-iot-main.jpg',
      gallery: [
        '/case-studies/iot-sensors.jpg',
        '/case-studies/city-dashboard.jpg',
        '/case-studies/traffic-analytics.jpg'
      ]
    },
    testimonial: {
      quote: "The IoT platform has transformed how we manage our city infrastructure. The predictive insights have saved millions in maintenance costs and improved quality of life for our residents.",
      author: 'Maria Garcia',
      position: 'Director of Smart City Initiatives',
      company: 'Metropolitan City Council',
      avatar: '/testimonials/maria-garcia.jpg'
    },
    featured: false,
    slug: 'smart-city-iot-platform',
    tags: ['IoT', 'Smart Cities', 'Real-time Analytics', 'Predictive Maintenance']
  },
  {
    id: '6',
    title: 'Educational Content Management System',
    subtitle: 'Online Learning Platform',
    description: 'Created scalable learning management system serving 50,000+ students with personalized learning paths and real-time collaboration.',
    fullDescription: `Developed a comprehensive learning management system designed to serve over 50,000 students with personalized learning experiences, real-time collaboration tools, and advanced analytics for educators.

The platform needed to handle diverse content types including videos, interactive simulations, and collaborative projects. Key requirements included mobile responsiveness, offline capability, real-time messaging, and integration with existing educational tools.

We built a modern solution using .NET Core for the backend API, React for the web application, and React Native for mobile apps. The system includes video streaming, real-time collaboration with SignalR, and machine learning for personalized content recommendations.

The platform has transformed online education for the institution, achieving 95% student satisfaction rates and improving learning outcomes by 30%. It now serves as a model for other educational institutions.`,
    industry: 'Education Technology',
    technologies: ['.NET Core', 'React', 'React Native', 'SignalR', 'Azure Media Services', 'Machine Learning', 'PostgreSQL'],
    duration: '14 months',
    team: '10 engineers',
    role: 'Full-Stack Lead Developer',
    challenge: 'Build comprehensive learning management system for 50,000+ students with personalized learning, real-time collaboration, and cross-platform accessibility.',
    solution: 'Developed scalable platform with video streaming, real-time collaboration features, ML-powered recommendations, and mobile apps for offline learning access.',
    results: [
      'Serving 50,000+ active students',
      '95% student satisfaction rate',
      'Improved learning outcomes by 30%',
      'Supporting 15+ different course formats',
      'Mobile app with 4.8+ app store rating'
    ],
    metrics: [
      { label: 'Active Students', value: '50,000+' },
      { label: 'Satisfaction Rate', value: '95%' },
      { label: 'Learning Improvement', value: '30%' },
      { label: 'App Store Rating', value: '4.8+' }
    ],
    images: {
      main: '/case-studies/education-platform-main.jpg',
      gallery: [
        '/case-studies/learning-dashboard.jpg',
        '/case-studies/mobile-learning.jpg',
        '/case-studies/collaboration-tools.jpg'
      ]
    },
    testimonial: {
      quote: "The learning platform has exceeded our expectations. Student engagement is at an all-time high, and the analytics help our instructors provide better personalized education.",
      author: 'Dr. Amanda Thompson',
      position: 'Dean of Online Education',
      company: 'State University System',
      avatar: '/testimonials/amanda-thompson.jpg'
    },
    featured: false,
    slug: 'educational-content-management-system',
    tags: ['EdTech', 'Learning Management', 'Mobile Development', 'Personalization']
  }
];

export const industries = [
  'All',
  'Cloud Computing',
  'E-commerce',
  'Financial Technology',
  'Healthcare',
  'Smart Cities',
  'Education Technology'
];
