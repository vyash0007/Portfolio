'use client';
import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = (): void => {
      setShowScrollTop(window.scrollY > 300);

      // Determine active section based on scroll position
      const sections = ['hero', 'about', 'education', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    handleScroll(); // Call on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getAnimationClass = (sectionId: string, delay: number = 0): string => {
    const isVisible = visibleSections.has(sectionId);
    return `transition-all duration-1000 ease-out ${delay > 0 ? `delay-${delay}` : ''} ${isVisible
        ? 'opacity-100 translate-y-0 scale-100'
        : 'opacity-0 translate-y-10 scale-95'
      }`;
  };

  const handleNavClick = (): void => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen relative" style={{
      backgroundColor: '#191A1A',
      backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
      backgroundSize: '30px 30px',
      animation: 'dotMove 10s linear infinite'
    }}>
      {/* Right Sidebar Navigation */}
      <nav className="hidden lg:block fixed right-8 top-1/4 -translate-y-1/2 z-[100] animate-slideLeft">
        <div className="rounded-3xl shadow-2xl overflow-hidden w-72 border border-white/10" style={{ backgroundColor: '#191A1A' }}>
          <div className="p-4 space-y-1">
            <a
              href="#about"
              className={`flex items-center justify-between px-6 py-4 transition-all duration-300 rounded-xl font-medium group relative overflow-hidden ${activeSection === 'about'
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/10'
                }`}
            >
              <span className="text-sm tracking-widest font-semibold relative z-10">ABOUT ME</span>
              <span className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${activeSection === 'about'
                  ? 'bg-black border-black scale-100'
                  : 'border-white/40 group-hover:border-white group-hover:scale-110'
                }`}></span>
            </a>
            <a
              href="#education"
              className={`flex items-center justify-between px-6 py-4 transition-all duration-300 rounded-xl font-medium group relative overflow-hidden ${activeSection === 'education'
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/10'
                }`}
            >
              <span className="text-sm tracking-widest font-semibold relative z-10">EXPERIENCE</span>
              <span className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${activeSection === 'education'
                  ? 'bg-black border-black scale-100'
                  : 'border-white/40 group-hover:border-white group-hover:scale-110'
                }`}></span>
            </a>
            <a
              href="#projects"
              className={`flex items-center justify-between px-6 py-4 transition-all duration-300 rounded-xl font-medium group relative overflow-hidden ${activeSection === 'projects'
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/10'
                }`}
            >
              <span className="text-sm tracking-widest font-semibold relative z-10">PROJECTS</span>
              <span className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${activeSection === 'projects'
                  ? 'bg-black border-black scale-100'
                  : 'border-white/40 group-hover:border-white group-hover:scale-110'
                }`}></span>
            </a>
            <a
              href="#contact"
              className={`flex items-center justify-between px-6 py-4 transition-all duration-300 rounded-xl font-medium group relative overflow-hidden ${activeSection === 'contact'
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/10'
                }`}
            >
              <span className="text-sm tracking-widest font-semibold relative z-10">CONTACT</span>
              <span className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${activeSection === 'contact'
                  ? 'bg-black border-black scale-100'
                  : 'border-white/40 group-hover:border-white group-hover:scale-110'
                }`}></span>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Top Navigation */}
      <nav className="lg:hidden fixed top-0 w-full backdrop-blur-xl z-[100] border-b border-white/10 animate-slideDown" style={{ backgroundColor: 'rgba(25, 26, 26, 0.95)' }}>
        <div className="container mx-auto px-4 py-4">
          {/* Horizontal Tab Navigation */}
          <div className="flex justify-center items-center gap-2 max-w-md mx-auto">
            <a
              href="#about"
              onClick={handleNavClick}
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${activeSection === 'about'
                  ? 'bg-white border-white text-black'
                  : 'border-white/30 text-white hover:border-white/60'
                }`}
            >
              <span className="text-sm font-bold">A</span>
            </a>
            <a
              href="#education"
              onClick={handleNavClick}
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${activeSection === 'education'
                  ? 'bg-white border-white text-black'
                  : 'border-white/30 text-white hover:border-white/60'
                }`}
            >
              <span className="text-sm font-bold">E</span>
            </a>
            <a
              href="#projects"
              onClick={handleNavClick}
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${activeSection === 'projects'
                  ? 'bg-white border-white text-black'
                  : 'border-white/30 text-white hover:border-white/60'
                }`}
            >
              <span className="text-sm font-bold">P</span>
            </a>
            <a
              href="#contact"
              onClick={handleNavClick}
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${activeSection === 'contact'
                  ? 'bg-white border-white text-black'
                  : 'border-white/30 text-white hover:border-white/60'
                }`}
            >
              <span className="text-sm font-bold">C</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" data-animate className="container mr-auto pl-6 pr-6 sm:pl-8 sm:pr-8 md:pl-10 md:pr-10 lg:pl-12 lg:pr-96 xl:pl-16 xl:pr-96 2xl:pl-20 2xl:pr-[28rem] pt-16 pb-32 md:pt-20 md:pb-48 lg:pb-64 lg:mt-0 mt-8">
        <div className={`max-w-4xl xl:max-w-5xl ${getAnimationClass('hero')}`}>
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Hello, I'm</span><br />
                <span className="text-white">Yash Verma</span>
              </h1>
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl text-gray-300 font-medium flex items-center gap-2 md:gap-3">
              <svg className="w-7 h-7 md:w-8 md:h-8 xl:w-10 xl:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Web Developer
            </p>
            <p className="text-base md:text-lg xl:text-xl text-gray-400 max-w-2xl xl:max-w-3xl leading-relaxed">
              Passionate about creating beautiful and functional web experiences.
              Currently pursuing Bachelor's in Technology in Computer Science Engineering.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 pt-4">
              <a
                href="#projects"
                className="bg-white hover:bg-gray-200 text-black font-semibold px-6 sm:px-8 xl:px-10 py-3 xl:py-4 rounded-md transition-all hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base xl:text-lg"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 sm:px-8 xl:px-10 py-3 xl:py-4 rounded-md transition-all hover:scale-105 shadow-lg border border-white/20 text-sm sm:text-base xl:text-lg"
              >
                Contact Me
              </a>
              <a
                href="/Resume_Yash_Verma.pdf"
                download="Resume_Yash_Verma.pdf"
                className="bg-white hover:bg-gray-200 text-black font-semibold px-6 sm:px-8 xl:px-10 py-3 xl:py-4 rounded-md transition-all hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2 text-sm sm:text-base xl:text-lg"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                My Resume
              </a>
            </div>
            {/* Social Links */}
            <div className="flex gap-4 pt-6">
              <a
                href="https://github.com/vyash0007"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border-2 border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all hover:scale-110 hover:border-white"
                title="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/yash-verma-5a6937285"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border-2 border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all hover:scale-110 hover:border-white"
                title="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:vyash5407@gmail.com"
                className="w-12 h-12 flex items-center justify-center border-2 border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all hover:scale-110 hover:border-white"
                title="Email"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" data-animate className="container mr-auto pl-6 pr-6 sm:pl-8 sm:pr-8 md:pl-10 md:pr-10 lg:pl-12 lg:pr-96 xl:pl-16 xl:pr-96 2xl:pl-20 2xl:pr-[28rem] py-12 md:py-16 lg:py-20 scroll-mt-16">
        <div className={`max-w-7xl xl:max-w-[90rem] ${getAnimationClass('about')}`}>
          <h2 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
            About Me
          </h2>
          <div className="bg-white/5 shadow-xl p-6 md:p-8 space-y-4 hover:shadow-2xl transition-all duration-300 border border-white/10 rounded-md" style={{ backgroundColor: 'rgba(25, 26, 26, 0.95)' }}>
            <p className="text-base md:text-lg xl:text-xl text-gray-300 leading-relaxed">
              I'm a web developer with a passion for building modern, responsive websites and applications.
              I love exploring new technologies and continuously improving my skills in web development.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-1">
              <div className="text-center p-3 md:p-4 bg-white/5 hover:scale-105 transition-transform border border-white/10 rounded-md">
                <div className="font-semibold text-white text-base md:text-lg">Education</div>
                <div className="text-sm md:text-base text-gray-400">B.Tech CSE</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-white/5 hover:scale-105 transition-transform border border-white/10 rounded-md">
                <div className="font-semibold text-white text-base md:text-lg">Projects</div>
                <div className="text-sm md:text-base text-gray-400">3+ Completed</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-white/5 hover:scale-105 transition-transform border border-white/10 rounded-md">
                <div className="font-semibold text-white text-base md:text-lg">Experience</div>
                <div className="text-sm md:text-base text-gray-400">Web Dev</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Experience Section */}
      <section id="education" data-animate className="container mr-auto pl-6 pr-6 sm:pl-8 sm:pr-8 md:pl-10 md:pr-10 lg:pl-12 lg:pr-96 xl:pl-16 xl:pr-96 2xl:pl-20 2xl:pr-[28rem] py-12 md:py-16 lg:py-20 scroll-mt-16">
        <div className={`max-w-7xl xl:max-w-[90rem] mx-auto ${getAnimationClass('education')}`}>
          <h2 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-white mb-8">
            Education & Experience
          </h2>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-10 gap-8">
            {/* Education Column */}
            <div>
              <h3 className="text-xl md:text-2xl xl:text-3xl font-bold text-white mb-6 pb-3 border-b-2 border-white/20">
                EDUCATION
              </h3>
              <div className="relative">
                {/* Vertical Line - Now visible on mobile too */}
                <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 via-white/40 to-white/20"></div>

                <div className="space-y-8">
                  {/* Education Item 1 */}
                  <div className="relative pl-16 md:pl-20">
                    {/* Timeline Dot - Now visible on mobile too */}
                    <div className="flex absolute left-[18px] md:left-[26px] top-6 w-5 h-5 bg-white rounded-full border-4 border-black z-10"></div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="inline-block px-4 py-1 bg-white/10 border border-white/20 rounded-full mb-3">
                          <span className="text-sm font-semibold text-white">2022 - 2026</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">
                          Bachelor's Degree
                        </h4>
                        <p className="text-gray-300 mb-2">
                          @ Guru Gobind Singh Indraprastha University
                        </p>
                        <p className="text-gray-400 text-sm">
                          Pursuing B.Tech in Computer Science Engineering
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Education Item 2 */}
                  <div className="relative pl-16 md:pl-20">
                    {/* Timeline Dot - Now visible on mobile too */}
                    <div className="flex absolute left-[18px] md:left-[26px] top-6 w-5 h-5 bg-white rounded-full border-4 border-black z-10"></div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="inline-block px-4 py-1 bg-white/10 border border-white/20 rounded-full mb-3">
                          <span className="text-sm font-semibold text-white">Completed 2022</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">
                          Senior Secondary Education
                        </h4>
                        <p className="text-gray-300 mb-2">
                          @ Apeejay School, Panchsheel Park
                        </p>
                        <p className="text-gray-400 text-sm">
                          Successfully completed 12th Standard
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Column */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 pb-3 border-b-2 border-white/20">
                INTERNSHIPS
              </h3>
              <div className="relative">
                {/* Vertical Line - Now visible on mobile too */}
                <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 via-white/40 to-white/20"></div>

                <div className="space-y-8">
                  {/* Internship 1 - Ecorp */}
                  <div className="relative pl-16 md:pl-20">
                    {/* Timeline Dot - Now visible on mobile too */}
                    <div className="flex absolute left-[18px] md:left-[26px] top-6 w-5 h-5 bg-white rounded-full border-4 border-black z-10"></div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="inline-block px-4 py-1 bg-white/10 border border-white/20 rounded-full mb-3">
                          <span className="text-sm font-semibold text-white">01 Jul, 2025 - 01 Oct, 2025</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-1">
                          Ecorp Infosystems
                        </h4>
                        <p className="text-gray-400 text-sm mb-2">IT / Computers - Software</p>
                        <p className="text-gray-300 font-semibold">
                          Full Stack Web Developer
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Internship 2 - Mersate */}
                  <div className="relative pl-16 md:pl-20">
                    {/* Timeline Dot - Now visible on mobile too */}
                    <div className="flex absolute left-[18px] md:left-[26px] top-6 w-5 h-5 bg-white rounded-full border-4 border-black z-10"></div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="inline-block px-4 py-1 bg-white/10 border border-white/20 rounded-full mb-3">
                          <span className="text-sm font-semibold text-white">17 Jan, 2025 - 17 May, 2025</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-1">
                          Mersate
                        </h4>
                        <p className="text-gray-400 text-sm mb-2">IT / Computers - Software</p>
                        <p className="text-gray-300 font-semibold">
                          Frontend Web Developer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" data-animate className="container mr-auto pl-6 pr-6 sm:pl-8 sm:pr-8 md:pl-10 md:pr-10 lg:pl-12 lg:pr-96 xl:pl-16 xl:pr-96 2xl:pl-20 2xl:pr-[28rem] py-12 md:py-16 lg:py-20 scroll-mt-16">
        <div className={`max-w-full ${getAnimationClass('projects')}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3">
            Featured Projects
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl text-base md:text-lg xl:text-xl">
            Explore my live projects - hover to interact, click to visit the full experience.
          </p>

          <div className="space-y-8">
            {/* DRAPELY.ai */}
            <div className="group bg-white/5 shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 border-2 border-white/10 hover:border-white/30 rounded-md" style={{ backgroundColor: '#191A1A' }}>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Left: Live Preview */}
                <div className="h-72 md:h-80 lg:h-[420px] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden cursor-pointer">
                  <iframe
                    src="https://drapely-ai.yashverma.site"
                    className="w-full h-full scale-[0.35] origin-top-left transition-all duration-500 group-hover:scale-[0.38]"
                    style={{ width: '285%', height: '285%' }}
                    title="DRAPELY.ai Preview"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-40"></div>
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20">
                    <span className="text-sm font-semibold text-white flex items-center gap-2">
                      <svg className="w-3 h-3 fill-white animate-pulse" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      LIVE
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-center space-y-4">
                  <h3 className="text-3xl font-bold text-white group-hover:text-gray-300 transition-all duration-300">
                    DRAPELY.ai
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    An AI-powered virtual try-on platform that allows users to visualize clothing on themselves using advanced machine learning. Experience seamless fashion exploration with realistic garment fitting technology.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-white/10 text-white rounded-md text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                      AI
                    </span>
                    <span className="px-4 py-2 bg-white/10 text-white rounded-md text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                      Fashion
                    </span>
                    <span className="px-4 py-2 bg-white/10 text-white rounded-md text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                      Virtual Try-On
                    </span>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <a
                      href="https://drapely-ai.yashverma.site"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-white hover:bg-gray-200 text-black font-semibold px-6 py-3 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                      <span className="hidden sm:inline">Live Demo</span>
                      <span className="sm:hidden">Live</span>
                    </a>
                    <a
                      href="https://github.com/vyash0007/DRAPELY.ai.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 border border-white/20"
                    >
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Booking */}
            <div className="group bg-white/5 shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 border-2 border-white/10 hover:border-white/30 rounded-md" style={{ backgroundColor: '#191A1A' }}>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Left: Live Preview */}
                <div className="h-72 md:h-80 lg:h-[420px] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden cursor-pointer">
                  <iframe
                    src="https://hotel.yashverma.site"
                    className="w-full h-full scale-[0.35] origin-top-left transition-all duration-500 group-hover:scale-[0.38]"
                    style={{ width: '285%', height: '285%' }}
                    title="Hotel Booking Preview"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-40"></div>
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20">
                    <span className="text-sm font-semibold text-white flex items-center gap-2">
                      <svg className="w-3 h-3 fill-white animate-pulse" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      LIVE
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-center space-y-4">
                  <h3 className="text-3xl font-bold text-white group-hover:text-gray-300 transition-all duration-300">
                    Haven
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    A comprehensive hotel booking platform with advanced search filters, real-time availability, and secure payment integration. Features an intuitive interface for seamless room reservations and booking management.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-white/10 text-white rounded-md text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                      Hospitality
                    </span>
                    <span className="px-4 py-2 bg-white/10 text-white rounded-md text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                      Booking
                    </span>
                    <span className="px-4 py-2 bg-white/10 text-white rounded-md text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                      Reservations
                    </span>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <a
                      href="https://hotel.yashverma.site"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-white hover:bg-gray-200 text-black font-semibold px-6 py-3 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                      <span className="hidden sm:inline">Live Demo</span>
                      <span className="sm:hidden">Live</span>
                    </a>
                    <a
                      href="https://github.com/vyash0007/Hotel-Booking.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 border border-white/20"
                    >
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Anonymous Feedback */}
            <div className="group bg-white/5 shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 border-2 border-white/10 hover:border-white/30 rounded-md" style={{ backgroundColor: 'rgba(25, 26, 26, 0.95)' }}>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Left: Live Preview */}
                <div className="h-72 md:h-80 lg:h-[420px] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden cursor-pointer">
                  <iframe
                    src="https://ama-app-alpha.vercel.app"
                    className="w-full h-full scale-[0.35] origin-top-left transition-all duration-500 group-hover:scale-[0.38]"
                    style={{ width: '285%', height: '285%' }}
                    title="Anonymous Feedback App Preview"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-40"></div>
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20">
                    <span className="text-sm font-semibold text-white flex items-center gap-2">
                      <svg className="w-3 h-3 fill-white animate-pulse" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Right: Description */}
                <div className="p-6 flex flex-col justify-center space-y-4">
                  <h3 className="text-3xl font-bold text-white group-hover:text-gray-300 transition-all duration-300">
                    Anonymous Feedback
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    An AMA (Ask Me Anything) application enabling anonymous feedback and questions in a safe, judgment-free environment. Perfect for honest communication and constructive feedback.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-6">
                    <span className="px-4 py-2 bg-white/10 text-white rounded-md text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                      Social
                    </span>
                    <span className="px-4 py-2 bg-white/10 text-white rounded-md text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                      Anonymous
                    </span>
                    <span className="px-4 py-2 bg-white/10 text-white rounded-md text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                      Safe
                    </span>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <a
                      href="https://anonymousfeedback.yashverma.site"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-white hover:bg-gray-200 text-black font-semibold px-6 py-3 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                      <span className="hidden sm:inline">Live Demo</span>
                      <span className="sm:hidden">Live</span>
                    </a>
                    <a
                      href="https://github.com/vyash0007/AMA-APP.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 border border-white/20"
                    >
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Horizon Banking App */}
            <div className="group bg-white/5 shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 border-2 border-white/10 hover:border-white/30 rounded-md" style={{ backgroundColor: 'rgba(25, 26, 26, 0.95)' }}>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Left: Live Preview */}
                <div className="h-72 md:h-80 lg:h-[420px] relative overflow-hidden cursor-pointer"
                  style={{ backgroundColor: '#191A1A' }}>
                  <iframe
                    src="https://horizon-banking-app-alpha.vercel.app"
                    title="Horizon Banking App Preview"
                    className="absolute top-0 left-0 w-full h-full scale-[0.35] origin-top-left transition-all duration-500 group-hover:scale-[0.38]"
                    style={{ width: '285%', height: '285%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-40"></div>
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20">
                    <span className="text-sm font-semibold text-white flex items-center gap-2">
                      <svg className="w-3 h-3 fill-white animate-pulse" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Right: Description */}
                <div className="p-6 flex flex-col justify-center space-y-4">
                  <h3 className="text-3xl font-bold text-white group-hover:text-gray-300 transition-all duration-300">
                    Horizon Banking App
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    A modern banking application with secure authentication, real-time transactions, and comprehensive financial management features. Built with cutting-edge technologies for optimal performance.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-white/10 text-white rounded-md text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                      Banking
                    </span>
                    <span className="px-4 py-2 bg-white/10 text-white rounded-md text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                      Finance
                    </span>
                    <span className="px-4 py-2 bg-white/10 text-white rounded-md text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                      Secure
                    </span>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <a
                      href="https://horizon.yashverma.site"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-white hover:bg-gray-200 text-black font-semibold px-6 py-3 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                      <span className="hidden sm:inline">Live Demo</span>
                      <span className="sm:hidden">Live</span>
                    </a>
                    <a
                      href="https://github.com/vyash0007/Horizon-Banking-App.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 border border-white/20"
                    >
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* GestureLang */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" data-animate className="container mr-auto pl-6 pr-6 sm:pl-8 sm:pr-8 md:pl-10 md:pr-10 lg:pl-12 lg:pr-96 xl:pl-16 xl:pr-96 2xl:pl-20 2xl:pr-96 py-12 md:py-16 lg:py-20 pb-16 md:pb-20 lg:pb-24 scroll-mt-16">
        <div className={`max-w-4xl xl:max-w-5xl ${getAnimationClass('contact')}`}>
          <div className="mb-8">
            <p className="text-sm text-gray-400 mb-2">// GET IN TOUCH</p>
            <h2 className="text-5xl font-bold text-white mb-4">
              Reach Me
            </h2>
            <p className="text-gray-400">
              If you want to contact me, just call me or email.
            </p>
          </div>

          {/* Email Display */}
          <div className="mb-8">
            <div className="inline-block px-6 py-3 border-2 border-dashed border-white/20 rounded-full">
              <p className="text-white">
                Email: <span className="text-gray-300">vyash5407@gmail.com</span>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative text-gray-300 py-16 overflow-hidden border-t border-white/10" style={{ backgroundColor: '#191A1A' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="pl-6 pr-6 sm:pl-8 sm:pr-8 md:pl-10 md:pr-10 lg:pl-12 lg:pr-12 xl:pl-16 xl:pr-16 2xl:pl-20 2xl:pr-20 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">Yash Verma</div>
                <p className="text-gray-400 text-sm md:text-base">Web Developer | CSE Student</p>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4 max-w-md text-sm md:text-base">
                Passionate about creating beautiful and functional web experiences.
                Transforming ideas into reality through code.
              </p>
              <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
                Building the future, one line of code at a time
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg md:text-xl mb-4">
                Quick Links
              </h3>
              <div className="flex flex-col gap-3">
                <a href="#about" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block text-sm md:text-base">About</a>
                <a href="#education" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block text-sm md:text-base">Education</a>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block text-sm md:text-base">Projects</a>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block text-sm md:text-base">Contact</a>
              </div>
            </div>

            {/* Connect Section */}
            <div>
              <h3 className="text-white font-bold text-lg md:text-xl mb-4">
                Connect
              </h3>
              <div className="flex flex-col gap-3 mb-6">
                <a
                  href="mailto:vyash5407@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm md:text-base">vyash5407@gmail.com</span>
                </a>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/vyash0007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center border-2 border-white/20 rounded-full text-white hover:bg-white hover:text-black hover:border-white transition-all hover:scale-110"
                  title="GitHub"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/yash-verma-5a6937285"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center border-2 border-white/20 rounded-full text-white hover:bg-white hover:text-black hover:border-white transition-all hover:scale-110"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-slate-400 text-sm md:text-base">
                &copy; 2025 Yash Verma. All rights reserved.
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm md:text-base">
                <span>Built with</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition-all">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
                  </svg>
                  <span className="text-white text-sm md:text-base">Next.js</span>
                </span>
                <span className="text-gray-500">&</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition-all">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
                  </svg>
                  <span className="text-white text-sm md:text-base">Tailwind</span>
                </span>
              </div>

            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-white hover:bg-gray-200 text-black p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-50 animate-slideUp"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}
