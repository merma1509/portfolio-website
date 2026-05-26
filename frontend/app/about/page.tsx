'use client';

import Layout from '../../components/Layout';

export default function About() {

  const education = [
    {
      level: "Bachelor's Degree",
      period: "2020 - 2025",
      details: "Physics and Mathematics",
      institution: "People's Friendship University of Russia - RUDN University",
      location: "Russia",
      link: "https://www.rudn.ru/en/",
      icon: "🎓"
    },
    {
      level: "Master's in Computer Science",
      period: "2025 - 2027 (Ongoing)",
      details: "Artificial Intelligence and Data Engineering",
      institution: "Innopolis University",
      location: "Russia",
      link: "https://innopolis.university/en/",
      icon: "🤖"
    },
    {
      level: "Master's in Infocommunications Technologies and Communication Systems",
      period: "2025 - 2027 (Ongoing)",
      details: "Internet of Things and Cyber-Physical Systems",
      institution: "NRU HSE MIEM University",
      location: "Russia",
      link: "https://www.hse.ru/en/",
      icon: "📡"
    }
  ];

  const selfTaught = [
    { field: "Data Science", description: "Self-learned through online courses, projects, books reading, and hands-on experimentation." },
    { field: "Programming", description: "Mastered languages like Python, SQL, C++, and related frameworks." },
    { field: "Business & Entrepreneurship", description: "Building scalable tech ventures with a focus on innovation and impact in emerging markets." }
  ];

  return (
    <Layout currentPage="about" className="relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Decorative Corner Accents */}
      <div className="fixed top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full filter blur-3xl -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full filter blur-3xl -z-10"></div>

      <div className="py-6 sm:py-8 lg:py-16 relative z-10">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-400/5 rounded-full blur-xl animate-bounce"></div>
        </div>

        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
          <div className="relative">
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-500/5 rounded-full filter blur-3xl -z-10"></div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6 sm:mb-8 text-center animate-fade-in-up relative">
              <span className="relative z-10">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  About Me
                </span>
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
              </span>
            </h1>
          </div>

          {/* Who I Am & Expertise */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 mb-8 sm:mb-12 lg:mb-16 animate-fade-in-up delay-200">
            <div className="relative group bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-800/60 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 hover:scale-[1.02] hover:border-blue-200/50 dark:hover:border-blue-500/30 overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-400/10 rounded-full filter blur-2xl -z-10 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4 sm:mb-6 flex items-center animate-slide-in-left">
                  <span className="mr-3 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-500 dark:text-blue-400 shadow-inner">
                    👤
                  </span>
                  Who I Am
                </h2>
                <div className="space-y-4">
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed hover:text-slate-700 dark:hover:text-slate-300 transition-colors text-justify">
                    I'm a passionate tech professional with a strong interest in artificial intelligence, and Internet of Things. My journey in technology has been driven by curiosity and a desire to create meaningful solutions to real-world problems.
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed hover:text-slate-700 dark:hover:text-slate-300 transition-colors text-justify">
                    With experience in both technical and entrepreneurial domains, I enjoy working at the intersection of technology and business to create impactful solutions. I'm particularly interested in how emerging technologies can be leveraged to address global challenges.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-800/60 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 hover:scale-[1.02] hover:border-purple-200/50 dark:hover:border-purple-500/30 overflow-hidden">
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-400/10 rounded-full filter blur-2xl -z-10 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4 sm:mb-6 flex items-center animate-slide-in-right">
                  <span className="mr-3 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-500 dark:text-purple-400 shadow-inner">
                    🛠️
                  </span>
                  Key Expertise
                </h2>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    "Artificial Intelligence: Building predictive models and data pipelines for various applications.",
                    "Internet of Things/ Cyber Physical Systems: Designing embedded systems and device networks for real-time data in smart environments.",
                    /* "SpaceTech: Developing autonomous navigation and drone technologies, with interest in satellite systems.", */
                    "Business: Scaling tech solutions through entrepreneurship and project management."
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 bg-blue-500 rounded-full mr-2.5"></span>
                      <span className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                        <strong className="text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.split(':')[0]}:
                        </strong>
                        {item.split(':')[1]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Journey */}
          <div className="relative mb-8 sm:mb-12 lg:mb-16 animate-fade-in-up delay-400">
            <div className="absolute -top-4 -right-4 w-48 h-48 bg-purple-500/5 rounded-full filter blur-3xl -z-10"></div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white mb-6 sm:mb-8 text-center relative">
              <span className="relative inline-block">
                <span className="relative z-10">Educational Journey</span>
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></span>
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {education.map((edu, index) => (
                <div 
                  key={index} 
                  className="group relative bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-800/60 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 hover:scale-[1.02] hover:border-blue-200/50 dark:hover:border-blue-500/30 overflow-hidden"
                >
                  <div className="absolute -right-5 -top-5 w-24 h-24 bg-blue-400/10 rounded-full filter blur-xl -z-10 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-xl sm:text-2xl mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {edu.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {edu.level}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{edu.period}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-3 text-sm sm:text-base">{edu.details}</p>
                  <p className="text-slate-700 dark:text-slate-200 font-medium text-sm sm:text-base mb-1">{edu.institution}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center">
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                    {edu.location}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Self-Taught Expertise */}
          <div className="relative mb-8 sm:mb-12 lg:mb-16 animate-fade-in-up delay-600">
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-blue-500/5 rounded-full filter blur-3xl -z-10"></div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white mb-6 sm:mb-8 text-center relative">
              <span className="relative inline-block">
                <span className="relative z-10">Self-Taught Expertise</span>
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {selfTaught.map((item, index) => (
                <div 
                  key={index} 
                  className="group relative bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-800/60 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 hover:scale-[1.02] hover:border-purple-200/50 dark:hover:border-purple-500/30 overflow-hidden"
                >
                  <div className="absolute -left-3 -bottom-3 w-20 h-20 bg-purple-400/10 rounded-full filter blur-xl -z-10 group-hover:scale-150 transition-transform duration-700"></div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex items-center">
                    <span className="mr-2 text-purple-500 dark:text-purple-400">
                      {index === 0 ? '📊' : index === 1 ? '💻' : '🚀'}
                    </span>
                    {item.field}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed relative z-10">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative text-center animate-fade-in-up delay-800">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full filter blur-3xl -z-10"></div>
            <a
              href="/contact"
              className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl transition-all duration-500 text-base sm:text-lg lg:text-xl font-bold shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1 min-h-[56px] flex items-center justify-center overflow-hidden mx-auto max-w-xs sm:max-w-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10 mr-2 text-xl animate-bounce-subtle">🚀</span>
              <span className="relative z-10">Let's Collaborate</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-bounce-subtle {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </Layout>
  );
}