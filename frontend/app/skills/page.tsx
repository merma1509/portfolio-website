'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  
  const skillCategories = [
    {
      category: "AI & Machine Learning",
      icon: "🤖",
      gradient: "from-green-500 via-emerald-500 to-green-600",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      borderColor: "border-green-200 dark:border-green-700",
      textColor: "text-green-800 dark:text-green-200",
      buttonColor: "bg-green-600 hover:bg-green-700",
      items: [
        { name: "Predictive Analytics and Deep Learning", highlight: true },
        { name: "Neural Networks Architecture Design", highlight: true },
        { name: "Production ML Pipeline Development", highlight: true }
      ]
    },
    {
      category: "IoT & Cyber-Physical Systems",
      icon: "🌐",
      gradient: "from-blue-500 via-cyan-500 to-blue-600",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      borderColor: "border-blue-200 dark:border-blue-700",
      textColor: "text-blue-800 dark:text-blue-200",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      items: [
        { name: "IoT Network Architecture", highlight: true },
        { name: "Real-Time Embedded System Design", highlight: true },
        { name: "Cyber-Physical Security Protocols", highlight: true }
      ]
    },
    {
      category: "SpaceTech & Drones",
      icon: "🚀",
      gradient: "from-slate-500 via-gray-500 to-slate-600",
      bgGradient: "from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20",
      borderColor: "border-slate-200 dark:border-slate-700",
      textColor: "text-slate-800 dark:text-slate-200",
      buttonColor: "bg-slate-600 hover:bg-slate-700",
      items: [
        { name: "Autonomous UAVs Systems", highlight: true },
        { name: "Communication Protocols", highlight: true },
        { name: "Hardware-Software Integration", highlight: true }
      ]
    },
    {
      category: "Business & Leadership",
      icon: "💼",
      gradient: "from-blue-800 via-blue-700 to-blue-900",
      bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
      borderColor: "border-blue-200 dark:border-blue-700",
      textColor: "text-blue-800 dark:text-blue-200",
      buttonColor: "bg-blue-800 hover:bg-blue-900",
      items: [
        { name: "Technology Innovation Strategy", highlight: true },
        { name: "Cross-Functional Team Leadership", highlight: true },
        { name: "Strategic Partnership Development", highlight: true }
      ]
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
            <a href="/skills" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white font-semibold transition-colors px-2 py-2 text-sm xl:text-base">Skills</a>
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
              className="p-2 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button
              onClick={toggleMobileMenu}
              className={`p-2 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 ${isMobileMenuOpen ? 'bg-slate-300 dark:bg-slate-600 scale-105' : ''}`}
            >
              <svg className="w-5 h-5 text-slate-800 dark:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="lg:hidden mt-3 pb-4 border-t border-slate-200 dark:border-slate-700 bg-white/98 dark:bg-slate-900/98 backdrop-blur-lg">
            <div className="flex flex-col space-y-1 pt-3">
              <a href="/" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-3 px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
              <a href="/about" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-3 px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>About</a>
              <a href="/projects" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-3 px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
              <a href="/skills" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white font-semibold transition-colors py-3 px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
              <a href="/gallery" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-3 px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Gallery</a>
              <a href="/contact" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors py-3 px-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg mx-2 text-sm sm:text-base" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content - Enhanced Background */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-6 sm:py-8 lg:py-16 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-400/5 rounded-full blur-xl animate-bounce"></div>
        </div>

        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6 animate-fade-in-up">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                Skills & Expertise
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed px-2 animate-fade-in-up delay-200">
              Technical proficiencies built through hands-on experience, academic excellence, and continuous innovation across multiple domains
            </p>
          </div>

          {/* Skills Categories */}
          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {skillCategories.map((skill, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br ${skill.bgGradient} p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border ${skill.borderColor} hover:scale-[1.02] relative overflow-hidden animate-fade-in-up delay-${index * 100}`}
                onMouseEnter={() => setActiveSkill(index)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                {/* Decorative elements */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${skill.gradient} opacity-10 rounded-full blur-xl animate-pulse`}></div>
                <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br ${skill.gradient} opacity-10 rounded-full blur-xl animate-pulse delay-500`}></div>

                {/* Category Header */}
                <div className="flex items-center mb-6 sm:mb-8 lg:mb-10 relative z-10">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${skill.gradient} rounded-2xl flex items-center justify-center mr-4 sm:mr-6 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <span className="text-white text-xl sm:text-2xl lg:text-3xl animate-bounce-subtle">{skill.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${skill.textColor} mb-3 transition-all duration-300 ${activeSkill === index ? 'scale-105' : ''}`}>
                      {skill.category}
                    </h2>
                  </div>
                  <div className={`text-3xl sm:text-4xl lg:text-5xl transition-all duration-300 ${activeSkill === index ? 'scale-125 animate-spin' : 'scale-100'}`}>
                    ⭐
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
                  {skill.items.map((item, i) => (
                    <div
                      key={i}
                      className={`group bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border-2 ${skill.borderColor} transition-all duration-300 hover:bg-white/90 dark:hover:bg-slate-800/90 hover:scale-105 hover:shadow-xl ${item.highlight ? 'ring-2 ring-yellow-400/50' : ''} animate-fade-in-up delay-${i * 100}`}
                    >
                      <div className="text-center">
                        <span className={`font-bold text-sm sm:text-base lg:text-lg ${skill.textColor} group-hover:scale-105 transition-transform leading-tight block`}>
                          {item.name}
                        </span>
                        {item.highlight && (
                          <div className="flex items-center justify-center mt-2">
                            <span className="text-yellow-500 text-sm mr-2 animate-pulse">✨</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold">Core Expertise</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Category Footer */}
                {index < skillCategories.length - 1 && (
                  <div className={`absolute bottom-0 left-6 sm:left-8 lg:left-10 right-6 sm:right-8 lg:right-10 h-px bg-gradient-to-r ${skill.gradient} opacity-20 transition-opacity duration-300`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action - Redesigned Layout */}
          <div className="mt-16 sm:mt-20 lg:mt-24 animate-fade-in-up delay-800">
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-100/95 via-white/95 to-slate-50/95 dark:from-slate-800/95 dark:via-slate-700/95 dark:to-slate-900/95 backdrop-blur-sm rounded-3xl border border-slate-200/60 dark:border-slate-700/60 shadow-2xl">
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-br from-pink-400/15 to-indigo-400/15 rounded-full blur-3xl animate-pulse delay-700"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-cyan-400/8 to-teal-400/8 rounded-full blur-2xl animate-bounce"></div>
              </div>

              <div className="relative z-10 p-8 sm:p-12 lg:p-16">
                {/* Title Section */}
                <div className="text-center mb-8 sm:mb-12">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                      Ready to Collaborate?
                    </span>
                  </h3>
                </div>

                {/* Description */}
                <div className="text-center mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto">
                  <p className="text-base sm:text-lg italic text-slate-600 dark:text-slate-300 leading-relaxed">
                    Let's discuss how these skills can contribute to your next project or innovation challenge. I'm excited to bring expertise and passion to your team.
                  </p>
                </div>

                {/* Action Buttons - Enhanced Design */}
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center mb-8 sm:mb-10">
                  <a
                    href="/projects"
                    className="group relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-10 sm:px-12 lg:px-16 py-5 sm:py-6 lg:py-7 rounded-3xl transition-all duration-500 text-sm sm:text-base font-bold shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 hover:-translate-y-2 min-h-[64px] flex items-center justify-center w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-4 animate-bounce-subtle" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                    <span className="relative z-10">View Projects</span>
                  </a>

                  <a
                    href="/contact"
                    className="group relative border-2 border-slate-800 dark:border-slate-200 text-slate-800 dark:text-slate-200 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-200 dark:hover:text-slate-800 px-10 sm:px-12 lg:px-16 py-5 sm:py-6 lg:py-7 rounded-3xl transition-all duration-500 text-sm sm:text-base font-bold hover:scale-105 transform min-h-[64px] flex items-center justify-center w-full sm:w-auto"
                  >
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-4 animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2L2,7L12,12L22,7L12,2M17,16L12,18.5L7,16V14L12,16.5L17,14V16M12,13.5L2,8.5V17.5L12,22.5L22,17.5V8.5L12,13.5Z"/>
                    </svg>
                    <span className="relative z-10">Start a Project</span>
                  </a>
                </div>

                {/* Footer Info */}
                <div className="text-center">
                  <div className="flex flex-col sm:flex-row sm:inline-flex items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-slate-200/30 dark:border-slate-700/30 max-w-full">
                    <span className="text-lg sm:text-xl animate-bounce">🚀</span>
                    <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">Open to exciting opportunities</span>
                    <span className="hidden sm:inline text-slate-400 dark:text-slate-500">•</span>
                    <span className="text-lg sm:text-xl animate-pulse">📧</span>
                    <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">Quick response guaranteed</span>
                    <span className="hidden sm:inline text-slate-400 dark:text-slate-500">•</span>
                    <span className="text-lg sm:text-xl animate-spin-slow">🌟</span>
                    <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">Let's build something amazing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
