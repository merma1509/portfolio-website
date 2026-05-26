'use client';

import { useState, useEffect } from 'react';
import { countries } from '@/lib/countries';

export default function Projects() {
  const [inquiryData, setInquiryData] = useState({ project_name: '', email: '', inquiry: '', phone: '', occupation: '', country: { code: '+250', flag: '🇷🇼', name: 'Rwanda' }});
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquiryErrors, setInquiryErrors] = useState<{[key: string]: string}>({});
  const [theme, setTheme] = useState('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [selectedInquiryCountry, setSelectedInquiryCountry] = useState({ code: '+250', flag: '🇷🇼', name: 'Rwanda' });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const validateInquiryForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Project selection validation
    if (!inquiryData.project_name.trim()) {
      newErrors.project_name = 'Please select a project';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inquiryData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(inquiryData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation - allow international formats
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,12}$/;
    if (inquiryData.phone.trim() && !phoneRegex.test(inquiryData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (9-12 digits)';
    }

    // Occupation validation
    if (!inquiryData.occupation.trim()) {
      newErrors.occupation = 'Please select your occupation';
    }

    // Inquiry validation - minimum 15 words for project inquiries
    const wordCount = inquiryData.inquiry.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (!inquiryData.inquiry.trim()) {
      newErrors.inquiry = 'Inquiry details are required';
    } else if (wordCount < 15) {
      newErrors.inquiry = 'Please provide more details (minimum 15 words)';
    } else if (inquiryData.inquiry.trim().length > 500) {
      newErrors.inquiry = 'Inquiry must be less than 500 characters';
    }

    setInquiryErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInquiryForm()) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_name: inquiryData.project_name.trim(),
          email: inquiryData.email.trim(),
          inquiry: inquiryData.inquiry.trim(),
          phone: inquiryData.phone.trim(),
          occupation: inquiryData.occupation.trim()
        }),
      });

      if (response.ok) {
        alert('Inquiry sent successfully!');
        setInquiryData({ project_name: '', email: '', inquiry: '', phone: '', occupation: '', country: { code: '+7', flag: '🇷🇺', name: 'Russia' } });
        setInquiryErrors({});
      } else {
        alert('Error sending inquiry. Please try again.');
      }
    } catch (error) {
      alert('Error sending inquiry. Please try again.');
    }
  };

  const projects = [
    {
      name: "OpenClimate",
      slogan: "Stay informed, Stay Safe: Leveraging technologies to save more lives and infrastructure.",
      description: "An AI-powered platform for disaster management and climate resilience. It integrates real-time data from sensors and satellite imagery, predictive analytics using machine learning, and community alerts to provide early warnings and resource allocation for businesses, governments, NGOs, and communities.",
      tech: ["AI/ML", "IoT Sensors", "GIS Mapping", "FastAPI", "Cloud Computing", "Satellite Imagery"],
      outcomes: "Reducing disaster response times by 40%, protecting over 10,000 infrastructure units, and enhancing community resilience in vulnerable regions.",
      icon: "🌍",
      color: "from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30",
      border: "border-green-200 dark:border-green-700",
      button: "bg-green-600 hover:bg-green-700",
      onClick: () => window.open("https://theopenclimate.com/", "_blank")
    },
    {
      name: "RoutiQ",
      slogan: "Smarter Routes. Safest and Fastest Journeys. Greener Cities. Powered By Intelligence.",
      description: "A traffic intelligence and route optimization app that uses IoT data from roads, vehicles and drones, combined with ML algorithms, to optimize routes in real-time. It predicts congestion, suggests eco-friendly paths, and integrates with navigation systems for safer, faster commutes in African cities.",
      tech: ["IoT Devices", "React Native", "FastAPI", "PostgreSQL", "Network and communication", "AI/ML", "Cybersecurity"],
      outcomes: "Decreasing average commute times by 25%, reducing carbon emissions by 15%, helping people live in the cities with less traffic, and improving road safety with predictive alerts.",
      icon: "🚗",
      color: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30",
      border: "border-blue-200 dark:border-blue-700",
      button: "bg-blue-600 hover:bg-blue-700",
      link: "#",
      onClick: () => window.open("https://routiq.com/", "_blank") 
    },
    {
      name: "eNeza MarketPlace",
      slogan: "Seamless Shopping, Smart Recommendations.",
      description: "An integrated e-commerce platform with AI-driven recommendations, secure payment gateways, and efficient logistics. It connects local vendors with customers, using data analytics to personalize experiences and optimize supply chains for faster deliveries.",
      tech: ["Flutter", "FastAPI", "PostgreSQL", "AI Algorithms", "Cross-Platform", "Cybersecurity", "Python"],
      outcomes: "Increasing vendor sales by 30%, improving customer satisfaction scores by 50%, and streamlining operations for 500+ users.",
      icon: "🛒",
      color: "from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30",
      border: "border-teal-200 dark:border-teal-700",
      button: "bg-teal-600 hover:bg-teal-700",
      link: "#"
    },
    {
      name: "Drone and UAVs",
      slogan: "Hardware Meets Software for Autonomous Innovation.",
      description: "A long-term initiative to develop autonomous drones for delivery, disaster response, traffic intelligence, and environmental monitoring. Integrating hardware design with software for navigation, cybersecurity for secure operations, and AI for intelligent decision-making in logistics and agriculture.",
      tech: ["Autonomous Systems", "Cybersecurity", "Python", "Embedded C++", "Hardware-Software"],
      outcomes: "Prototyping 1 UAV model, achieving 45% accuracy in test flights, and preparing for real-world applications in disaster response.",
      icon: "🚁",
      color: "from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30",
      border: "border-indigo-200 dark:border-indigo-700",
      button: "bg-indigo-600 hover:bg-indigo-700",
      link: "#"
    }
  ];

  return (
    <>
      {/* Header/Navigation - Mobile First */}
      <header className="sticky top-0 z-50 bg-white/98 dark:bg-slate-900/98 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 p-3 sm:p-4">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
            <a href="/" className="hover:opacity-80 transition-opacity">~M</a>
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-3 xl:space-x-6">
            <a href="/" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors px-2 py-2 text-sm xl:text-base">Home</a>
            <a href="/about" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors px-2 py-2 text-sm xl:text-base">About</a>
            <a href="/projects" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white font-semibold transition-colors px-2 py-2 text-sm xl:text-base">Projects</a>
            <a href="/skills" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors px-2 py-2 text-sm xl:text-base">Skills</a>
            <a href="/gallery" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors px-2 py-2 text-sm xl:text-base">Gallery</a>
            <a href="/contact" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors px-2 py-2 text-sm xl:text-base">Contact</a>
            <button
              onClick={toggleTheme}
              className="ml-3 p-2 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 hover:scale-110"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button
              onClick={toggleMobileMenu}
              className={`p-2 sm:p-3 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 ${isMobileMenuOpen ? 'bg-slate-300 dark:bg-slate-600 scale-105' : ''}`}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-800 dark:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 sm:mt-3 pb-3 sm:pb-4 border-t border-slate-200 dark:border-slate-700 bg-white/98 dark:bg-slate-900/98 backdrop-blur-lg">
            <div className="flex flex-col space-y-1 pt-2 sm:pt-3">
              <a href="/" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-2 sm:py-3 px-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
              <a href="/about" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-2 sm:py-3 px-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>About</a>
              <a href="/projects" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white font-semibold transition-colors py-2 sm:py-3 px-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
              <a href="/skills" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-2 sm:py-3 px-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
              <a href="/gallery" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-2 sm:py-3 px-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Gallery</a>
              <a href="/contact" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-2 sm:py-3 px-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </header>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-6 sm:py-8 lg:py-16 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-400/5 rounded-full blur-xl animate-bounce"></div>
        </div>

        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6 sm:mb-8 text-center animate-fade-in-up">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 sm:mb-12 lg:mb-16 text-center max-w-4xl mx-auto px-2 animate-fade-in-up delay-200">
            Innovative solutions bridging technology and real-world challenges. Each project is designed to create impact, from saving lives to optimizing cities—built with passion and precision.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 animate-fade-in-up delay-400">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`group bg-gradient-to-br ${project.color} p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border ${project.border} hover:scale-105 relative overflow-hidden cursor-pointer`}
                onClick={() => project.onClick ? project.onClick() : window.open(project.link || '#', '_blank')}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-lg animate-pulse"></div>

                <div className="flex items-center mb-2 sm:mb-3 relative z-10">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${project.button.replace('bg-', 'bg-').replace('hover:bg-', '')} rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <span className="text-white text-lg sm:text-2xl animate-bounce-subtle">{project.icon}</span>
                  </div>
                  <div className="relative z-10 flex-1 text-center">
                    <h2 className="text-slate-800 dark:text-white mb-1 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors text-lg sm:text-xl font-bold text-center">{project.name}</h2>
                    <p className="text-slate-600 dark:text-slate-300 font-medium italic text-sm">"{project.slogan}"</p>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 leading-relaxed text-justify text-sm sm:text-base relative z-10">{project.description}</p>

                <div className="mb-4 sm:mb-6 relative z-10">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-2 sm:mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-xs font-medium ${project.button} text-white shadow-sm hover:shadow-md transition-shadow`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4 sm:mb-6 relative z-10">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-2 sm:mb-3">Key Outcomes</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-justify text-sm sm:text-base">{project.outcomes}</p>
                </div>

                <a href={project.link} className={`inline-block ${project.button} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 relative z-10`}>
                  View Details
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 lg:mt-20 animate-fade-in-up delay-800">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white mb-6 sm:mb-8 text-center animate-slide-in-left">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Project Inquiries
              </span>
            </h2>
            <form onSubmit={handleInquirySubmit} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-slate-200/40 dark:border-slate-700/40 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-indigo-400/20 rounded-full blur-xl animate-pulse delay-500"></div>

              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <div className="animate-fade-in-up delay-200">
                    <label htmlFor="project_name" className="block text-slate-700 dark:text-slate-300 mb-3 font-semibold text-sm sm:text-base">
                      Project *
                    </label>
                    <select
                      id="project_name"
                      value={inquiryData.project_name}
                      onChange={(e) => setInquiryData({ ...inquiryData, project_name: e.target.value })}
                      className={`w-full p-4 sm:p-5 border-2 rounded-xl bg-slate-50/80 dark:bg-slate-700/80 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-600 ${inquiryErrors.project_name ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} text-sm sm:text-base shadow-sm hover:shadow-md`}
                      required
                    >
                      <option value="">Select Project</option>
                      <option value="OpenClimate">OpenClimate</option>
                      <option value="RoutiQ">RoutiQ</option>
                      <option value="eNeza MarketPlace">eNeza MarketPlace</option>
                      <option value="Drone and UAVs">Drone and UAVs</option>
                      <option value="Others">Others</option>
                    </select>
                    {inquiryErrors.project_name && <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake">{inquiryErrors.project_name}</p>}
                  </div>

                  <div className="animate-fade-in-up delay-300">
                    <label htmlFor="email" className="block text-slate-700 dark:text-slate-300 mb-3 font-semibold text-sm sm:text-base">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                      className={`w-full p-4 sm:p-5 border-2 rounded-xl bg-slate-50/80 dark:bg-slate-700/80 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-600 ${inquiryErrors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} text-sm sm:text-base shadow-sm hover:shadow-md`}
                      placeholder="your.email@example.com"
                      required
                    />
                    {inquiryErrors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake">{inquiryErrors.email}</p>}
                  </div>

                  <div className="animate-fade-in-up delay-500">
                    <label htmlFor="phone" className="block text-slate-700 dark:text-slate-300 mb-3 font-semibold text-sm sm:text-base">
                      Phone Number
                    </label>
                    <div className="flex">
                      <select
                        value={selectedInquiryCountry.code}
                        onChange={(e) => {
                          const country = countries.find(c => c.code === e.target.value);
                          if (country) setSelectedInquiryCountry(country);
                        }}
                        className="flex-shrink-0 p-4 sm:p-5 border-2 border-r-0 border-slate-300 dark:border-slate-600 rounded-l-xl bg-slate-50/80 dark:bg-slate-700/80 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base"
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        id="phone"
                        value={inquiryData.phone}
                        onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                        className={`flex-1 p-4 sm:p-5 border-2 border-l-0 rounded-r-xl bg-slate-50/80 dark:bg-slate-700/80 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-600 ${inquiryErrors.phone ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} text-sm sm:text-base shadow-sm hover:shadow-md`}
                        placeholder="700 000 000"
                      />
                    </div>
                    {inquiryErrors.phone && <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake">{inquiryErrors.phone}</p>}
                  </div>

                  <div className="animate-fade-in-up delay-600">
                    <label htmlFor="occupation" className="block text-slate-700 dark:text-slate-300 mb-3 font-semibold text-sm sm:text-base">
                      Occupation *
                    </label>
                    <select
                      id="occupation"
                      value={inquiryData.occupation}
                      onChange={(e) => setInquiryData({ ...inquiryData, occupation: e.target.value })}
                      className={`w-full p-4 sm:p-5 border-2 rounded-xl bg-slate-50/80 dark:bg-slate-700/80 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-600 ${inquiryErrors.occupation ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} text-sm sm:text-base shadow-sm hover:shadow-md`}
                      required
                    >
                      <option value="">Select Occupation</option>
                      <option value="investor">Investor</option>
                      <option value="looking for a job">Looking for a Job</option>
                      <option value="team member">Team Member</option>
                      <option value="collaborator">Collaborator</option>
                      <option value="client">Client</option>
                      <option value="other">Other</option>
                    </select>
                    {inquiryErrors.occupation && <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake">{inquiryErrors.occupation}</p>}
                  </div>

                  <div className="md:col-span-2 animate-fade-in-up delay-700">
                    <label htmlFor="inquiry" className="block text-slate-700 dark:text-slate-300 mb-3 font-semibold text-sm sm:text-base">
                      Project Inquiry *
                    </label>
                    <textarea
                      id="inquiry"
                      value={inquiryData.inquiry}
                      onChange={(e) => setInquiryData({ ...inquiryData, inquiry: e.target.value })}
                      className={`w-full p-4 sm:p-5 border-2 rounded-xl bg-slate-50/80 dark:bg-slate-700/80 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-600 ${inquiryErrors.inquiry ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} text-sm sm:text-base shadow-sm hover:shadow-md`}
                      rows={5}
                      placeholder="Tell us about project interest, collaboration ideas, or specific questions..."
                      required
                    />
                    {inquiryErrors.inquiry && <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-shake">{inquiryErrors.inquiry}</p>}
                    <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      {inquiryData.inquiry.trim().split(/\s+/).filter(word => word.length > 0).length}/15 words minimum
                    </p>
                  </div>
                </div>

                <div className="text-center mt-8 sm:mt-10 animate-fade-in-up delay-800">
                  <button
                    type="submit"
                    disabled={isSubmittingInquiry}
                    className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl transition-all duration-500 font-bold text-base sm:text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1 min-h-[56px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative z-10 mr-2 text-xl animate-bounce-subtle">
                      {isSubmittingInquiry ? '⏳' : '🚀'}
                    </span>
                    <span className="relative z-10">
                      {isSubmittingInquiry ? 'Sending...' : 'Send Inquiry'}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
