'use client';

import { useState, useEffect } from 'react';

export default function Gallery() {
  const [theme, setTheme] = useState('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const galleryItems = [
    {
      title: "OpenClimate Platform",
      description: "AI-powered platform for disaster management and climate resilience with real-time monitoring and predictive analytics.",
      type: "image",
      src: "/openclimate.png",
      alt: "OpenClimate AI platform for disaster management",
      icon: "🌍",
      link: "https://theopenclimate.com/",
      target: "_blank"
    },
    {
      title: "RoutiQ App Interface",
      description: "User interface for route optimization and traffic predictions.",
      type: "image",
      src: "routiq.png",
      alt: "RoutiQ traffic optimization app",
      icon: "🚗"
    },
    {
      title: "eNeza MarketPlace Demo",
      description: "Screenshots of the e-commerce platform in action.",
      type: "image",
      src: "/images/eneza-marketplace.jpg",
      alt: "eNeza e-commerce platform demo",
      icon: "🛒"
    },
    /*{
      title: "Drone Prototype",
      description: "Early hardware prototype for autonomous UAV development.",
      type: "image",
      src: "/images/drone-prototype.jpg",
      alt: "Early drone hardware prototype",
      icon: "🚁"
    },*/
    {
      title: "University Project",
      description: "Presenting project at university for credibility and knowledge sharing.",
      type: "image",
      src: "/images/innopolis.jpg",
      alt: "Presenting AI project",
      icon: "🎓"
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
            <a href="/projects" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors px-2 py-2 text-sm xl:text-base">Projects</a>
            <a href="/skills" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors px-2 py-2 text-sm xl:text-base">Skills</a>
            <a href="/gallery" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white font-semibold transition-colors px-2 py-2 text-sm xl:text-base">Gallery</a>
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
              <a href="/projects" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-2 sm:py-3 px-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
              <a href="/skills" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-2 sm:py-3 px-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
              <a href="/gallery" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white font-semibold transition-colors py-2 sm:py-3 px-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Gallery</a>
              <a href="/contact" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-2 sm:py-3 px-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </header>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-6 sm:py-8 lg:py-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-400/5 rounded-full blur-xl animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                Project Gallery
              </span>
            </h1>
            {/*<div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full animate-pulse"></div>*/}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 mt-4 sm:mt-6 max-w-4xl mx-auto leading-relaxed">
              Visual journey through my projects, prototypes, and milestones. From AI dashboards to drone hardware, see the tech in action.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 animate-fade-in-up delay-200">
            {galleryItems.map((item, index) => (
              <div key={index} className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 hover:scale-105 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-lg animate-pulse"></div>

                {/* Image Container */}
                <div className="relative w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-lg mb-3 sm:mb-4 lg:mb-6 overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
                  {item.title === "OpenClimate Platform" || item.title === "RoutiQ App Interface" ? (
                    // For OpenClimate and RoutiQ - Show only the image
                    <div className="relative w-full h-full">
                      <img 
                        src={item.src} 
                        alt={item.alt} 
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => e.currentTarget.style.display = 'none'}
                      />
                    </div>
                  ) : (
                    // For all other projects - Show only the icon with decoration
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gradient-to-br from-blue-500/90 to-purple-500/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                          <span className="text-white text-4xl sm:text-5xl lg:text-6xl animate-bounce-subtle">{item.icon}</span>
                        </div>
                      </div>
                      {/* Image Preview Badge */}
                      <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Details
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay - Only for image items */}
                  {(item.title === "OpenClimate Platform" || item.title === "RoutiQ App Interface") && (
                    <a 
                      href={item.link || '#'} 
                      target={item.target || '_self'}
                      rel={item.target ? 'noopener noreferrer' : ''}
                      className="absolute inset-0 z-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                      onClick={(e) => {
                        if (!item.link) e.preventDefault();
                      }}
                    >
                      <div className="text-center p-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg className="w-6 h-6 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                          </svg>
                        </div>
                        <p className="text-white text-sm sm:text-base font-medium">View Project</p>
                      </div>
                    </a>
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm italic leading-relaxed text-justify mb-3 sm:mb-4">
                    {item.description}
                  </p>

                  {/* Action Button */}
                  <a
                    href={item.link || `/projects#${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                    target={item.target || '_self'}
                    rel={item.target ? 'noopener noreferrer' : ''}
                    className="inline-block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
                  >
                    {item.link ? 'Visit Website' : 'View Details'}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in-up delay-600">
            <div className="bg-gradient-to-br from-slate-100/50 to-slate-50/50 dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200/30 dark:border-slate-700/30">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  More Projects Coming Soon
                </span>
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
                As projects evolve and new innovations emerge, this gallery will showcase the latest visuals and prototypes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="/projects"
                  className="group relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-500 text-base sm:text-lg font-bold shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1 min-h-[48px] flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <span className="relative z-10 mr-2 text-lg animate-bounce-subtle">🚀</span>
                  <span className="relative z-10">Explore Projects</span>
                </a>
                <a
                  href="/contact"
                  className="group relative border-2 border-slate-800 dark:border-slate-200 text-slate-800 dark:text-slate-200 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-200 dark:hover:text-slate-800 px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-500 text-base sm:text-lg font-bold hover:scale-105 transform min-h-[48px] flex items-center justify-center"
                >
                  <span className="relative z-10 mr-2 text-lg animate-spin-slow">💬</span>
                  <span className="relative z-10">Discuss Collaboration</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
