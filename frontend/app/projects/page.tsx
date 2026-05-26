'use client';

import { useState } from 'react';
import { countries } from '@/lib/countries';
import Layout from '../../components/Layout';
import { useFormSubmit } from '../../hooks/useFormSubmit';

export default function Projects() {
  const [inquiryData, setInquiryData] = useState({ project_name: '', email: '', inquiry: '', phone: '', occupation: '', country: { code: '+250', flag: '🇷🇼', name: 'Rwanda' }});
  const [selectedInquiryCountry, setSelectedInquiryCountry] = useState({ code: '+250', flag: '🇷🇼', name: 'Rwanda' });

  const { submitForm: submitInquiry, isSubmitting: isSubmittingInquiry, errors: inquiryErrors } = useFormSubmit({
    endpoint: '/contact',
    successMessage: 'Project inquiry submitted successfully! We\'ll get back to you soon.',
    errorMessage: 'Error submitting inquiry. Please try again.'
  });

  
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

    return Object.keys(newErrors).length === 0;
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
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
    }
   /*, {
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
  */
 ];

  return (
    <Layout currentPage="projects" className="relative overflow-hidden">
      <div className="py-6 sm:py-8 lg:py-16 relative z-10">
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

          {/* Projects Description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed px-2 animate-fade-in-up delay-200">
            Explore my portfolio of innovative projects spanning AI, IoT, autonomous systems, and sustainable technology solutions.
          </p>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-12 sm:mt-16 lg:mt-20">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="group relative bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-800/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 hover:scale-[1.02] overflow-hidden"
              >
                <div className={`absolute -right-10 -top-10 w-40 h-40 ${project.color} rounded-full filter blur-2xl -z-10 group-hover:scale-150 transition-transform duration-700`}></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${project.button} rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <span className="text-white text-2xl sm:text-3xl">{project.icon}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm sm:text-base leading-relaxed">
                    {project.slogan}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech: string, techIndex: number) => (
                      <span 
                        key={techIndex}
                        className={`px-3 py-1 ${project.border} ${project.color} text-xs sm:text-sm font-medium rounded-full`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link}
                    className={`inline-flex items-center ${project.button} text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg group-hover:scale-105`}
                  >
                    <span className="mr-2">View Details</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Project Inquiry Form */}
          <div className="mt-16 sm:mt-20">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Interested in a Project?
                </span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Have questions about any of these projects or want to discuss a collaboration? Let's talk!
              </p>
            </div>

        <form onSubmit={handleNewsletterSubmit} className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Project</label>
                  <select
                    value={inquiryData.project_name}
                    onChange={(e) => setInquiryData({ ...inquiryData, project_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  >
                    <option value="">Select a project</option>
                    {projects.map((project, index) => (
                      <option key={index} value={project.name}>{project.name}</option>
                    ))}
                  </select>
                  {inquiryErrors.project_name && <p className="text-red-500 text-sm mt-1">{inquiryErrors.project_name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={inquiryData.email}
                    onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                  {inquiryErrors.email && <p className="text-red-500 text-sm mt-1">{inquiryErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={inquiryData.phone}
                    onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="+1234567890"
                    required
                  />
                  {inquiryErrors.phone && <p className="text-red-500 text-sm mt-1">{inquiryErrors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Occupation</label>
                  <input
                    type="text"
                    value={inquiryData.occupation}
                    onChange={(e) => setInquiryData({ ...inquiryData, occupation: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Your role"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Inquiry Details</label>
                <textarea
                  value={inquiryData.inquiry}
                  onChange={(e) => setInquiryData({ ...inquiryData, inquiry: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  rows={6}
                  placeholder="Tell us about your interest in this project..."
                  required
                />
                {inquiryErrors.inquiry && <p className="text-red-500 text-sm mt-1">{inquiryErrors.inquiry}</p>}
              </div>
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  disabled={isSubmittingInquiry}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingInquiry ? 'Sending...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
