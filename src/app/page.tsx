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
    return `transition-all duration-1000 ease-out ${delay > 0 ? `delay-${delay}` : ''} ${
      isVisible 
        ? 'opacity-100 translate-y-0 scale-100' 
        : 'opacity-0 translate-y-10 scale-95'
    }`;
  };

  const handleNavClick = (): void => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Right Sidebar Navigation */}
      <nav className="hidden lg:block fixed right-8 top-1/4 -translate-y-1/2 z-50 animate-slideLeft">
        <div className="bg-black rounded-3xl shadow-2xl overflow-hidden w-72 border border-white/10">
          <div className="p-4 space-y-1">
            <a 
              href="#about" 
              className={`flex items-center justify-between px-6 py-4 transition-all duration-300 rounded-xl font-medium group relative overflow-hidden ${
                activeSection === 'about' 
                  ? 'bg-white text-black' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <span className="text-sm tracking-widest font-semibold relative z-10">ABOUT ME</span>
              <span className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === 'about' 
                  ? 'bg-black border-black scale-100' 
                  : 'border-white/40 group-hover:border-white group-hover:scale-110'
              }`}></span>
            </a>
            <a 
              href="#education" 
              className={`flex items-center justify-between px-6 py-4 transition-all duration-300 rounded-xl font-medium group relative overflow-hidden ${
                activeSection === 'education' 
                  ? 'bg-white text-black' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <span className="text-sm tracking-widest font-semibold relative z-10">RESUME</span>
              <span className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === 'education' 
                  ? 'bg-black border-black scale-100' 
                  : 'border-white/40 group-hover:border-white group-hover:scale-110'
              }`}></span>
            </a>
            <a 
              href="#projects" 
              className={`flex items-center justify-between px-6 py-4 transition-all duration-300 rounded-xl font-medium group relative overflow-hidden ${
                activeSection === 'projects' 
                  ? 'bg-white text-black' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <span className="text-sm tracking-widest font-semibold relative z-10">PORTFOLIO</span>
              <span className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === 'projects' 
                  ? 'bg-black border-black scale-100' 
                  : 'border-white/40 group-hover:border-white group-hover:scale-110'
              }`}></span>
            </a>
            <a 
              href="#contact" 
              className={`flex items-center justify-between px-6 py-4 transition-all duration-300 rounded-xl font-medium group relative overflow-hidden ${
                activeSection === 'contact' 
                  ? 'bg-white text-black' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <span className="text-sm tracking-widest font-semibold relative z-10">CONTACT</span>
              <span className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === 'contact' 
                  ? 'bg-black border-black scale-100' 
                  : 'border-white/40 group-hover:border-white group-hover:scale-110'
              }`}></span>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Top Navigation */}
      <nav className="lg:hidden fixed top-0 w-full bg-black/95 backdrop-blur-xl z-50 border-b border-white/10 animate-slideDown">
        <div className="container mx-auto px-4 py-4">
          {/* Horizontal Tab Navigation */}
          <div className="flex justify-center items-center gap-2 max-w-md mx-auto">
            <a 
              href="#about" 
              onClick={handleNavClick}
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                activeSection === 'about' 
                  ? 'bg-white border-white text-black' 
                  : 'border-white/30 text-white hover:border-white/60'
              }`}
            >
              <span className="text-sm font-bold">A</span>
            </a>
            <a 
              href="#education" 
              onClick={handleNavClick}
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                activeSection === 'education' 
                  ? 'bg-white border-white text-black' 
                  : 'border-white/30 text-white hover:border-white/60'
              }`}
            >
              <span className="text-sm font-bold">R</span>
            </a>
            <a 
              href="#projects" 
              onClick={handleNavClick}
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                activeSection === 'projects' 
                  ? 'bg-white border-white text-black' 
                  : 'border-white/30 text-white hover:border-white/60'
              }`}
            >
              <span className="text-sm font-bold">P</span>
            </a>
            <a 
              href="#contact" 
              onClick={handleNavClick}
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                activeSection === 'contact' 
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
      <section id="hero" data-animate className="container mx-auto px-6 lg:pr-80 pt-24 pb-60 md:pt-32 md:pb-72 lg:pb-80 lg:mt-0 mt-16">
        <div className={`max-w-4xl ${getAnimationClass('hero')}`}>
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                Hi, I'm <span className="text-white">Yash Verma</span>
              </h1>
            </div>
            <p className="text-2xl md:text-3xl text-gray-300 font-medium flex items-center gap-2">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Web Developer
            </p>
            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
              Passionate about creating beautiful and functional web experiences. 
              Currently pursuing Bachelor's in Technology in Computer Science Engineering.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href="#projects"
                className="bg-white hover:bg-gray-200 text-black font-semibold px-6 sm:px-8 py-3 rounded-full transition-all hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 sm:px-8 py-3 rounded-full transition-all hover:scale-105 shadow-lg border border-white/20 text-sm sm:text-base"
              >
                Contact Me
              </a>
              <a
                href="/CV_Yash_Verma.pdf"
                download="CV_Yash_Verma.pdf"
                className="bg-white hover:bg-gray-200 text-black font-semibold px-6 sm:px-8 py-3 rounded-full transition-all hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
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
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:vyash5407@gmail.com"
                className="w-12 h-12 flex items-center justify-center border-2 border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all hover:scale-110 hover:border-white"
                title="Email"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" data-animate className="container mx-auto px-6 lg:pr-80 py-12 scroll-mt-20">
        <div className={`max-w-4xl mx-auto ${getAnimationClass('about')}`}>
          <h2 className="text-4xl font-bold text-white mb-6">
            About Me
          </h2>
          <div className="bg-white/5 shadow-xl p-6 space-y-4 hover:shadow-2xl transition-all duration-300 border border-white/10">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a web developer with a passion for building modern, responsive websites and applications. 
              I love exploring new technologies and continuously improving my skills in web development.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="text-center p-3 bg-white/5 hover:scale-105 transition-transform border border-white/10">
                <div className="font-semibold text-white">Education</div>
                <div className="text-sm text-gray-400">B.Tech CSE</div>
              </div>
              <div className="text-center p-3 bg-white/5 hover:scale-105 transition-transform border border-white/10">
                <div className="font-semibold text-white">Projects</div>
                <div className="text-sm text-gray-400">3+ Completed</div>
              </div>
              <div className="text-center p-3 bg-white/5 hover:scale-105 transition-transform border border-white/10">
                <div className="font-semibold text-white">Experience</div>
                <div className="text-sm text-gray-400">Web Dev</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Experience Section */}
      <section id="education" data-animate className="container mx-auto px-6 lg:pr-80 py-12 scroll-mt-20">
        <div className={`max-w-7xl mx-auto ${getAnimationClass('education')}`}>
          <h2 className="text-4xl font-bold text-white mb-8">
            Education & Experience
          </h2>
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Education Column */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 pb-3 border-b-2 border-white/20">
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
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
      <section id="projects" data-animate className="container mx-auto px-6 lg:pr-80 py-12 scroll-mt-20">
        <div className={`max-w-7xl mx-auto ${getAnimationClass('projects')}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Featured Projects
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl text-lg">
            Explore my live projects - hover to interact, click to visit the full experience.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Horizon Banking App */}
            <div className="group bg-white/5 shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 border-2 border-white/10 hover:border-white/30 hover:-translate-y-2">
              <div className="h-80 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden cursor-pointer">
                <iframe
                  src="https://horizon-banking-app-alpha.vercel.app"
                  className="w-full h-full scale-[0.35] origin-top-left transition-all duration-500 group-hover:scale-[0.38]"
                  style={{ width: '285%', height: '285%' }}
                  title="Horizon Banking App Preview"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-40"></div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20">
                  <span className="text-sm font-semibold text-white flex items-center gap-2">
                    <svg className="w-3 h-3 fill-white animate-pulse" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    LIVE
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-3xl font-bold text-white group-hover:text-gray-300 transition-all duration-300">
                  Horizon Banking App
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  A modern banking application with secure authentication, real-time transactions, and comprehensive financial management features. Built with cutting-edge technologies for optimal performance.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                    Banking
                  </span>
                  <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                    Finance
                  </span>
                  <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                    Secure
                  </span>
                </div>
                <div className="flex gap-3 pt-1">
                  <a
                    href="https://horizon-banking-app-alpha.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-white hover:bg-gray-200 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    Live Demo
                  </a>
                  <a
                    href="https://github.com/vyash0007/Horizon-Banking-App.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 border border-white/20"
                  >
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Anonymous Feedback */}
            <div className="group bg-white/5 shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 border-2 border-white/10 hover:border-white/30 hover:-translate-y-2">
              <div className="h-80 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden cursor-pointer">
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
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    LIVE
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-3xl font-bold text-white group-hover:text-gray-300 transition-all duration-300">
                  Anonymous Feedback
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  An AMA (Ask Me Anything) application enabling anonymous feedback and questions in a safe, judgment-free environment. Perfect for honest communication and constructive feedback.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                    Social
                  </span>
                  <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                    Anonymous
                  </span>
                  <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                    Safe
                  </span>
                </div>
                <div className="flex gap-3 pt-1">
                  <a
                    href="https://ama-app-alpha.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-white hover:bg-gray-200 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    Live Demo
                  </a>
                  <a
                    href="https://github.com/vyash0007/AMA-APP.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 border border-white/20"
                  >
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Dry Clean Service App */}
            <div className="group bg-white/5  shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 border-2 border-white/10 hover:border-white/30 hover:-translate-y-2">
              <div className="h-80 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden cursor-pointer">
                <iframe
                  src="https://newmoderndrycleaners.vercel.app"
                  className="w-full h-full scale-[0.35] origin-top-left transition-all duration-500 group-hover:scale-[0.38]"
                  style={{ width: '285%', height: '285%' }}
                  title="Dry Clean Service App Preview"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-40"></div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20">
                  <span className="text-sm font-semibold text-white flex items-center gap-2">
                    <svg className="w-3 h-3 fill-white animate-pulse" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    LIVE
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-3xl font-bold text-white group-hover:text-gray-300 transition-all duration-300">
                  Dry Clean Service App
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  A modern dry cleaning service platform offering seamless booking, order tracking, and customer management. Features real-time updates and an intuitive user experience for both customers and service providers.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                    Service
                  </span>
                  <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                    Booking
                  </span>
                  <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                    Tracking
                  </span>
                </div>
                <div className="flex gap-3 pt-1">
                  <a
                    href="https://newmoderndrycleaners.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-white hover:bg-gray-200 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    Live Demo
                  </a>
                  <a
                    href="https://github.com/vyash0007/DryCleanServiceApp.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 border border-white/20"
                  >
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* GestureLang */}
            <div className="group bg-white/5  shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 border-2 border-white/10 hover:border-white/30 hover:-translate-y-2">
              <div className="h-80 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden cursor-pointer">
                <iframe
                  src="https://gesture-lang.vercel.app"
                  className="w-full h-full scale-[0.35] origin-top-left transition-all duration-500 group-hover:scale-[0.38]"
                  style={{ width: '285%', height: '285%' }}
                  title="GestureLang App Preview"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-40"></div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20">
                  <span className="text-sm font-semibold text-white flex items-center gap-2">
                    <svg className="w-3 h-3 fill-white animate-pulse" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    LIVE
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-3xl font-bold text-white group-hover:text-gray-300 transition-all duration-300">
                  GestureLang
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  An innovative AI-powered gesture recognition system that translates sign language in real-time. Breaking communication barriers and promoting accessibility through cutting-edge machine learning technology.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                    AI/ML
                  </span>
                  <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                    Accessibility
                  </span>
                  <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold transition-transform hover:scale-110 border border-white/20">
                    Real-time
                  </span>
                </div>
                <div className="flex gap-3 pt-1">
                  <a
                    href="https://gesture-lang.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-white hover:bg-gray-200 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    Live Demo
                  </a>
                  <a
                    href="https://github.com/vyash0007/GestureLang.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 border border-white/20"
                  >
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {/* <section id="skills" data-animate className="container mx-auto px-6 py-16 scroll-mt-20">
        <div className={`max-w-5xl mx-auto ${getAnimationClass('skills')}`}>
          <h2 className="text-4xl font-bold text-white mb-4 text-center">
            Skills & Technologies
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p> */}
          
          {/* Tech Categories */}
          {/* <div className="space-y-8">
            {/* Programming Languages */}
            {/* <div className="bg-white/5  shadow-xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
                Programming Languages
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'C', logo: <svg viewBox="0 0 128 128" className="w-12 h-12"><path fill="#659AD3" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"/><path fill="#03599C" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"/><path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z"/></svg>, color: 'blue' },
                  { name: 'C++', logo: <svg viewBox="0 0 128 128" className="w-12 h-12"><path fill="#659AD3" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"/><path fill="#03599C" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"/><path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6zM115 60.5v5h-5v5h-5v-5h-5v-5h5v-5h5v5h5zm-15 0v5h-5v5h-5v-5h-5v-5h5v-5h5v5h5z"/></svg>, color: 'indigo' },
                  { name: 'Java', logo: <svg viewBox="0 0 128 128" className="w-12 h-12"><g><path fill="#5382A1" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/><path fill="#E76F00" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/><path fill="#5382A1" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/><path fill="#E76F00" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/><path fill="#5382A1" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/></g></svg>, color: 'orange' },
                  { name: 'Python', logo: <svg viewBox="0 0 128 128" className="w-12 h-12"><linearGradient id="python-original-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stopColor="#5A9FD4"/><stop offset="1" stopColor="#306998"/></linearGradient><linearGradient id="python-original-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stopColor="#FFD43B"/><stop offset="1" stopColor="#FFE873"/></linearGradient><path fill="url(#python-original-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)"/><path fill="url(#python-original-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)"/><radialGradient id="python-original-c" cx="1825.678" cy="444.45" r="26.743" gradientTransform="matrix(0 -.24 -1.055 0 532.979 557.576)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#B8B8B8" stopOpacity=".498"/><stop offset="1" stopColor="#7F7F7F" stopOpacity="0"/></radialGradient><path opacity=".444" fill="url(#python-original-c)" d="M97.309 119.597c0 3.543-14.816 6.416-33.091 6.416-18.276 0-33.092-2.873-33.092-6.416 0-3.544 14.815-6.417 33.092-6.417 18.275 0 33.091 2.872 33.091 6.417z"/></svg>, color: 'green' },
                ].map((skill) => (
                  <div 
                    key={skill.name}
                    className="bg-white/10 rounded-full p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border border-white/10"
                  >
                    <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform">{skill.logo}</div>
                    <span className="text-white font-semibold block">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div> */} 

            {/* Frontend */}
            {/* <div className="bg-white/5  shadow-xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l-5.5 9h11z"/><path d="M12 22l5.5-9h-11z"/></svg>
                Frontend Development
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'HTML5', logo: <svg viewBox="0 0 24 24" className="w-12 h-12"><path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>, color: 'orange' },
                  { name: 'CSS3', logo: <svg viewBox="0 0 24 24" className="w-12 h-12"><path fill="#1572B6" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/></svg>, color: 'blue' },
                  { name: 'JavaScript', logo: <svg viewBox="0 0 24 24" className="w-12 h-12"><path fill="#F7DF1E" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>, color: 'yellow' },
                  { name: 'React', logo: <svg viewBox="0 0 24 24" className="w-12 h-12"><path fill="#61DAFB" d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/></svg>, color: 'cyan' },
                  { name: 'Next.js', logo: <svg viewBox="0 0 24 24" className="w-12 h-12"><path fill="currentColor" d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg>, color: 'slate' },
                  { name: 'Tailwind CSS', logo: <svg viewBox="0 0 24 24" className="w-12 h-12"><path fill="#06B6D4" d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg>, color: 'teal' },
                ].map((skill) => (
                  <div 
                    key={skill.name}
                    className="bg-white/10 rounded-full p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border border-white/10"
                  >
                    <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform">{skill.logo}</div>
                    <span className="text-white font-semibold block">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Backend & Tools */}
            {/* <div className="bg-white/5  shadow-xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>
                Backend & Tools
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'Node.js', logo: <svg viewBox="0 0 24 24" className="w-10 h-10"><path fill="#339933" d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.990,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/></svg> },
                  { name: 'Git', logo: <svg viewBox="0 0 24 24" className="w-10 h-10"><path fill="#F05032" d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg> },
                  { name: 'GitHub', logo: <svg viewBox="0 0 24 24" className="w-10 h-10"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
                ].map((skill) => (
                  <div 
                    key={skill.name}
                    className="group bg-white/10 rounded-full p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border border-white/10 hover:bg-white/20"
                  >
                    <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform">{skill.logo}</div>
                    <span className="font-semibold block text-sm text-white">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Database */}
            {/* <div className="bg-white/5  shadow-xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c5.5 0 10 1.58 10 3.5v11c0 1.92-4.5 3.5-10 3.5S2 19.42 2 17.5v-11C2 4.58 6.5 3 12 3m0 2c-4.56 0-8 1.14-8 1.5S7.44 8 12 8s8-1.14 8-1.5S16.56 5 12 5m0 11c1.2 0 2.35-.11 3.43-.3l-.12.04c-.23.78-.66 1.47-1.24 2.02-.41.4-.9.7-1.45.91-.24.09-.49.16-.74.21C11.28 18.95 10.64 19 10 19c-1.06 0-2.07-.23-2.98-.66-.54-.26-1.03-.6-1.45-1.01-.41-.4-.74-.87-.98-1.38-.24-.51-.37-1.06-.37-1.64 0-.58.13-1.13.37-1.64.24-.51.57-.98.98-1.38.42-.41.91-.75 1.45-1.01C7.93 10.23 8.94 10 10 10c.64 0 1.28.05 1.88.12-.34.32-.63.68-.86 1.08-.29.55-.48 1.16-.55 1.8-.16-.01-.31-.01-.47-.01-1.49 0-2.75.45-3.75 1.25-.5.4-.9.86-1.17 1.37-.27.51-.4 1.06-.4 1.64s.13 1.13.4 1.64c.27.51.67.97 1.17 1.37 1 .8 2.26 1.25 3.75 1.25.16 0 .31 0 .47-.01.07.64.26 1.25.55 1.8.23.4.52.76.86 1.08-.6.07-1.24.12-1.88.12-5.56 0-10-1.58-10-3.5V6.5c0-1.92 4.44-3.5 10-3.5 5.56 0 10 1.58 10 3.5v6.66c-.85-.39-1.8-.66-2.83-.76z"/><circle cx="18.5" cy="16.5" r="5.5" fill="currentColor"/><path fill="#fff" d="M18.5 14.5v4m0 0v-4m0 4h-2m2 0h2"/></svg>
                Databases
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'PostgreSQL', logo: <svg viewBox="0 0 432.071 445.383" className="w-12 h-12"><g><path fill="#336791" d="M323.205,324.227c2.833-23.601,1.984-27.062,19.563-23.239l4.463,0.392c13.517,0.615,31.199-2.174,41.587-7c22.362-10.376,35.622-27.7,13.572-23.148c-50.297,10.376-53.755-6.655-53.755-6.655c53.111-78.803,75.313-178.836,56.149-203.322C352.514-5.534,262.036,26.049,260.522,26.869l-0.482,0.089c-9.938-2.062-21.06-3.294-33.554-3.496c-22.761-0.374-40.032,5.967-53.133,15.904c0,0-161.408-66.498-153.899,83.628c1.597,31.936,45.777,241.655,98.47,178.31c19.259-23.163,37.871-42.748,37.871-42.748c9.242,6.14,20.307,9.272,31.912,8.147l0.897-0.765c-0.281,2.876-0.157,5.689,0.359,9.019c-13.572,15.167-9.584,17.83-36.723,23.416c-27.457,5.659-11.326,15.734-0.797,18.367c12.768,3.193,42.305,7.716,62.268-20.224l-0.795,3.188c5.325,4.26,4.965,30.619,5.72,49.452c0.756,18.834,2.017,36.409,5.856,46.771c3.839,10.36,8.369,37.05,44.036,29.406c29.809-6.388,52.6-15.582,54.677-101.107"/><path fill="#336791" d="M402.395,271.23c-50.302,10.376-53.76-6.655-53.76-6.655c53.111-78.808,75.313-178.843,56.153-203.326c-52.27-66.785-142.752-35.2-144.262-34.38l-0.486,0.087c-9.938-2.063-21.06-3.292-33.56-3.496c-22.761-0.373-40.026,5.967-53.127,15.902c0,0-161.411-66.495-153.904,83.63c1.597,31.938,45.776,241.657,98.471,178.312c19.26-23.163,37.869-42.748,37.869-42.748c9.243,6.14,20.308,9.272,31.908,8.147l0.901-0.765c-0.28,2.876-0.152,5.689,0.361,9.019c-13.575,15.167-9.586,17.83-36.723,23.416c-27.459,5.659-11.328,15.734-0.796,18.367c12.768,3.193,42.307,7.716,62.266-20.224l-0.796,3.188c5.319,4.26,9.054,27.711,8.428,48.969c-0.626,21.259-1.044,35.854,3.147,47.254c4.191,11.4,8.368,37.05,44.042,29.406c29.809-6.388,45.256-22.942,47.405-50.555c1.525-19.631,4.976-16.729,5.194-34.28l2.768-8.309c3.192-26.611,0.507-35.196,18.872-31.203l4.463,0.392c13.517,0.615,31.208-2.174,41.591-7c22.358-10.376,35.618-27.7,13.573-23.148z"/><path d="M215.866,286.484c-1.385,49.516,0.348,99.377,5.193,111.495c4.848,12.118,15.223,35.688,50.9,28.045c29.806-6.39,40.651-18.756,45.357-46.051c3.466-20.082,10.148-75.854,11.005-87.281"/><path d="M173.104,38.256c0,0-161.521-66.016-154.012,84.109c1.597,31.938,45.779,241.664,98.473,178.316c19.256-23.166,36.671-41.335,36.671-41.335"/><path d="M260.349,26.207c-5.591,1.753,89.848-34.889,144.087,34.417c19.159,24.484-3.043,124.519-56.153,203.329"/><path strokeLinejoin="bevel" d="M348.282,263.953c0,0,3.461,17.036,53.764,6.653c22.04-4.552,8.776,12.774-13.577,23.155c-18.345,8.514-59.474,10.696-60.146-1.069c-1.729-30.355,21.647-21.133,19.96-28.739c-1.525-6.85-11.979-13.573-18.894-30.338c-6.037-14.633-82.796-126.849,21.287-110.183c3.813-0.789-27.146-99.002-124.553-100.599c-97.385-1.597-94.19,119.762-94.19,119.762"/><path d="M188.604,274.334c-13.577,15.166-9.584,17.829-36.723,23.417c-27.459,5.66-11.326,15.733-0.797,18.365c12.768,3.195,42.307,7.718,62.266-20.229c6.078-8.509-0.036-22.086-8.385-25.547c-4.034-1.671-9.428-3.765-16.361,3.994z"/><path d="M187.715,274.069c-1.368-8.917,2.93-19.528,7.536-31.942c6.922-18.626,22.893-37.255,10.117-96.339c-9.523-44.029-73.396-9.163-73.436-3.193c-0.039,5.968,2.889,30.26-1.067,58.548c-5.162,36.913,23.488,68.132,56.479,64.938"/><path fill="#FFFFFF" d="M172.517,141.7c-0.288,2.039,3.733,7.48,8.976,8.207c5.234,0.73,9.714-3.522,9.998-5.559c0.284-2.039-3.732-4.285-8.977-5.015c-5.237-0.731-9.719,0.333-9.996,2.367z"/><path fill="#FFFFFF" d="M331.941,137.543c0.284,2.039-3.732,7.48-8.976,8.207c-5.238,0.73-9.718-3.522-10.005-5.559c-0.277-2.039,3.74-4.285,8.979-5.015c5.239-0.73,9.718,0.333,10.002,2.368z"/><path d="M350.676,123.432c0.863,15.994-3.445,26.888-3.988,43.914c-0.804,24.748,11.799,53.074-7.191,81.435"/></g></svg>, color: 'blue' },
                  { name: 'MongoDB', logo: <svg viewBox="0 0 24 24" className="w-12 h-12"><path fill="#47A248" d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg>, color: 'green' },
                  { name: 'SQL', logo: <svg viewBox="0 0 24 24" className="w-12 h-12"><path fill="#00758F" d="M12 0C5.373 0 0 2.91 0 6.5v11C0 21.09 5.373 24 12 24s12-2.91 12-6.5v-11C24 2.91 18.627 0 12 0zm0 2c5.523 0 10 2.015 10 4.5S17.523 11 12 11 2 8.985 2 6.5 6.477 2 12 2zm0 20c-5.523 0-10-2.015-10-4.5v-3.914C4.174 15.416 7.882 16.5 12 16.5s7.826-1.084 10-2.914V17.5c0 2.485-4.477 4.5-10 4.5zm0-7c-5.523 0-10-2.015-10-4.5V7.586C4.174 9.416 7.882 10.5 12 10.5s7.826-1.084 10-2.914V10.5c0 2.485-4.477 4.5-10 4.5z"/></svg>, color: 'orange' },
                  { name: 'Appwrite', logo: <svg viewBox="0 0 24 24" className="w-12 h-12"><path fill="#FD366E" d="M13.252 2.023L24 8.5v7.16l-5.188-3.002v-2.656l-5.56-3.219-5.44 3.145v6.438l5.44 3.145 2.718-1.572v3.16L13.252 22l-10.748-6.5v-7.16L13.252 2.023zM7.812 16.5v-3.438l5.44-3.145 5.56 3.219v6.438l-5.56 3.145-5.44-3.219z"/></svg>, color: 'pink' },
                ].map((skill) => (
                  <div 
                    key={skill.name}
                    className="bg-white/10 rounded-full p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border border-white/10"
                  >
                    <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform">{skill.logo}</div>
                    <span className="text-white font-semibold block">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section id="contact" data-animate className="container mx-auto px-6 lg:pr-80 py-12 pb-20 scroll-mt-20">
        <div className={`max-w-4xl ${getAnimationClass('contact')}`}>
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
      <footer className="relative bg-black text-gray-300 py-16 overflow-hidden border-t border-white/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <div className="text-2xl font-bold text-white mb-2">Yash Verma</div>
                <p className="text-gray-400 text-sm">Web Developer | CSE Student</p>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4 max-w-md">
                Passionate about creating beautiful and functional web experiences. 
                Transforming ideas into reality through code.
              </p>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                Building the future, one line of code at a time
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                Quick Links
              </h3>
              <div className="flex flex-col gap-3">
                <a href="#about" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">About</a>
                <a href="#education" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">Education</a>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">Projects</a>
                <a href="#skills" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">Skills</a>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">Contact</a>
              </div>
            </div>

            {/* Connect Section */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                Connect
              </h3>
              <div className="flex flex-col gap-3 mb-6">
                <a
                  href="mailto:vyash5407@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span className="text-sm">vyash5407@gmail.com</span>
                </a>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/vyash0007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center border-2 border-white/20 rounded-full text-white hover:bg-white hover:text-black hover:border-white transition-all hover:scale-110"
                  title="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/yash-verma-5a6937285"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center border-2 border-white/20 rounded-full text-white hover:bg-white hover:text-black hover:border-white transition-all hover:scale-110"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-slate-400 text-sm">
                &copy; 2025 Yash Verma. All rights reserved.
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span>Built with</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition-all">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>
                  </svg>
                  <span className="text-white text-sm">Next.js</span>
                </span>
                <span className="text-gray-500">&</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition-all">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                  </svg>
                  <span className="text-white text-sm">Tailwind</span>
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
          </svg>
        </button>
      )}
    </div>
  );
}
