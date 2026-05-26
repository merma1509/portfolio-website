'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [theme, setTheme] = useState('light');
  const [newsletterData, setNewsletterData] = useState({ name: '', email: '' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNewsletterSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsletterData),
      });
      if (response.ok) {
        alert('Subscribed successfully!');
        setNewsletterData({ name: '', email: '' });
      } else {
        alert('Error subscribing. Please try again.');
      }
    } catch (error) {
      alert('Error subscribing. Please try again.');
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header/Navigation - Mobile First */}
      <header className="sticky top-0 z-50 bg-white/98 dark:bg-slate-900/98 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 p-3 sm:p-4">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
            <a href="/" className="hover:opacity-80 transition-opacity">~M</a>
          </h1>

          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <div className="hidden xl:flex space-x-4 2xl:space-x-6">
            <a href="/about" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors px-3 py-2 text-sm 2xl:text-base">About</a>
            <a href="/projects" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors px-3 py-2 text-sm 2xl:text-base">Projects</a>
            <a href="/skills" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors px-3 py-2 text-sm 2xl:text-base">Skills</a>
            <a href="/gallery" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors px-3 py-2 text-sm 2xl:text-base">Gallery</a>
            <a href="/contact" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors px-3 py-2 text-sm 2xl:text-base">Contact</a>
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 hover:scale-110"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>

          {/* Mobile/Tablet Menu Controls - Always Visible on smaller screens */}
          <div className="xl:hidden flex items-center space-x-1 sm:space-x-2">
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

        {/* Enhanced Mobile/Tablet Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-2 sm:mt-3 pb-3 sm:pb-4 border-t border-slate-200 dark:border-slate-700 bg-white/98 dark:bg-slate-900/98 backdrop-blur-lg">
            <div className="flex flex-col space-y-1 pt-2 sm:pt-3">
              <a href="/" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-2 sm:py-3 px-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
              <a href="/about" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-2 sm:py-3 px-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>About</a>
              <a href="/projects" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-2 sm:py-3 px-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
              <a href="/skills" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-2 sm:py-3 px-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
              <a href="/gallery" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-2 sm:py-3 px-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Gallery</a>
              <a href="/contact" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-2 sm:py-3 px-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Original Layout */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-16">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-800 dark:text-white mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight">
              Tech Entrepreneur,
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Data Practitioner,
              <br className="hidden md:block" />
              {/* <span className="sm:hidden"> </span>SpaceTech Enthusiast */}
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-600 dark:text-slate-300 mb-3 sm:mb-4 md:mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              <i>Bridging AI, Internet of Things (IoT), autonomous systems, and real-world impact.</i>
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center lg:justify-start">
              <a
                href="/projects"
                className="bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 rounded-xl hover:bg-slate-700 dark:hover:bg-slate-300 transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform text-center min-h-[44px] sm:min-h-[48px] flex items-center justify-center"
              >
                View Projects
              </a>
              <a
                href="/contact"
                className="border-2 border-slate-800 dark:border-slate-200 text-slate-800 dark:text-slate-200 px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 rounded-xl hover:bg-slate-800 hover:text-white dark:hover:bg-slate-200 dark:hover:text-slate-800 transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-lg font-semibold hover:scale-105 transform text-center min-h-[44px] sm:min-h-[48px] flex items-center justify-center"
              >
                Get In Touch
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg shadow-xl">
              <img src="/mugabo.jpg" alt="Mugabo's profile photo" className="w-full h-full object-contain rounded-lg" />
            </div>
            {/* Placeholder for profile image */}
          </div>
        </div>

        {/* Featured Projects - EXTREMELY Mobile First */}
        <section className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-800 dark:text-white mb-2 sm:mb-3 md:mb-4 text-center">Featured Projects</h3>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 md:mb-8 lg:mb-12 text-justify max-w-3xl mx-auto px-1">
            Hands-on innovations solving real-world problems in Africa and beyond. Each project leverages AI, IoT, and cutting-edge tech for impact.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {/* OpenClimate */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-green-200/50 dark:border-green-700/30">
              <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-green-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg">🌍</span>
                </div>
                <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-slate-800 dark:text-white">OpenClimate</h4>
              </div>
              <p className="text-teal-700 dark:text-teal-300 font-medium mb-2 italic text-xs sm:text-xs md:text-sm text-center">"Stay informed, Stay Safe: Leveraging technologies to save more lives and infrastructure."</p>
              <p className="text-slate-600 dark:text-slate-300 mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base text-justify">Disaster management and climate resilience platform, integrating real-time data and predictive analytics.</p>
              <a href="https://theopenclimate.com/" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 text-white px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-medium text-xs sm:text-sm md:text-base min-h-[36px] sm:min-h-[40px] flex items-center justify-center">Learn More</a>
            </div>

            {/* RoutiQ */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-blue-200/50 dark:border-blue-700/30">
              <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-blue-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg">🚗</span>
                </div>
                <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-slate-800 dark:text-white">RoutiQ</h4>
              </div>
              <p className="text-teal-700 dark:text-teal-300 font-medium mb-2 italic text-xs sm:text-xs md:text-sm text-center">"Smarter Routes. Safest and Fastest Journeys. Greener Cities. Powered By Intelligence."</p>
              <p className="text-slate-600 dark:text-slate-300 mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base text-justify">Traffic intelligence and route optimization app, using ML and IoT for real-time navigation and eco-friendly paths.</p>
              <a href="/projects" className="inline-block bg-blue-600 text-white px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium text-xs sm:text-sm md:text-base min-h-[36px] sm:min-h-[40px] flex items-center justify-center">Learn More</a>
            </div>

            {/* eNeza Marketplace */}
            <div className="group bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-teal-200/50 dark:border-teal-700/30 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-teal-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg">🛒</span>
                </div>
                <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-slate-800 dark:text-white">eNeza MarketPlace</h4>
              </div>
              <p className="text-teal-700 dark:text-teal-300 font-medium mb-2 italic text-xs sm:text-xs md:text-sm text-center">"Integrated e-commerce platform with AI recommendations and secure logistics for seamless shopping."</p>
              <p className="text-slate-600 dark:text-slate-300 mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base text-justify">Boosts local economies with smart recommendations, secure payments gateways, and efficient supply chains.</p>
              <a href="/projects" className="inline-block bg-teal-600 text-white px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg hover:bg-teal-700 transition-all duration-200 font-medium text-xs sm:text-sm md:text-base min-h-[36px] sm:min-h-[40px] flex items-center justify-center">Learn More</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Newsletter Only */}
      <footer className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-white py-12 sm:py-16 md:py-20 lg:py-24 mt-8 sm:mt-12 md:mt-16 lg:mt-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.15),transparent_50%)]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          {/* Newsletter Section - Centered and Prominent */}
          <div className="text-center">
            {/* Decorative background elements */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                  Stay Connected
                </span>
              </h3>

              <p className="text-slate-300 mb-8 sm:mb-10 md:mb-12 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
                <span className="text-slate-200 font-medium">Get the latest updates</span> on my projects and insights in
                <span className="text-blue-300 font-semibold"> AI</span>,
                <span className="text-purple-300 font-semibold"> IoT</span>, and
                <span className="text-pink-300 font-semibold"> Autonomous Systems</span>
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-6 sm:space-y-0 sm:flex-row justify-center items-center max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-gradient-to-r from-slate-700/60 to-slate-600/60 p-4 sm:p-5 md:p-6 rounded-2xl backdrop-blur-md border border-slate-500/20 shadow-2xl">
                <input
                  type="text"
                  placeholder="Name"
                  value={newsletterData.name}
                  onChange={(e) => setNewsletterData({ ...newsletterData, name: e.target.value })}
                  className="w-full sm:flex-1 px-6 sm:px-8 py-5 sm:py-6 rounded-xl bg-slate-800/80 text-white placeholder-slate-400 placeholder:text-sm sm:placeholder:text-base border-0 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg sm:text-xl min-h-[64px] transition-all duration-300 hover:bg-slate-700/80 focus:bg-slate-700/90"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newsletterData.email}
                  onChange={(e) => setNewsletterData({ ...newsletterData, email: e.target.value })}
                  className="w-full sm:flex-1 px-6 sm:px-8 py-5 sm:py-6 rounded-xl bg-slate-800/80 text-white placeholder-slate-400 placeholder:text-sm sm:placeholder:text-base border-0 focus:ring-2 focus:ring-blue-400 focus:outline-none sm:ml-4 text-lg sm:text-xl min-h-[64px] transition-all duration-300 hover:bg-slate-700/80 focus:bg-slate-700/90"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl transition-all duration-500 font-bold sm:ml-4 mt-4 sm:mt-0 min-h-[56px] flex items-center justify-center text-base sm:text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1 animate-pulse hover:animate-none"
                >
                  <span className="mr-3 text-xl">🚀</span>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
